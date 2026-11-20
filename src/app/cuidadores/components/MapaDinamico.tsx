"use client";

import dynamic from "next/dynamic";
import type { CuidadorData } from "../../../../types/cuidadordata";

const MapaCuidadores = dynamic(() => import("./MapaCuidadores"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-secondary text-muted-foreground animate-pulse rounded-xl flex items-center justify-center">
      Cargando mapa interactivo...
    </div>
  ),
});

export interface Centro {
  lat: number;
  lng: number;
}

interface MapaDinamicoProps {
  datos: CuidadorData[];
  centro?: Centro | null;
  radio?: number | null;
}

export default function MapaDinamico({
  datos,
  centro = null,
  radio = null,
}: MapaDinamicoProps) {
  return <MapaCuidadores datos={datos} centro={centro} radio={radio} />;
}
