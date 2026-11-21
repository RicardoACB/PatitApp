import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "next-themes";
import BotonTheme from "./BotonTheme";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("BotonTheme", () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra 'Activar modo claro' y cambia a 'light' cuando el tema actual es 'dark'", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "dark",
      setTheme: setThemeMock,
    });

    render(<BotonTheme />);

    const boton = screen.getByRole("button", { name: "Activar modo claro" });
    expect(boton).toBeInTheDocument();

    fireEvent.click(boton);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("muestra 'Activar modo oscuro' y cambia a 'dark' cuando el tema actual es 'light'", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
      setTheme: setThemeMock,
    });

    render(<BotonTheme />);

    const boton = screen.getByRole("button", { name: "Activar modo oscuro" });
    expect(boton).toBeInTheDocument();

    fireEvent.click(boton);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
