import { Suspense } from "react";
import ListaCuidadores from "../../components/ListaCuidadores";
import MapaDinamico from "../../components/MapaDinamico";
import ContenedorBuscador from "../../components/ContenedorBuscador";
import CargaCuidadores from "../../components/CargaCuidadores";

import prisma from "../../../../../lib/prisma";
import { Prisma } from "../../../../../src/generated/prisma/client";

interface BuscadorPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

interface CoordenadaCuidador {
  id: string;
  latitud: number | null;
  longitud: number | null;
}

// Convierte los parámetros lat/lng de la URL en un objeto validado (o null)
function extraerCentro(
  latParam?: string,
  lngParam?: string,
): { lat: number; lng: number } | null {
  if (!latParam || !lngParam) return null;

  const lat = parseFloat(latParam);
  const lng = parseFloat(lngParam);

  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
}

// Valida el radio en metros desde la URL (por defecto 1000m = 1 km)
function extraerRadio(radioParam?: string): number {
  if (!radioParam) return 1000;

  const radio = parseInt(radioParam, 10);
  if (Number.isNaN(radio) || radio <= 0 || radio > 50000) return 1000;

  return radio;
}

async function ResultadosBuscador({ searchParams }: BuscadorPageProps) {
  // 1. Extraemos los parámetros de la URL
  const params = await searchParams;

  // Si no hay ningún filtro en la URL, no consultamos la base de datos
  const hayBusqueda = Object.keys(params).length > 0;

  if (!hayBusqueda) {
    return (
      <div className="m-auto flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <span className="text-5xl mb-4">🐾</span>
        <h2 className="text-2xl font-bold text-gray-800">
          <span>Patit</span>
          <span className="text-primary">App</span>
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          Inicia con una búsqueda usando los filtros de arriba para encontrar
          cuidadores cerca de ti.
        </p>
      </div>
    );
  }

  const centro = extraerCentro(params.lat, params.lng);
  const radio = extraerRadio(params.radio);
  const radioActivo = centro ? radio : null;

  // 2. Construimos las condiciones dinámicas para Prisma
  const condicionesGenerales: Prisma.cuidadoresWhereInput = {};
  const mapaCoordenadas = new Map<
    string,
    { latitud: number | null; longitud: number | null }
  >();

  // Filtro espacial con PostGIS usando la columna `ubicacion_geog`
  if (centro && radioActivo) {
    const cuidadoresCercanos = await prisma.$queryRaw<CoordenadaCuidador[]>`
      SELECT
        id,
        ST_Y(ubicacion_geog::geometry) AS latitud,
        ST_X(ubicacion_geog::geometry) AS longitud
      FROM cuidadores
      WHERE ubicacion_geog IS NOT NULL
        AND ST_DWithin(
          ubicacion_geog,
          ST_SetSRID(ST_MakePoint(${centro.lng}, ${centro.lat}), 4326)::geography,
          ${radioActivo}
        )
    `;

    for (const c of cuidadoresCercanos) {
      mapaCoordenadas.set(c.id, {
        latitud: c.latitud,
        longitud: c.longitud,
      });
    }

    condicionesGenerales.id = { in: cuidadoresCercanos.map((c) => c.id) };
  }

  // Filtros de tamaño
  if (params.tamano === "grande") {
    condicionesGenerales.acepta_tamano_grande = true;
  }
  if (params.tamano === "mediano") {
    condicionesGenerales.acepta_tamano_mediano = true;
  }

  // Filtro de vivienda
  if (params.vivienda) {
    condicionesGenerales.tipo_vivienda = params.vivienda;
  }

  // Filtros booleanos de exclusión
  if (params.sin_perros === "true") {
    condicionesGenerales.tiene_perros_propios = false;
  }
  if (params.sin_gatos === "true") {
    condicionesGenerales.tiene_gatos_propios = false;
  }

  // 3. Consulta a la base de datos con JOIN a la tabla de usuarios
  const cuidadoresBD = await prisma.cuidadores.findMany({
    where: condicionesGenerales,
    orderBy: {
      rating: "desc",
    },
    include: {
      usuarios: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  });

  // Si no hubo filtro por ubicación/radio, extraemos lat/lng de `ubicacion_geog` para el mapa
  if (!(centro && radioActivo) && cuidadoresBD.length > 0) {
    const ids = cuidadoresBD.map((c) => c.id);
    const coordenadas = await prisma.$queryRaw<CoordenadaCuidador[]>`
      SELECT
        id,
        ST_Y(ubicacion_geog::geometry) AS latitud,
        ST_X(ubicacion_geog::geometry) AS longitud
      FROM cuidadores
      WHERE id IN (${Prisma.join(ids)})
        AND ubicacion_geog IS NOT NULL
    `;

    for (const c of coordenadas) {
      mapaCoordenadas.set(c.id, {
        latitud: c.latitud,
        longitud: c.longitud,
      });
    }
  }

  // 4. Aplanamos los datos, convertimos Decimal -> number e inyectamos lat/lng
  const cuidadoresFormateados = cuidadoresBD.map((cuidador) => {
    const { usuarios, ...restoDelCuidador } = cuidador;
    const coords = mapaCoordenadas.get(cuidador.id);

    return {
      ...restoDelCuidador,
      usuario_id: usuarios?.id,
      nombre: usuarios?.nombre || "Cuidador sin nombre",
      rating: restoDelCuidador.rating ? restoDelCuidador.rating.toNumber() : 0,
      latitud: coords?.latitud ?? null,
      longitud: coords?.longitud ?? null,
    };
  });

  // 5. Entregamos los datos a los componentes
  return (
    <ContenedorBuscador
      lista={
        <ListaCuidadores datos={cuidadoresFormateados} radio={radioActivo} />
      }
      mapa={
        <MapaDinamico
          datos={cuidadoresFormateados}
          centro={centro}
          radio={radioActivo}
        />
      }
    />
  );
}

export default function BuscadorPage({ searchParams }: BuscadorPageProps) {
  return (
    <Suspense fallback={<CargaCuidadores />}>
      <ResultadosBuscador searchParams={searchParams} />
    </Suspense>
  );
}
