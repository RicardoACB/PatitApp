import { extraerRadio } from "./extraer-radio";

describe("extraerRadio", () => {
  it("retorna el radio parseado cuando está dentro del rango permitido", () => {
    expect(extraerRadio("2000")).toBe(2000);
    expect(extraerRadio("50000")).toBe(50000);
  });

  it("retorna 1000 por defecto cuando falta el parámetro o está vacío", () => {
    expect(extraerRadio(undefined)).toBe(1000);
    expect(extraerRadio("")).toBe(1000);
  });

  it("retorna 1000 cuando el valor no es numérico", () => {
    expect(extraerRadio("abc")).toBe(1000);
  });

  it("retorna 1000 cuando el radio es menor o igual a 0 o mayor a 50000", () => {
    expect(extraerRadio("0")).toBe(1000);
    expect(extraerRadio("-500")).toBe(1000);
    expect(extraerRadio("50001")).toBe(1000);
  });
});
