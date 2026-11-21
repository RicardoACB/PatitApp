export function calcularZoomPorRadio(radio: number | null | undefined): number {
  if (!radio || radio <= 1000) return 15;
  if (radio <= 2000) return 14;
  if (radio <= 4000) return 13;
  return 12;
}
