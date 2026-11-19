"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CuidadorData {
  id: string;
  nombre: string;
  tarifa_noche: number;
  rating: number;
  latitud?: number | null;
  longitud?: number | null;
}

interface Centro {
  lat: number;
  lng: number;
}

interface MapaCuidadoresProps {
  datos: CuidadorData[];
  centro?: Centro | null; // NUEVO
}

// NUEVO: mueve la vista del mapa cuando cambian las coordenadas
function CentrarMapa({ centro }: { centro: Centro | null }) {
  const map = useMap();
  const lat = centro?.lat;
  const lng = centro?.lng;

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.flyTo([lat, lng], 14);
    }
  }, [lat, lng, map]);

  return null;
}

export default function MapaCuidadores({
  datos,
  centro = null,
}: MapaCuidadoresProps) {
  // 1. Control de montaje y limpieza del contenedor DOM para Leaflet
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    // Si quedó un contenedor con una instancia previa de Leaflet, limpiamos su ID
    const container = document.getElementById("patitapp-map-container");
    if (container) {
      delete (container as unknown as { _leaflet_id?: unknown })._leaflet_id;
    }
    setMounted(true);

    return () => {
      const el = document.getElementById("patitapp-map-container");
      if (el) {
        delete (el as unknown as { _leaflet_id?: unknown })._leaflet_id;
      }
    };
  }, []);

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

  // 2. Centro inicial por defecto (Santiago de Chile)
  const centroSantiago: [number, number] = [-33.4489, -70.6693];

  const iconoUsuario = useMemo(() => {
    return L.divIcon({
      className: "",
      html: '<div style="width:18px;height:18px;background:#2563eb;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 2px #2563eb55,0 1px 4px rgba(0,0,0,.4)"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400 text-sm">
        Cargando mapa...
      </div>
    );
  }

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        id="patitapp-map-container"
        center={centroSantiago}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl shadow-sm border border-gray-200"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* NUEVO: centra el mapa en la ubicación del filtro */}
        <CentrarMapa centro={centro} />

        {/* NUEVO: marcador de la ubicación del usuario */}
        {centro && (
          <Marker position={[centro.lat, centro.lng]} icon={iconoUsuario}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}

        {/* 3. Marcadores de los cuidadores */}
        {datos.map((cuidador) => {
          if (!cuidador.latitud || !cuidador.longitud) return null;

          return (
            <Marker
              key={cuidador.id}
              position={[cuidador.latitud, cuidador.longitud]}
            >
              <Popup className="rounded-xl">
                <div className="flex flex-col gap-1 min-w-[140px] p-1">
                  <h3 className="font-bold text-gray-900 m-0 text-base leading-tight">
                    {cuidador.nombre}
                  </h3>

                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-700">
                      {cuidador.rating}
                    </span>
                  </div>

                  <div className="text-sm font-medium text-gray-800 mt-1">
                    ${cuidador.tarifa_noche.toLocaleString("es-CL")} / noche
                  </div>

                  <button className="mt-2 w-full bg-blue-600 text-white text-xs py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Ver perfil
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
