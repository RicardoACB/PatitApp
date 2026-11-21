import { geocodificar } from "./geocodificar";

describe("geocodificar", () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
  });

  it("retorna null y no llama a fetch si el texto tiene menos de 3 caracteres", async () => {
    expect(await geocodificar("")).toBeNull();
    expect(await geocodificar("   ")).toBeNull();
    expect(await geocodificar(" ab ")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("retorna lat, lng numéricos y nombre cuando la API responde correctamente", async () => {
    const mockRespuesta = [
      {
        lat: "-33.4489",
        lon: "-70.6693",
        display_name: "Santiago, Región Metropolitana, Chile",
      },
    ];

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockRespuesta,
    } as Response);

    const resultado = await geocodificar("  Santiago  ");

    expect(resultado).toEqual({
      lat: -33.4489,
      lng: -70.6693,
      nombre: "Santiago, Región Metropolitana, Chile",
    });

    const [urlLlamada, opciones] = fetchMock.mock.calls[0];
    const url = new URL(urlLlamada.toString());

    expect(url.origin + url.pathname).toBe(
      "https://nominatim.openstreetmap.org/search",
    );
    expect(url.searchParams.get("q")).toBe("Santiago");
    expect(url.searchParams.get("format")).toBe("jsonv2");
    expect(url.searchParams.get("limit")).toBe("1");
    expect(url.searchParams.get("countrycodes")).toBe("cl");
    expect(opciones).toEqual({
      headers: { "User-Agent": "patitapp/1.0 (tu-correo@ejemplo.com)" },
    });
  });

  it("retorna null si Nominatim no encuentra resultados", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const resultado = await geocodificar("LugarInexistente123");

    expect(resultado).toBeNull();
  });

  it("retorna null si la respuesta HTTP falla (res.ok === false)", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const resultado = await geocodificar("Providencia");

    expect(resultado).toBeNull();
  });
});
