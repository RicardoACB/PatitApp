import Link from "next/link";

interface Cuidador {
  id: number;
  name: string;
  especialidad: string;
  lat: number;
  lng: number;
  descripcion: string;
}

interface TarjetaCuidadorProps {
  cuidador: Cuidador;
}

export default function TarjetaCuidador({ cuidador }: TarjetaCuidadorProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-card-foreground">
            {cuidador.name}
          </h3>
          <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded">
            {cuidador.especialidad}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          {cuidador.descripcion}
        </p>
      </div>
      <div className="flex justify-end">
        <Link
          href={`/cuidadores/${cuidador.id}`}
          className="inline-flex items-center px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary-dark transition-colors"
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}
