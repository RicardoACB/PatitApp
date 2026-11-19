"use server";

export type Ubicacion = { lat: number; lng: number; nombre: string };

export async function geocodificar(texto: string): Promise<Ubicacion | null> {
  const q = texto.trim();
  if (q.length < 3) return null;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "cl");

  const res = await fetch(url, {
    headers: { "User-Agent": "patitapp/1.0 (tu-correo@ejemplo.com)" },
  });
  if (!res.ok) return null;

  const data = await res.json();
  if (!data[0]) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    nombre: data[0].display_name,
  };
}
