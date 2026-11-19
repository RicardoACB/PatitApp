export default function Loading() {
  return (
    // Contenedor centrado que ocupa la mayor parte de la pantalla
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full gap-5">
      {/* Contenedor del icono y el spinner */}
      <div className="relative flex items-center justify-center">
        {/* El anillo giratorio (spinner) */}
        <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>

        {/* El icono de patita fijo en el centro */}
        <div className="absolute text-3xl">🐾</div>
      </div>

      {/* Textos de carga con animación de pulso (opacidad) */}
      <div className="flex flex-col items-center text-center animate-pulse">
        <h2 className="text-xl font-bold text-gray-800">
          Buscando cuidador...
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-xs">
          Preparando los mejores hogares para tu mascota en Santiago
        </p>
      </div>
    </div>
  );
}
