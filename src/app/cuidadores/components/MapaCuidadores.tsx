"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CuidadorData } from "../../../../types/cuidadordata";

interface Centro {
  lat: number;
  lng: number;
}

interface MapaCuidadoresProps {
  datos: CuidadorData[];
  centro?: Centro | null;
  radio?: number | null;
}

// Ajusta la vista y el zoom del mapa según el centro y el radio elegido
function CentrarMapa({
  centro,
  radio,
}: {
  centro: Centro | null;
  radio: number | null;
}) {
  const map = useMap();
  const lat = centro?.lat;
  const lng = centro?.lng;

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      const zoomPorRadio =
        !radio || radio <= 1000
          ? 15
          : radio <= 2000
            ? 14
            : radio <= 4000
              ? 13
              : 12;

      map.flyTo([lat, lng], zoomPorRadio);
    }
  }, [lat, lng, radio, map]);

  return null;
}

export default function MapaCuidadores({
  datos,
  centro = null,
  radio = null,
}: MapaCuidadoresProps) {
  const [mapKey] = useState(() => crypto.randomUUID());

  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
      ._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  const centroSantiago: [number, number] = [-33.4489, -70.6693];

  // Marcador para la ubicación del usuario
  const iconoUsuario = useMemo(() => {
    return L.divIcon({
      className: "",
      html: '<div style="width:18px;height:18px;background:var(--primary);border:3px solid var(--primary-foreground);border-radius:50%;box-shadow:0 0 0 2px color-mix(in srgb, var(--primary) 35%, transparent),0 1px 4px rgba(0,0,0,.4)"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }, []);

  // Marcador destacado para los cuidadores cercanos
  const iconoCuidador = useMemo(() => {
    return L.divIcon({
      className: "",
      html: '<div style="width:28px;height:28px;background:var(--primary-dark);border:3px solid var(--primary-foreground);border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;font-size:14px;">🐾</div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        key={mapKey}
        center={centro ? [centro.lat, centro.lng] : centroSantiago}
        zoom={11}
        scrollWheelZoom={true}
        maxBounds={[
          [-34.2917449, -71.7148502],
          [-32.9222125, -69.7691059],
        ]}
        maxBoundsViscosity={0.9}
        minZoom={11}
        className="w-full h-full rounded-xl shadow-sm border border-border"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CentrarMapa centro={centro} radio={radio} />

        {/* Círculo del radio de búsqueda en metros */}
        {centro && radio && (
          <Circle
            center={[centro.lat, centro.lng]}
            radius={radio}
            pathOptions={{
              color: "var(--primary)",
              fillColor: "var(--primary)",
              fillOpacity: 0.12,
              weight: 2,
            }}
          />
        )}

        {/* Marcador de la ubicación del usuario */}
        {centro && (
          <Marker position={[centro.lat, centro.lng]} icon={iconoUsuario}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}

        {/* Marcadores de los cuidadores cercanos */}
        {datos.map((cuidador) => {
          if (cuidador.latitud == null || cuidador.longitud == null) {
            return null;
          }

          return (
            <Marker
              key={cuidador.id}
              position={[cuidador.latitud, cuidador.longitud]}
              icon={iconoCuidador}
            >
              <Popup className="rounded-xl">
                <div className="flex flex-col gap-1 min-w-[140px] p-1">
                  <h3 className="font-bold text-popover-foreground m-0 text-base leading-tight">
                    {cuidador.nombre}
                  </h3>

                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-muted-foreground">
                      {cuidador.rating}
                    </span>
                  </div>

                  <div className="text-sm font-medium text-popover-foreground mt-1">
                    ${cuidador.tarifa_noche.toLocaleString("es-CL")} / noche
                  </div>

                  <Link
                    href={`/cuidadores/${cuidador.usuario_id}`}
                    className="mt-2 w-full bg-primary !text-primary-foreground text-center text-xs py-1.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Ver perfil
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
