import { ReactNode } from "react";

interface BuscadorContainerProps {
  lista: ReactNode;
  mapa: ReactNode;
}

export default function ContenedorBuscador({
  lista,
  mapa,
}: BuscadorContainerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full min-h-[calc(100vh-80px)] p-4">
      <div className="order-2 lg:order-1 flex flex-col gap-4">{lista}</div>

      <div className="order-1 lg:order-2 lg:sticky lg:top-24 h-[50vh] lg:h-[calc(100vh-120px)] rounded-xl overflow-hidden shadow-md z-10">
        {mapa}
      </div>
    </div>
  );
}
