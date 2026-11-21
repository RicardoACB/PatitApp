import {
  construirParamsFiltros,
  RADIO_DEFECTO,
} from "./construir-params-filtros";

describe("construirParamsFiltros", () => {
  it("agrega todos los filtros activos y las coordenadas a los params", () => {
    const params = construirParamsFiltros("", {
      tamano: "grande",
      vivienda: "casa",
      radio: "3000",
      sinPerros: true,
      sinGatos: true,
      ubicacion: "  Providencia  ",
      coordenadas: { lat: -33.4314, lng: -70.6093 },
    });

    expect(params.get("tamano")).toBe("grande");
    expect(params.get("vivienda")).toBe("casa");
    expect(params.get("radio")).toBe("3000");
    expect(params.get("sin_perros")).toBe("true");
    expect(params.get("sin_gatos")).toBe("true");
    expect(params.get("ubicacion")).toBe("Providencia");
    expect(params.get("lat")).toBe("-33.4314");
    expect(params.get("lng")).toBe("-70.6093");
  });

  it("elimina filtros vacíos o en false y aplica el radio por defecto", () => {
    const paramsIniciales =
      "tamano=grande&vivienda=casa&sin_perros=true&sin_gatos=true&ubicacion=Santiago&lat=-33.4&lng=-70.6";

    const params = construirParamsFiltros(paramsIniciales, {
      tamano: "",
      vivienda: "",
      radio: "",
      sinPerros: false,
      sinGatos: false,
      ubicacion: "   ",
      coordenadas: null,
    });

    expect(params.has("tamano")).toBe(false);
    expect(params.has("vivienda")).toBe(false);
    expect(params.has("sin_perros")).toBe(false);
    expect(params.has("sin_gatos")).toBe(false);
    expect(params.has("ubicacion")).toBe(false);
    expect(params.has("lat")).toBe(false);
    expect(params.has("lng")).toBe(false);
    expect(params.get("radio")).toBe(RADIO_DEFECTO);
  });

  it("conserva la ubicación y coordenadas previas si no se pasan nuevas coordenadas", () => {
    const paramsIniciales = "ubicacion=Santiago&lat=-33.45&lng=-70.66";

    const params = construirParamsFiltros(paramsIniciales, {
      tamano: "mediano",
      vivienda: "",
      radio: "2000",
      sinPerros: false,
      sinGatos: false,
      ubicacion: "Santiago",
      coordenadas: null,
    });

    expect(params.get("ubicacion")).toBe("Santiago");
    expect(params.get("lat")).toBe("-33.45");
    expect(params.get("lng")).toBe("-70.66");
    expect(params.get("tamano")).toBe("mediano");
  });
});
