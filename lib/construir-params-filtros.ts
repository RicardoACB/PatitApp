export const RADIO_DEFECTO = "1000";

export interface FiltrosParamsInput {
  tamano: string;
  vivienda: string;
  radio: string;
  sinPerros: boolean;
  sinGatos: boolean;
  ubicacion: string;
  coordenadas?: { lat: number; lng: number } | null;
}

export function construirParamsFiltros(
  paramsActuales: string,
  filtros: FiltrosParamsInput,
): URLSearchParams {
  const params = new URLSearchParams(paramsActuales);

  if (filtros.tamano) params.set("tamano", filtros.tamano);
  else params.delete("tamano");

  if (filtros.vivienda) params.set("vivienda", filtros.vivienda);
  else params.delete("vivienda");

  params.set("radio", filtros.radio || RADIO_DEFECTO);

  if (filtros.sinPerros) params.set("sin_perros", "true");
  else params.delete("sin_perros");

  if (filtros.sinGatos) params.set("sin_gatos", "true");
  else params.delete("sin_gatos");

  const textoUbicacion = filtros.ubicacion.trim();

  if (!textoUbicacion) {
    params.delete("ubicacion");
    params.delete("lat");
    params.delete("lng");
  } else if (filtros.coordenadas) {
    params.set("ubicacion", textoUbicacion);
    params.set("lat", filtros.coordenadas.lat.toString());
    params.set("lng", filtros.coordenadas.lng.toString());
  }

  return params;
}
