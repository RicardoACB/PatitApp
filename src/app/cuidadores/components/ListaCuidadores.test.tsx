import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ListaCuidadores from "./ListaCuidadores";
import { CuidadorData } from "../../../../types/cuidadordata";

const crearCuidadorMock = (
  overrides: Partial<CuidadorData> = {},
): CuidadorData =>
  ({
    id: "cuid-1",
    usuario_id: "user-1",
    nombre: "María González",
    rating: 4.8,
    total_reviews: 12,
    tipo_vivienda: "casa",
    descripcion_perfil: "Amante de los animales con patio grande.",
    tiene_perros_propios: false,
    tiene_gatos_propios: false,
    acepta_tamano_grande: true,
    acepta_tamano_mediano: true,
    tarifa_noche: 15000,
    ...overrides,
  }) as CuidadorData;

describe("ListaCuidadores", () => {
  it("muestra el estado vacío genérico cuando no hay datos ni radio", () => {
    render(<ListaCuidadores datos={[]} />);

    expect(screen.getByText("No encontramos cuidadores")).toBeInTheDocument();
    expect(
      screen.getByText(/Intenta ajustar los filtros de tamaño/i),
    ).toBeInTheDocument();
  });

  it("muestra el estado vacío con el radio en kilómetros cuando se pasa radio", () => {
    render(<ListaCuidadores datos={[]} radio={2000} />);

    expect(screen.getByText("No encontramos cuidadores")).toBeInTheDocument();
    expect(
      screen.getByText(/No hay cuidadores disponibles en un radio de 2 km/i),
    ).toBeInTheDocument();
  });

  it("muestra el encabezado en singular y con radio cuando hay 1 cuidador", () => {
    render(<ListaCuidadores datos={[crearCuidadorMock()]} radio={1000} />);

    expect(
      screen.getByRole("heading", {
        name: "1 cuidador disponible en un radio de 1 km",
      }),
    ).toBeInTheDocument();
  });

  it("muestra el encabezado en plural y sin radio cuando hay múltiples cuidadores", () => {
    const cuidadores = [
      crearCuidadorMock({ id: "cuid-1", nombre: "María González" }),
      crearCuidadorMock({ id: "cuid-2", nombre: "Carlos Pérez" }),
    ];

    render(<ListaCuidadores datos={cuidadores} />);

    expect(
      screen.getByRole("heading", { name: "2 cuidadores disponibles" }),
    ).toBeInTheDocument();
    expect(screen.getByText("María González")).toBeInTheDocument();
    expect(screen.getByText("Carlos Pérez")).toBeInTheDocument();
  });

  it("renderiza los datos del cuidador, sus badges activos y el enlace al perfil", () => {
    render(<ListaCuidadores datos={[crearCuidadorMock()]} />);

    expect(screen.getByText("María González")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("(12)")).toBeInTheDocument();
    expect(screen.getByText("Vive en casa")).toBeInTheDocument();
    expect(
      screen.getByText("Amante de los animales con patio grande."),
    ).toBeInTheDocument();

    expect(screen.getByText("Hogar sin mascotas")).toBeInTheDocument();
    expect(screen.getByText("Acepta Perros Grandes")).toBeInTheDocument();
    expect(screen.getByText("Acepta Perros Medianos")).toBeInTheDocument();

    const linkPerfil = screen.getByRole("link", {
      name: "Ver detalles del perfil",
    });
    expect(linkPerfil).toHaveAttribute("href", "/cuidadores/user-1");
  });

  it("oculta los badges cuando el cuidador tiene mascotas y no acepta tamaños grande/mediano", () => {
    const cuidadorConRestricciones = crearCuidadorMock({
      tiene_perros_propios: true,
      tiene_gatos_propios: false,
      acepta_tamano_grande: false,
      acepta_tamano_mediano: false,
      descripcion_perfil: null,
    });

    render(<ListaCuidadores datos={[cuidadorConRestricciones]} />);

    expect(screen.queryByText("Hogar sin mascotas")).not.toBeInTheDocument();
    expect(screen.queryByText("Acepta Perros Grandes")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Acepta Perros Medianos"),
    ).not.toBeInTheDocument();
  });
});
