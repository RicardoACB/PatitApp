"use client";

import dynamic from "next/dynamic";
// import { CuidadorData } from '../types';

// Importamos el mapa real de forma dinámica, apagando el SSR
const MapaCuidadores = dynamic(() => import("./MapaCuidadores"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-200 animate-pulse rounded-xl flex items-center justify-center">
      Cargando mapa interactivo...
    </div>
  ),
});

// Tipo reutilizable para las coordenadas del filtro
export interface Centro {
  lat: number;
  lng: number;
}

interface MapaDinamicoProps {
  datos: any[]; // Recomendación: cambia "any[]" por "CuidadorData[]"
  centro?: Centro | null; // NUEVO: coordenadas elegidas en el filtro
}

export default function MapaDinamico({
  datos,
  centro = null,
}: MapaDinamicoProps) {
  return <MapaCuidadores datos={datos} centro={centro} />;
}
