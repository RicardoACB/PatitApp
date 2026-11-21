import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MapaCuidadores from "./MapaCuidadores";
import type { CuidadorData } from "../../../../types/cuidadordata";

const flyToMock = jest.fn();

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({
    children,
    position,
  }: {
    children?: React.ReactNode;
    position: [number, number];
  }) => (
    <div data-testid="marker" data-position={position.join(",")}>
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
  Circle: ({
    center,
    radius,
  }: {
    center: [number, number];
    radius: number;
  }) => (
    <div
      data-testid="circle"
      data-center={center.join(",")}
      data-radius={radius}
    />
  ),
  useMap: () => ({
    flyTo: flyToMock,
  }),
}));

jest.mock("leaflet", () => ({
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: jest.fn(),
    },
  },
  divIcon: jest.fn(() => ({})),
}));

const crearCuidadorMock = (
  overrides: Partial<CuidadorData> = {},
): CuidadorData =>
  ({
    id: "cuid-1",
    usuario_id: "user-1",
    nombre: "María González",
    rating: 4.9,
    tarifa_noche: 15000,
    latitud: -33.4314,
    longitud: -70.6093,
    ...overrides,
  }) as CuidadorData;

describe("MapaCuidadores", () => {
  beforeAll(() => {
    if (!global.crypto?.randomUUID) {
      Object.defineProperty(global, "crypto", {
        value: { randomUUID: () => "test-uuid" },
      });
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza marcadores solo para cuidadores con coordenadas válidas", () => {
    const cuidadores = [
      crearCuidadorMock({ id: "1", nombre: "María González" }),
      crearCuidadorMock({
        id: "2",
        nombre: "Cuidador Sin Coords",
        latitud: null,
        longitud: null,
      }),
    ];

    render(<MapaCuidadores datos={cuidadores} />);

    const marcadores = screen.getAllByTestId("marker");
    expect(marcadores).toHaveLength(1);
    expect(marcadores[0]).toHaveAttribute("data-position", "-33.4314,-70.6093");

    expect(screen.getByText("María González")).toBeInTheDocument();
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver perfil" })).toHaveAttribute(
      "href",
      "/cuidadores/user-1",
    );
    expect(screen.queryByText("Cuidador Sin Coords")).not.toBeInTheDocument();
  });

  it("no renderiza el círculo ni la ubicación del usuario ni llama a flyTo si no hay centro", () => {
    render(<MapaCuidadores datos={[]} centro={null} radio={2000} />);

    expect(screen.queryByTestId("circle")).not.toBeInTheDocument();
    expect(screen.queryByText("Tu ubicación")).not.toBeInTheDocument();
    expect(flyToMock).not.toHaveBeenCalled();
  });

  it("renderiza el marcador de usuario, el círculo y llama a flyTo con el zoom correcto cuando hay centro y radio", () => {
    render(
      <MapaCuidadores
        datos={[]}
        centro={{ lat: -33.45, lng: -70.66 }}
        radio={2000}
      />,
    );

    const circulo = screen.getByTestId("circle");
    expect(circulo).toHaveAttribute("data-center", "-33.45,-70.66");
    expect(circulo).toHaveAttribute("data-radius", "2000");

    expect(screen.getByText("Tu ubicación")).toBeInTheDocument();
    expect(flyToMock).toHaveBeenCalledWith([-33.45, -70.66], 14);
  });
});
