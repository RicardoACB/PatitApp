export default function CargaCuidadores() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full p-4 sm:p-6">
      {/* Columna izquierda: Esqueleto de ListaCuidadores */}
      <div className="flex flex-col gap-5">
        {/* Título de resultados */}
        <div className="h-6 w-56 bg-gray-200 rounded-md animate-pulse" />

        {/* 3 tarjetas de cuidador */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Placeholder de foto */}
              <div className="w-full sm:w-56 h-48 sm:h-auto bg-gray-200 animate-pulse flex-shrink-0" />

              {/* Placeholder de contenido */}
              <div className="flex flex-col flex-grow p-5 justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                </div>

                {/* Badges */}
                <div className="flex gap-2">
                  <div className="h-6 w-28 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse" />
                </div>

                {/* Footer con link y precio */}
                <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Columna derecha: Esqueleto de MapaDinamico */}
      <div className="hidden lg:block sticky top-20 h-[calc(100dvh-120px)] w-full bg-slate-200 rounded-xl animate-pulse" />
    </div>
  );
}
