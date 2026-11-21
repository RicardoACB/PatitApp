export interface CoordenadasMapa {
  latitud: number | null;
  longitud: number | null;
}

export interface CuidadorBDInput {
  id: string;
  rating: { toNumber: () => number } | null;
  usuarios: {
    id: string;
    nombre: string | null;
  } | null;
}

export function formatearCuidadores<T extends CuidadorBDInput>(
  cuidadoresBD: T[],
  mapaCoordenadas: Map<string, CoordenadasMapa>,
) {
  return cuidadoresBD.map((cuidador) => {
    const { usuarios, ...restoDelCuidador } = cuidador;
    const coords = mapaCoordenadas.get(cuidador.id);

    return {
      ...restoDelCuidador,
      usuario_id: usuarios?.id ?? "",
      nombre: usuarios?.nombre || "Cuidador sin nombre",
      rating: restoDelCuidador.rating ? restoDelCuidador.rating.toNumber() : 0,
      latitud: coords?.latitud ?? null,
      longitud: coords?.longitud ?? null,
    };
  });
}
