"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = new L.LatLng(-33.448, -70.669);

const santiagoBounds = L.latLngBounds(
  [-33.678367, -70.973053],
  [-33.253461, -70.455322],
);

// Corrección obligatoria para los íconos de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationSelector({
  position,
  setPosition,
}: {
  position: L.LatLng | null;
  setPosition: (pos: L.LatLng) => void;
}) {
  const map = useMapEvents({
    click(e) {
      if (!santiagoBounds.contains(e.latlng)) {
        setPosition(defaultCenter);
        map.flyTo(defaultCenter, map.getZoom());
        return;
      }

      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Tu ubicación de búsqueda</Popup>
    </Marker>
  );
}

export default function MapLogic() {
  // Coordenadas por defecto (Ej: Santiago, Chile)
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);

  // Datos simulados de cuidadores (en producción, esto se actualizaría al cambiar userLocation)
  const cuidadores = [
    {
      id: 1,
      name: "María Pérez",
      especialidad: "Adulto Mayor",
      lat: -33.45,
      lng: -70.67,
      descripcion: "",
    },
    {
      id: 2,
      name: "Juan Silva",
      especialidad: "Enfermería",
      lat: -33.445,
      lng: -70.665,
      descripcion: "",
    },
  ];

  useEffect(() => {
    // Obtener ubicación real del usuario al cargar
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation(
            new L.LatLng(pos.coords.latitude, pos.coords.longitude),
          ),
        (err) => console.warn("Geolocalización denegada o fallida.", err),
      );
    }
  }, []);

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-300 shadow-md">
      <MapContainer
        center={defaultCenter}
        zoom={14}
        maxBounds={santiagoBounds}
        maxBoundsViscosity={1.0}
        minZoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Control de selección de ubicación */}
        <LocationSelector
          position={userLocation}
          setPosition={setUserLocation}
        />

        {/* Renderizado de cuidadores cercanos */}
        {cuidadores.map((cuidador) => (
          <Marker key={cuidador.id} position={[cuidador.lat, cuidador.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg text-blue-900">
                  {cuidador.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {cuidador.especialidad}
                </p>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm w-full hover:bg-blue-700">
                  Ver perfil
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
