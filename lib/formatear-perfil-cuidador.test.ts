import { formatearPerfilCuidador } from "./formatear-perfil-cuidador";

describe("formatearPerfilCuidador", () => {
  it("retorna null si cuidadores es null, undefined o un arreglo vacío", () => {
    expect(formatearPerfilCuidador(null)).toBeNull();
    expect(formatearPerfilCuidador(undefined)).toBeNull();
    expect(formatearPerfilCuidador([])).toBeNull();
  });

  it("formatea fecha y rating cuando recibe un objeto cuidador", () => {
    const cuidador = {
      tarifa_noche: 15000,
      updated_at: new Date("2026-08-15T14:30:00.000Z"),
      rating: { toString: () => "4.75" },
    };

    const resultado = formatearPerfilCuidador(cuidador);

    expect(resultado).toEqual({
      cuidador,
      fechaActualizacion: "2026-08-15",
      ratingFormat: "4.8",
    });
  });

  it("toma el primer elemento cuando recibe un arreglo de cuidadores", () => {
    const primero = {
      tarifa_noche: 12000,
      updated_at: new Date("2026-05-01T00:00:00.000Z"),
      rating: 5,
    };
    const segundo = {
      tarifa_noche: 20000,
      updated_at: new Date("2026-06-01T00:00:00.000Z"),
      rating: 3,
    };

    const resultado = formatearPerfilCuidador([primero, segundo]);

    expect(resultado).toEqual({
      cuidador: primero,
      fechaActualizacion: "2026-05-01",
      ratingFormat: "5.0",
    });
  });

  it("aplica fallbacks cuando updated_at o rating son null", () => {
    const cuidador = {
      tarifa_noche: 10000,
      updated_at: null,
      rating: null,
    };

    const resultado = formatearPerfilCuidador(cuidador);

    expect(resultado).toEqual({
      cuidador,
      fechaActualizacion: "No registrada",
      ratingFormat: "Nuevo",
    });
  });
});
