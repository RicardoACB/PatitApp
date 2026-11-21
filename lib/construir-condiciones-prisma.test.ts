import { construirCondicionesPrisma } from "./construir-condiciones-prisma";

describe("construirCondicionesPrisma", () => {
  it("retorna un objeto vacío cuando no hay filtros ni idsCercanos", () => {
    expect(construirCondicionesPrisma({})).toEqual({});
  });

  it("construye todas las condiciones activas junto con idsCercanos", () => {
    const condiciones = construirCondicionesPrisma(
      {
        tamano: "grande",
        vivienda: "casa",
        sin_perros: "true",
        sin_gatos: "true",
      },
      ["id-1", "id-2"],
    );

    expect(condiciones).toEqual({
      id: { in: ["id-1", "id-2"] },
      acepta_tamano_grande: true,
      tipo_vivienda: "casa",
      tiene_perros_propios: false,
      tiene_gatos_propios: false,
    });
  });

  it("asigna acepta_tamano_mediano cuando tamano es 'mediano'", () => {
    const condiciones = construirCondicionesPrisma({ tamano: "mediano" });

    expect(condiciones).toEqual({
      acepta_tamano_mediano: true,
    });
  });

  it("no agrega filtros de exclusión si sin_perros o sin_gatos no son 'true'", () => {
    const condiciones = construirCondicionesPrisma({
      sin_perros: "false",
      sin_gatos: "",
    });

    expect(condiciones).toEqual({});
  });

  it("incluye id: { in: [] } si idsCercanos es un arreglo vacío", () => {
    const condiciones = construirCondicionesPrisma({}, []);

    expect(condiciones).toEqual({
      id: { in: [] },
    });
  });
});
