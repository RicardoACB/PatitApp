import { Suspense } from "react";
import ListaCuidadores from "../components/ListaCuidadores";
import MapaDinamico from "../components/MapaDinamico";
import ContenedorBuscador from "../components/ContenedorBuscador";

import prisma from "../../../../../lib/prisma";
import type { Prisma } from "../../../../../src/generated/prisma/client";

interface BuscadorPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

// NUEVO: convierte los parámetros lat/lng de la URL en un objeto validado (o null)
function extraerCentro(
  latParam?: string,
  lngParam?: string,
): { lat: number; lng: number } | null {
  if (!latParam || !lngParam) return null;

  const lat = parseFloat(latParam);
  const lng = parseFloat(lngParam);

  // Descartamos valores no numéricos o fuera de rango (la URL puede ser editada a mano)
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
}

async function ResultadosBuscador({ searchParams }: BuscadorPageProps) {
  // 1. Extraemos los parámetros de la URL
  const params = await searchParams;

  // NUEVO: coordenadas y texto de la ubicación elegida en el filtro
  const centro = extraerCentro(params.lat, params.lng);

  // 2. Construimos las condiciones dinámicas para Prisma
  const condicionesGenerales: Prisma.cuidadoresWhereInput = {};

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

  // 4. Aplanamos los datos y convertimos Decimal -> number
  const cuidadoresFormateados = cuidadoresBD.map((cuidador) => {
    const { usuarios, ...restoDelCuidador } = cuidador;

    return {
      ...restoDelCuidador,
      usuario_id: usuarios?.id,
      nombre: usuarios?.nombre || "Cuidador sin nombre",
      rating: restoDelCuidador.rating ? restoDelCuidador.rating.toNumber() : 0,
    };
  });

  // 5. Entregamos los datos a los componentes (el mapa ahora recibe el centro)
  return (
    <ContenedorBuscador
      lista={<ListaCuidadores datos={cuidadoresFormateados} />}
      mapa={<MapaDinamico datos={cuidadoresFormateados} centro={centro} />}
    />
  );
}

export default function BuscadorPage({ searchParams }: BuscadorPageProps) {
  return (
    <Suspense fallback={<p>Cargando cuidadores...</p>}>
      <ResultadosBuscador searchParams={searchParams} />
    </Suspense>
  );
}
