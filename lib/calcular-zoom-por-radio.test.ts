import { calcularZoomPorRadio } from "./calcular-zoom-por-radio";

describe("calcularZoomPorRadio", () => {
  it("retorna 15 cuando el radio es null, undefined o menor o igual a 1000m", () => {
    expect(calcularZoomPorRadio(null)).toBe(15);
    expect(calcularZoomPorRadio(undefined)).toBe(15);
    expect(calcularZoomPorRadio(500)).toBe(15);
    expect(calcularZoomPorRadio(1000)).toBe(15);
  });

  it("retorna 14 cuando el radio está entre 1001m y 2000m", () => {
    expect(calcularZoomPorRadio(1500)).toBe(14);
    expect(calcularZoomPorRadio(2000)).toBe(14);
  });

  it("retorna 13 cuando el radio está entre 2001m y 4000m", () => {
    expect(calcularZoomPorRadio(3000)).toBe(13);
    expect(calcularZoomPorRadio(4000)).toBe(13);
  });

  it("retorna 12 cuando el radio es mayor a 4000m", () => {
    expect(calcularZoomPorRadio(5000)).toBe(12);
    expect(calcularZoomPorRadio(10000)).toBe(12);
  });
});
