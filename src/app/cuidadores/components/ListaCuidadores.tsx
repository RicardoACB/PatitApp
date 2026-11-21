"use client";

import { CuidadorData } from "../../../../types/cuidadordata";
import TarjetaCuidador from "./TarjetaCuidador";

interface ListaCuidadoresProps {
  datos: CuidadorData[];
  radio?: number | null;
}

export default function ListaCuidadores({
  datos,
  radio = null,
}: ListaCuidadoresProps) {
  const radioKm = radio ? radio / 1000 : null;

  // Manejo del estado vacío: Si la consulta de Prisma/PostGIS no devuelve a nadie
  if (!datos || datos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center border-2 border-dashed border-border rounded-xl bg-card">
        <span className="text-5xl mb-4">🐕</span>
        <h3 className="text-xl font-bold text-card-foreground">
          No encontramos cuidadores
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          {radioKm
            ? `No hay cuidadores disponibles en un radio de ${radioKm} km con estos filtros. Intenta ampliar el radio de búsqueda o ajustar las restricciones.`
            : "Intenta ajustar los filtros de tamaño, vivienda o restricciones para ver más resultados disponibles en tu zona."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Encabezado de resultados */}
      <h2 className="text-lg font-semibold text-foreground">
        {datos.length}{" "}
        {datos.length === 1 ? "cuidador disponible" : "cuidadores disponibles"}
        {radioKm ? ` en un radio de ${radioKm} km` : ""}
      </h2>

      {/* Renderizado de la lista de tarjetas */}
      <div className="flex flex-col gap-4">
        {datos.map((cuidador) => (
          <TarjetaCuidador key={cuidador.id} cuidador={cuidador} />
        ))}
      </div>
    </div>
  );
}
