import { notFound } from "next/navigation";
import prisma from "../../../../../lib/prisma";
import Image from "next/image";

export default async function CuidadorPage({
  params,
}: PageProps<"/cuidadores/[id]">) {
  const id = (await params).id;

  function testUUID(str: string) {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return typeof str === "string" && regex.test(str);
  }

  if (!testUUID(id)) notFound();

  // 1. Agregamos el "await" crucial para que se ejecute la consulta
  const userData = await prisma.usuarios.findUnique({
    where: {
      id: id,
    },
    select: {
      nombre: true,
      foto_url: true,
      cuidadores: {
        select: {
          tarifa_noche: true,
          descripcion_perfil: true,
          acepta_tamano_grande: true,
          acepta_tamano_mediano: true,
          acepta_tamano_pequeno: true,
          acepta_cachorros: true,
          tiene_patio: true,
          tipo_vivienda: true,
          tiene_gatos_propios: true,
          tiene_perros_propios: true,
          rating: true,
          total_reviews: true,
          updated_at: true,
        },
      },
    },
  });

  // 2. Comprobamos si el usuario existe y tiene un perfil de cuidador
  if (!userData || !userData.cuidadores) {
    notFound();
  }

  // Si Prisma generó "cuidadores" como un array (por el nombre en plural), tomamos el primero.
  // Si es una relación 1 a 1 y es un objeto, lo usamos directamente.
  const cuidador = Array.isArray(userData.cuidadores)
    ? userData.cuidadores[0]
    : userData.cuidadores;

  if (!cuidador) {
    notFound();
  }

  // 3. Formateo de datos
  const fechaActualizacion = cuidador.updated_at
    ? cuidador.updated_at.toISOString().split("T")[0]
    : "No registrada";

  const ratingFormat = cuidador.rating
    ? Number(cuidador.rating).toFixed(1)
    : "Nuevo";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-12">
      {/* COLUMNA IZQUIERDA: Información principal */}
      <div className="flex-1 flex flex-col gap-10">
        {/* Encabezado del Perfil */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
            {userData.foto_url ? (
              <Image
                src={userData.foto_url}
                alt={`Foto de ${userData.nombre}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">
                👤
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {userData.nombre}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1 font-semibold text-gray-900">
                ⭐ {ratingFormat}
                <span className="font-normal text-gray-500">
                  ({cuidador.total_reviews} reseñas)
                </span>
              </span>
              <span>•</span>
              <span className="text-gray-500">
                Última actualización: {fechaActualizacion}
              </span>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Sobre el Cuidador */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre mí</h2>
          <div className="prose text-gray-600 leading-relaxed whitespace-pre-wrap">
            {cuidador.descripcion_perfil ||
              "Este cuidador aún no ha escrito una descripción."}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Detalles del Hogar y Mascotas */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detalles del alojamiento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            {/* Mascotas aceptadas */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🐕 Tamaños que acepta
              </h3>
              <ul className="space-y-2 text-gray-600">
                {cuidador.acepta_tamano_pequeno && (
                  <li>✅ Pequeños (0-7 kg)</li>
                )}
                {cuidador.acepta_tamano_mediano && (
                  <li>✅ Medianos (7-18 kg)</li>
                )}
                {cuidador.acepta_tamano_grande && (
                  <li>✅ Grandes (18-45 kg)</li>
                )}
              </ul>
              {cuidador.acepta_cachorros && (
                <li>{"🍼 Acepta cachorros (< 1 año)"}</li>
              )}
            </div>

            {/* Características del hogar */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🏠 Entorno
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="capitalize">
                  📍 Tipo: {cuidador.tipo_vivienda}
                </li>
                <li>
                  {cuidador.tiene_patio
                    ? "🌳 Tiene patio o jardín"
                    : "🏢 Sin patio"}
                </li>
                <li>
                  {cuidador.tiene_perros_propios
                    ? "🐶 Tiene perros propios"
                    : "🚫 Sin perros residentes"}
                </li>
                <li>
                  {cuidador.tiene_gatos_propios
                    ? "🐱 Tiene gatos propios"
                    : "🚫 Sin gatos residentes"}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* COLUMNA DERECHA: Sticky Aside (Caja de reserva) */}
      <aside className="w-full lg:w-96 relative">
        <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
          <div className="mb-6">
            <span className="text-3xl font-black text-gray-900">
              ${Number(cuidador.tarifa_noche).toLocaleString("es-CL")}
            </span>
            <span className="text-gray-500 ml-1 font-medium">/ noche</span>
          </div>

          <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-md">
            Solicitar Reserva
          </button>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-500">
            <div className="flex justify-between items-center">
              <span>Pago 100% seguro</span>
              <span>🔒</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Garantía veterinaria cubierta</span>
              <span>⚕️</span>
            </div>
            <div className="text-center text-xs mt-2 text-gray-400">
              No se te cobrará ningún monto en este paso.
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
