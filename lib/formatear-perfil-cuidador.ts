export interface CuidadorPerfilInput {
  updated_at: Date | null;
  rating: { toString: () => string } | number | null;
}

export function formatearPerfilCuidador<T extends CuidadorPerfilInput>(
  cuidadores: T | T[] | null | undefined,
) {
  if (!cuidadores) return null;

  const cuidador = Array.isArray(cuidadores) ? cuidadores[0] : cuidadores;
  if (!cuidador) return null;

  const fechaActualizacion = cuidador.updated_at
    ? cuidador.updated_at.toISOString().split("T")[0]
    : "No registrada";

  const ratingFormat = cuidador.rating
    ? Number(cuidador.rating).toFixed(1)
    : "Nuevo";

  return {
    cuidador,
    fechaActualizacion,
    ratingFormat,
  };
}
