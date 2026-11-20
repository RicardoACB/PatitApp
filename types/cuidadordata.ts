export interface CuidadorData {
  // Datos base del cuidador
  id: string; // ID de la tabla `cuidadores`
  usuario_id: string; // ID de la tabla `usuarios` (usado para navegar al perfil)
  clerk_id?: string;

  // Dato aplanado (JOIN) desde la tabla User (o Usuario)
  nombre: string;

  // Perfil comercial
  descripcion_perfil?: string | null;
  tarifa_noche: number;
  rating: number;
  total_reviews: number;

  // Filtros de vivienda y mascotas residentes
  tipo_vivienda: string;
  tiene_perros_propios: boolean;
  tiene_gatos_propios: boolean;

  // Filtros de restricciones
  acepta_tamano_mediano: boolean;
  acepta_tamano_grande: boolean;

  // Datos espaciales para el mapa (Leaflet / PostGIS)
  // Se marcan con "?" porque pueden ser opcionales si el usuario aún no define su ubicación
  latitud?: number | null;
  longitud?: number | null;
}
