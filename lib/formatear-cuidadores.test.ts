import { formatearCuidadores } from "./formatear-cuidadores";

describe("formatearCuidadores", () => {
  it("aplana usuarios, convierte rating Decimal a number e inyecta coordenadas", () => {
    const cuidadoresBD = [
      {
        id: "cuid-1",
        tarifa_noche: 15000,
        rating: { toNumber: () => 4.8 },
        usuarios: {
          id: "user-1",
          nombre: "María González",
        },
      },
    ];

    const mapaCoordenadas = new Map([
      ["cuid-1", { latitud: -33.4314, longitud: -70.6093 }],
    ]);

    const resultado = formatearCuidadores(cuidadoresBD, mapaCoordenadas);

    expect(resultado).toEqual([
      {
        id: "cuid-1",
        tarifa_noche: 15000,
        usuario_id: "user-1",
        nombre: "María González",
        rating: 4.8,
        latitud: -33.4314,
        longitud: -70.6093,
      },
    ]);
  });

  it("aplica fallbacks cuando faltan usuarios, rating y coordenadas", () => {
    const cuidadoresBD = [
      {
        id: "cuid-2",
        tarifa_noche: 12000,
        rating: null,
        usuarios: null,
      },
    ];

    const resultado = formatearCuidadores(cuidadoresBD, new Map());

    expect(resultado).toEqual([
      {
        id: "cuid-2",
        tarifa_noche: 12000,
        usuario_id: "",
        nombre: "Cuidador sin nombre",
        rating: 0,
        latitud: null,
        longitud: null,
      },
    ]);
  });
});
