export function extraerRadio(radioParam?: string): number {
  if (!radioParam) return 1000;

  const radio = parseInt(radioParam, 10);
  if (Number.isNaN(radio) || radio <= 0 || radio > 50000) return 1000;

  return radio;
}
