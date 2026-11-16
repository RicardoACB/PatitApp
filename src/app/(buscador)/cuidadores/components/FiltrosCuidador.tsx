"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { geocodificar } from "@/app/actions/geocodificar";

export default function FiltrosCuidador() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Inicializamos el estado leyendo la URL actual.
  const [tamano, setTamano] = useState(searchParams.get("tamano") || "");
  const [vivienda, setVivienda] = useState(searchParams.get("vivienda") || "");
  const [sinPerros, setSinPerros] = useState(
    searchParams.get("sin_perros") === "true",
  );
  const [sinGatos, setSinGatos] = useState(
    searchParams.get("sin_gatos") === "true",
  );

  // NUEVO: texto de ubicación (se guarda en la URL para que persista al recargar)
  const [ubicacion, setUbicacion] = useState(
    searchParams.get("ubicacion") || "",
  );
  const [buscando, setBuscando] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState("");

  // 2. Función que arma la nueva URL y navega hacia ella
  const aplicarFiltros = async () => {
    setErrorUbicacion("");
    const params = new URLSearchParams(searchParams.toString());

    if (tamano) params.set("tamano", tamano);
    else params.delete("tamano");

    if (vivienda) params.set("vivienda", vivienda);
    else params.delete("vivienda");

    if (sinPerros) params.set("sin_perros", "true");
    else params.delete("sin_perros");

    if (sinGatos) params.set("sin_gatos", "true");
    else params.delete("sin_gatos");

    // NUEVO: ubicación -> coordenadas
    const textoUbicacion = ubicacion.trim();

    if (!textoUbicacion) {
      // Campo vacío: quitamos la ubicación de la URL
      params.delete("ubicacion");
      params.delete("lat");
      params.delete("lng");
    } else if (textoUbicacion !== searchParams.get("ubicacion")) {
      // El texto cambió: consultamos Nominatim (si no cambió, reutilizamos lat/lng de la URL)
      setBuscando(true);
      const resultado = await geocodificar(textoUbicacion);
      setBuscando(false);

      if (!resultado) {
        setErrorUbicacion("No encontramos esa ubicación");
        return; // No navegamos si falló
      }

      params.set("ubicacion", textoUbicacion);
      params.set("lat", resultado.lat.toString());
      params.set("lng", resultado.lng.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-nowrap md:flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      {/* NUEVO: Filtro de ubicación */}
      <div className="flex flex-col">
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && aplicarFiltros()}
          placeholder="Tu ubicación (ej: Providencia)"
          className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorUbicacion && (
          <span className="text-xs text-red-600 mt-1 ml-2">
            {errorUbicacion}
          </span>
        )}
      </div>

      {/* Filtro: Tamaño del perro */}
      <select
        value={tamano}
        onChange={(e) => setTamano(e.target.value)}
        className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
        className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        Sin otros perros
      </button>

      {/* Toggle: Sin gatos */}
      <button
        onClick={() => setSinGatos(!sinGatos)}
        className={`whitespace-nowrap px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
          sinGatos
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        Sin gatos
      </button>

      {/* Botón de Acción Principal */}
      <button
        onClick={aplicarFiltros}
        disabled={buscando}
        className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm ml-2 disabled:opacity-60"
      >
        {buscando ? "Buscando..." : "Filtrar"}
      </button>
    </div>
  );
}
