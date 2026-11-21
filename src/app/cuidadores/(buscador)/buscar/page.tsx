import { Suspense } from "react";
import ListaCuidadores from "../../components/ListaCuidadores";
import MapaDinamico from "../../components/MapaDinamico";
import ContenedorBuscador from "../../components/ContenedorBuscador";
import CargaCuidadores from "../../components/CargaCuidadores";
import { extraerCentro } from "../../../../../lib/extraer-centro";
import { extraerRadio } from "../../../../../lib/extraer-radio";
import { construirCondicionesPrisma } from "../../../../../lib/construir-condiciones-prisma";
import { formatearCuidadores } from "../../../../../lib/formatear-cuidadores";
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

async function ResultadosBuscador({ searchParams }: BuscadorPageProps) {
  // 1. Extraemos los parámetros de la URL
  const params = await searchParams;

  // Si no hay ningún filtro en la URL, no consultamos la base de datos
  const hayBusqueda = Object.keys(params).length > 0;

  if (!hayBusqueda) {
    return (
      <div className="m-auto flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <span className="text-5xl mb-4">🐾</span>
        <h2 className="text-2xl font-bold text-foreground">
          <span>Patit</span>
          <span className="text-primary">App</span>
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md">
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
  const mapaCoordenadas = new Map<
    string,
    { latitud: number | null; longitud: number | null }
  >();
  let idsCercanos: string[] | undefined;

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

    idsCercanos = cuidadoresCercanos.map((c) => c.id);
  }

  const condicionesGenerales = construirCondicionesPrisma(params, idsCercanos);

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
  const cuidadoresFormateados = formatearCuidadores(
    cuidadoresBD,
    mapaCoordenadas,
  );

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
