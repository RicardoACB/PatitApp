import Link from 'next/link';

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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{cuidador.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {cuidador.especialidad}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{cuidador.descripcion}</p>
      </div>
      <div className="flex justify-end">
        <Link
          href={`/cuidadores/${cuidador.id}`}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}