import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FiltrosCuidador from "./FiltrosCuidadores";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { geocodificar } from "@/app/actions/geocodificar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/app/actions/geocodificar", () => ({
  geocodificar: jest.fn(),
}));

describe("FiltrosCuidador", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (usePathname as jest.Mock).mockReturnValue("/cuidadores/buscar");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    // Desactivamos geolocation por defecto para que no interfiera entre tests
    Object.defineProperty(navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });
  });

  it("inicializa los filtros con los valores presentes en la URL", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams(
        "ubicacion=Providencia&radio=3000&tamano=grande&vivienda=casa&sin_perros=true",
      ),
    );

    render(<FiltrosCuidador />);

    expect(
      screen.getByPlaceholderText("Tu ubicación (ej: Providencia)"),
    ).toHaveValue("Providencia");
    expect(screen.getByDisplayValue("Hasta 3 km")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Grande (+25kg)")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Casa con patio")).toBeInTheDocument();
  });

  it("geocodifica una nueva ubicación y navega con router.push al filtrar", async () => {
    (geocodificar as jest.Mock).mockResolvedValue({
      lat: -33.4314,
      lng: -70.6093,
      nombre: "Providencia, Chile",
    });

    render(<FiltrosCuidador />);

    const inputUbicacion = screen.getByPlaceholderText(
      "Tu ubicación (ej: Providencia)",
    );
    fireEvent.change(inputUbicacion, { target: { value: "Providencia" } });
    fireEvent.click(screen.getByRole("button", { name: "Sin otros perros" }));
    fireEvent.click(screen.getByRole("button", { name: "Filtrar" }));

    await waitFor(() => {
      expect(geocodificar).toHaveBeenCalledWith("Providencia");
      expect(pushMock).toHaveBeenCalledTimes(1);
    });

    const urlNavegada = pushMock.mock.calls[0][0] as string;
    expect(urlNavegada).toContain("/cuidadores/buscar?");
    expect(urlNavegada).toContain("ubicacion=Providencia");
    expect(urlNavegada).toContain("lat=-33.4314");
    expect(urlNavegada).toContain("lng=-70.6093");
    expect(urlNavegada).toContain("sin_perros=true");
  });

  it("muestra un error y no navega si geocodificar devuelve null", async () => {
    (geocodificar as jest.Mock).mockResolvedValue(null);

    render(<FiltrosCuidador />);

    const inputUbicacion = screen.getByPlaceholderText(
      "Tu ubicación (ej: Providencia)",
    );
    fireEvent.change(inputUbicacion, { target: { value: "LugarFalso123" } });
    fireEvent.click(screen.getByRole("button", { name: "Filtrar" }));

    expect(
      await screen.findByText("No encontramos esa ubicación"),
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("usa las coordenadas precargadas de geolocation sin llamar a geocodificar", async () => {
    Object.defineProperty(navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn((success) =>
          success({
            coords: { latitude: -33.58, longitude: -70.63 },
          }),
        ),
      },
      configurable: true,
    });

    render(<FiltrosCuidador />);

    // El useEffect precarga "Mi ubicación actual"
    expect(
      await screen.findByDisplayValue("Mi ubicación actual"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Filtrar" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
    });

    expect(geocodificar).not.toHaveBeenCalled();
    const urlNavegada = pushMock.mock.calls[0][0] as string;
    expect(urlNavegada).toContain("lat=-33.58");
    expect(urlNavegada).toContain("lng=-70.63");
  });
});
