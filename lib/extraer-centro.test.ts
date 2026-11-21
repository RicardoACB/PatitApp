import { extraerCentro } from "./extraer-centro";

describe("extraerCentro", () => {
  it("retorna las coordenadas parseadas cuando son válidas", () => {
    expect(extraerCentro("-33.4489", "-70.6693")).toEqual({
      lat: -33.4489,
      lng: -70.6693,
    });
  });

  it("retorna null si falta lat o lng", () => {
    expect(extraerCentro(undefined, "-70.6693")).toBeNull();
    expect(extraerCentro("-33.4489", undefined)).toBeNull();
    expect(extraerCentro("", "")).toBeNull();
  });

  it("retorna null si los valores no son numéricos", () => {
    expect(extraerCentro("abc", "-70.6693")).toBeNull();
    expect(extraerCentro("-33.4489", "xyz")).toBeNull();
  });

  it("retorna null si lat o lng están fuera de rango geográfico", () => {
    expect(extraerCentro("-91", "-70")).toBeNull();
    expect(extraerCentro("91", "-70")).toBeNull();
    expect(extraerCentro("-33", "-181")).toBeNull();
    expect(extraerCentro("-33", "181")).toBeNull();
  });

  it("acepta los valores límite válidos (-90, 90, -180, 180)", () => {
    expect(extraerCentro("-90", "-180")).toEqual({ lat: -90, lng: -180 });
    expect(extraerCentro("90", "180")).toEqual({ lat: 90, lng: 180 });
  });
});
