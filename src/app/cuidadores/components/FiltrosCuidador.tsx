"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { geocodificar } from "@/app/actions/geocodificar";

const OPCIONES_RADIO = [
  { label: "Hasta 1 km", metros: "1000" },
  { label: "Hasta 2 km", metros: "2000" },
  { label: "Hasta 3 km", metros: "3000" },
  { label: "Hasta 4 km", metros: "4000" },
  { label: "Hasta 5 km", metros: "5000" },
];

const RADIO_DEFECTO = "1000";
const TEXTO_UBICACION_ACTUAL = "Mi ubicación actual";

export default function FiltrosCuidador() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Estados inicializados desde la URL (radio por defecto: 1000m = 1 km)
  const [tamano, setTamano] = useState(searchParams.get("tamano") || "");
  const [vivienda, setVivienda] = useState(searchParams.get("vivienda") || "");
  const [radio, setRadio] = useState(
    searchParams.get("radio") || RADIO_DEFECTO,
  );
  const [sinPerros, setSinPerros] = useState(
    searchParams.get("sin_perros") === "true",
  );
  const [sinGatos, setSinGatos] = useState(
    searchParams.get("sin_gatos") === "true",
  );

  const [ubicacion, setUbicacion] = useState(
    searchParams.get("ubicacion") || "",
  );
  const [coordsActuales, setCoordsActuales] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState("");

  // 2. Precarga la ubicación actual en memoria sin navegar ni consultar la BD
  useEffect(() => {
    const tieneCoordenadas = searchParams.has("lat") && searchParams.has("lng");
    if (tieneCoordenadas || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        setCoordsActuales({
          lat: posicion.coords.latitude,
          lng: posicion.coords.longitude,
        });
        setUbicacion((prev) => prev || TEXTO_UBICACION_ACTUAL);
      },
      () => {
        // Si el usuario rechaza el permiso, no bloqueamos la página
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
    // Solo se ejecuta al montar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Función que arma la nueva URL y navega hacia ella al presionar "Filtrar"
  const aplicarFiltros = async () => {
    setErrorUbicacion("");
    const params = new URLSearchParams(searchParams.toString());

    if (tamano) params.set("tamano", tamano);
    else params.delete("tamano");

    if (vivienda) params.set("vivienda", vivienda);
    else params.delete("vivienda");

    params.set("radio", radio || RADIO_DEFECTO);

    if (sinPerros) params.set("sin_perros", "true");
    else params.delete("sin_perros");

    if (sinGatos) params.set("sin_gatos", "true");
    else params.delete("sin_gatos");

    const textoUbicacion = ubicacion.trim();

    if (!textoUbicacion) {
      params.delete("ubicacion");
      params.delete("lat");
      params.delete("lng");
    } else if (textoUbicacion === TEXTO_UBICACION_ACTUAL && coordsActuales) {
      // Usamos las coordenadas precargadas sin consultar Nominatim
      params.set("ubicacion", TEXTO_UBICACION_ACTUAL);
      params.set("lat", coordsActuales.lat.toString());
      params.set("lng", coordsActuales.lng.toString());
    } else if (textoUbicacion !== searchParams.get("ubicacion")) {
      setBuscando(true);
      const resultado = await geocodificar(textoUbicacion);
      setBuscando(false);

      if (!resultado) {
        setErrorUbicacion("No encontramos esa ubicación");
        return;
      }

      params.set("ubicacion", textoUbicacion);
      params.set("lat", resultado.lat.toString());
      params.set("lng", resultado.lng.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-nowrap md:flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      {/* Botón Inicio */}
      <Link
        href="/"
        className="whitespace-nowrap px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-card-foreground hover:bg-accent transition-colors flex items-center gap-1.5 shrink-0"
      >
        🐾 Inicio
      </Link>

      {/* Filtro de ubicación */}
      <div className="flex flex-col">
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && aplicarFiltros()}
          placeholder="Tu ubicación (ej: Providencia)"
          className="px-4 py-2 bg-card border border-input rounded-full text-sm font-medium text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errorUbicacion && (
          <span className="text-xs text-destructive mt-1 ml-2">
            {errorUbicacion}
          </span>
        )}
      </div>

      {/* Filtro de radio de búsqueda (por defecto 1 km / 1000m) */}
      <select
        value={radio}
        onChange={(e) => setRadio(e.target.value)}
        className="px-4 py-2 bg-card border border-input rounded-full text-sm font-medium text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        {OPCIONES_RADIO.map(({ label, metros }) => (
          <option key={metros} value={metros}>
            {label}
          </option>
        ))}
      </select>

      {/* Filtro: Tamaño del perro */}
      <select
        value={tamano}
        onChange={(e) => setTamano(e.target.value)}
        className="px-4 py-2 bg-card border border-input rounded-full text-sm font-medium text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        <option value="">Tamaño de tu perro</option>
        <option value="pequeno">Pequeño (hasta 10kg)</option>
        <option value="mediano">Mediano (11-25kg)</option>
        <option value="grande">Grande (+25kg)</option>
      </select>

      {/* Filtro: Tipo de vivienda (Patio) */}
      <select
        value={vivienda}
        onChange={(e) => setVivienda(e.target.value)}
        className="px-4 py-2 bg-card border border-input rounded-full text-sm font-medium text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        <option value="">Tipo de vivienda</option>
        <option value="casa">Casa con patio</option>
        <option value="departamento">Departamento</option>
      </select>

      {/* Toggle: Sin otros perros */}
      <button
        onClick={() => setSinPerros(!sinPerros)}
        className={`whitespace-nowrap px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
          sinPerros
            ? "bg-primary/10 border-primary text-primary"
            : "bg-card border-border text-card-foreground hover:bg-accent"
        }`}
      >
        Sin otros perros
      </button>

      {/* Toggle: Sin gatos */}
      <button
        onClick={() => setSinGatos(!sinGatos)}
        className={`whitespace-nowrap px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
          sinGatos
            ? "bg-primary/10 border-primary text-primary"
            : "bg-card border-border text-card-foreground hover:bg-accent"
        }`}
      >
        Sin gatos
      </button>

      {/* Botón de Acción Principal */}
      <button
        onClick={aplicarFiltros}
        disabled={buscando}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm ml-2 disabled:opacity-60"
      >
        {buscando ? "Buscando..." : "Filtrar"}
      </button>
    </div>
  );
}
