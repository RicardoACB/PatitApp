import { Prisma } from "../src/generated/prisma/client";

export interface ParamsBuscador {
  tamano?: string;
  vivienda?: string;
  sin_perros?: string;
  sin_gatos?: string;
  [key: string]: string | undefined;
}

export function construirCondicionesPrisma(
  params: ParamsBuscador,
  idsCercanos?: string[],
): Prisma.cuidadoresWhereInput {
  const condicionesGenerales: Prisma.cuidadoresWhereInput = {};

  if (idsCercanos !== undefined) {
    condicionesGenerales.id = { in: idsCercanos };
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

  return condicionesGenerales;
}
