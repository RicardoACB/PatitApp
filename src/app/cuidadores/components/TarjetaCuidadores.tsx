"use client";

import Link from "next/link";
import { CuidadorData } from "../../../../types/cuidadordata";

interface TarjetaCuidadorProps {
  cuidador: CuidadorData;
}

export default function TarjetaCuidadores({ cuidador }: TarjetaCuidadorProps) {
  return (
    <div className="flex flex-col sm:flex-row bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      {/* Espacio para la foto de perfil (Placeholder) */}
      <div className="w-full sm:w-56 h-48 sm:h-auto bg-secondary relative overflow-hidden flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border">
        <div className="absolute inset-0 z-10 flex items-end justify-center text-secondary-foreground">
          <svg
            className="w-60 h-60 opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div className="absolute inset-0 z-0 bg-none bg-opacity-0 group-hover:bg-opacity-5 transition-all"></div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
              {cuidador.nombre}
            </h3>

            {/* Sistema de Calificación */}
            <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-lg">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="font-bold text-sm text-secondary-foreground">
                {cuidador.rating}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                ({cuidador.total_reviews})
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-1 capitalize font-medium">
            Vive en {cuidador.tipo_vivienda}
          </p>

          {/* Descripción corta opcional */}
          {cuidador.descripcion_perfil && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {cuidador.descripcion_perfil}
            </p>
          )}
        </div>

        {/* Etiquetas dinámicas (Badges) generadas desde la base de datos */}
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {!cuidador.tiene_perros_propios && !cuidador.tiene_gatos_propios && (
            <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-md border border-border">
              Hogar sin mascotas
            </span>
          )}
          {cuidador.acepta_tamano_grande && (
            <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-md border border-border">
              Acepta Perros Grandes
            </span>
          )}
          {cuidador.acepta_tamano_mediano && (
            <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-md border border-border">
              Acepta Perros Medianos
            </span>
          )}
        </div>

        {/* Footer de la tarjeta con el precio */}
        <div className="flex justify-between items-end border-t border-border pt-4 mt-auto">
          <Link
            href={`/cuidadores/${cuidador.usuario_id}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Ver detalles del perfil
          </Link>
          <div className="text-right">
            <span className="text-xs text-muted-foreground font-medium mr-1">
              desde
            </span>
            <div className="text-xl font-black text-card-foreground inline-block">
              ${cuidador.tarifa_noche.toLocaleString("es-CL")}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                / noche
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
