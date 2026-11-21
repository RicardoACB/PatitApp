export function extraerCentro(
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
