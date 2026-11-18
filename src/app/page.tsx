import Image from "next/image";

const pasos = [
  {
    numero: "01",
    titulo: "Busca cerca de ti",
    texto:
      "Encuentra un hogar temporal según tu comuna y las necesidades de tu mascota.",
  },
  {
    numero: "02",
    titulo: "Conoce al anfitrión",
    texto:
      "Revisa las características del hogar y coordina un encuentro previo sin compromiso.",
  },
  {
    numero: "03",
    titulo: "Prepara su estadía",
    texto:
      "Comparte sus horarios, alimentación y cuidados para mantener su rutina.",
  },
  {
    numero: "04",
    titulo: "Mantente cerca",
    texto:
      "Nuestra propuesta contempla fotos y reportes para acompañar su día a día.",
  },
];

const beneficios = [
  {
    titulo: "Un hogar temporal",
    texto:
      "Un ambiente hogareño donde tu mascota pueda descansar, jugar y recibir compañía.",
  },
  {
    titulo: "Información para decidir",
    texto:
      "Conoce el tipo de vivienda, sus espacios y la experiencia del anfitrión.",
  },
  {
    titulo: "Su rutina importa",
    texto:
      "Cada mascota tiene necesidades distintas. Compartirlas es el primer paso para cuidarla.",
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section
        id="inicio"
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-[30px] px-6 pb-[30px] pt-5 lg:grid-cols-2 lg:items-center lg:gap-[55px] lg:pb-[70px] lg:pt-10 scroll-mt-6"
      >
        <div>
          <p className="mb-[18px] text-[11px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary-dark">
            PEQUEÑAS PATITAS, GRANDES CUIDADOS
          </p>

          <h1 className="mb-[26px] text-[clamp(46px,5.5vw,76px)] font-extrabold leading-[1.08] tracking-[-2px] md:tracking-[-3px]">
            Tu mascota,
            <br />
            como en <span className="text-primary">casa.</span>
          </h1>

          <p className="mb-[28px] max-w-[460px] text-[17px] leading-[1.8] text-foreground-muted">
            Un hogar temporal y alguien que la cuide con cariño. PatitApp busca
            conectar a dueños de mascotas con anfitriones en Santiago.
          </p>

          <a
            className="inline-block rounded-xl bg-primary px-[22px] py-4 text-center text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
            href="#como-funciona"
          >
            Conoce cómo funciona →
          </a>

          <p className="mt-[25px] text-xs text-foreground-muted">
            Animales confiados, en manos seguras.
          </p>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[80px_20px_20px_20px] bg-muted md:min-h-[400px] lg:min-h-[480px] lg:rounded-[120px_24px_24px_24px]">
          <Image
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1000&q=85&fit=crop"
            alt="Perro disfrutando al aire libre"
            fill
            priority
            unoptimized
            sizes="(max-width: 760px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute bottom-6 left-6 rounded-xl bg-card px-6 py-[18px] text-[17px] leading-[1.6] text-card-foreground">
            Un nuevo hogar.
            <strong className="block text-foreground">El mismo cariño.</strong>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section
        id="beneficios"
        className="mx-auto max-w-[1200px] px-6 py-10 md:py-[55px] scroll-mt-6"
      >
        <p className="mb-[18px] text-[11px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary-dark">
          PENSADO PARA SU BIENESTAR
        </p>
        <h2 className="mb-[30px] text-[clamp(28px,3vw,38px)] font-extrabold leading-[1.25] tracking-[-1px]">
          Mucho más que un lugar donde quedarse.
        </h2>

        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {beneficios.map((beneficio) => (
            <article
              className="rounded-2xl border border-border bg-card p-[30px] text-card-foreground"
              key={beneficio.titulo}
            >
              <h3 className="mb-3 text-[19px] font-bold leading-[1.4] text-foreground">
                {beneficio.titulo}
              </h3>
              <p className="text-[15px] leading-[1.8] text-foreground-muted">
                {beneficio.texto}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="mt-[30px] bg-secondary">
        <div className="mx-auto max-w-[1200px] px-6 py-10 md:py-[55px] scroll-mt-6">
          <p className="mb-[18px] text-[11px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary-dark">
            DE TU CASA A UN HOGAR DE CONFIANZA
          </p>
          <h2 className="mb-[30px] text-[clamp(28px,3vw,38px)] font-extrabold leading-[1.25] tracking-[-1px] text-secondary-foreground">
            Tu tranquilidad empieza aquí.
          </h2>

          <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((paso) => (
              <article key={paso.numero}>
                <span className="mb-5 block text-[34px] font-extrabold text-primary-dark">
                  {paso.numero}
                </span>
                <h3 className="mb-3 text-[19px] font-bold leading-[1.4] text-secondary-foreground">
                  {paso.titulo}
                </h3>
                <p className="text-[15px] leading-[1.8] text-foreground-muted">
                  {paso.texto}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ANFITRIONES */}
      <section
        id="anfitriones"
        className="mx-auto max-w-[1200px] px-6 py-10 md:py-[55px] scroll-mt-6"
      >
        <div className="flex flex-col items-start gap-[35px] rounded-[20px] bg-secondary p-7 md:p-[42px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[640px]">
            <p className="mb-[18px] text-[11px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary-dark">
              HAZ ESPACIO PARA UNA NUEVA AMISTAD
            </p>
            <h2 className="mb-4 text-[clamp(28px,3vw,38px)] font-extrabold leading-[1.25] tracking-[-1px] text-secondary-foreground">
              Tu hogar puede ser su lugar feliz.
            </h2>
            <p className="text-[15px] leading-[1.8] text-foreground-muted">
              La propuesta está dirigida a personas con tiempo, experiencia y un
              espacio adecuado para recibir mascotas.
            </p>
          </div>

          <a
            className="inline-block shrink-0 rounded-xl bg-primary px-[22px] py-4 text-center text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
            href="#preguntas"
          >
            Conoce la propuesta →
          </a>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      <section
        id="preguntas"
        className="mx-auto max-w-[850px] px-6 pb-[70px] pt-[30px] scroll-mt-6"
      >
        <p className="mb-[18px] text-[11px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary-dark">
          RESOLVAMOS TUS DUDAS
        </p>
        <h2 className="mb-[30px] text-[clamp(28px,3vw,38px)] font-extrabold leading-[1.25] tracking-[-1px]">
          Antes de hacer las maletas.
        </h2>

        <details className="group border-b border-border py-[22px]">
          <summary className="cursor-pointer font-bold leading-[1.6] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring">
            ¿Qué es PatitApp?
          </summary>
          <p className="mt-[14px] text-[15px] leading-[1.8] text-foreground-muted">
            Es un proyecto universitario que propone conectar a dueños de
            mascotas con anfitriones que puedan hospedarlas temporalmente en sus
            hogares.
          </p>
        </details>

        <details className="group border-b border-border py-[22px]">
          <summary className="cursor-pointer font-bold leading-[1.6] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring">
            ¿Para quién está pensado?
          </summary>
          <p className="mt-[14px] text-[15px] leading-[1.8] text-foreground-muted">
            Para dueños de perros y gatos en Santiago que necesitan apoyo
            durante viajes o ausencias, y para personas que cuentan con tiempo y
            espacio para cuidarlos.
          </p>
        </details>

        <details className="group border-b border-border py-[22px]">
          <summary className="cursor-pointer font-bold leading-[1.6] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring">
            ¿Podré conocer el hogar antes de decidir?
          </summary>
          <p className="mt-[14px] text-[15px] leading-[1.8] text-foreground-muted">
            El proyecto contempla un encuentro previo gratuito y sin compromiso
            para conocer al anfitrión, el espacio y las necesidades de tu
            mascota.
          </p>
        </details>

        <details className="group border-b border-border py-[22px]">
          <summary className="cursor-pointer font-bold leading-[1.6] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring">
            ¿Qué información conviene compartir?
          </summary>
          <p className="mt-[14px] text-[15px] leading-[1.8] text-foreground-muted">
            Sus horarios de alimentación, hábitos, comportamiento, necesidades
            especiales y contactos para emergencias.
          </p>
        </details>

        <details className="group border-b border-border py-[22px]">
          <summary className="cursor-pointer font-bold leading-[1.6] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring">
            ¿Esta página permite hacer reservas?
          </summary>
          <p className="mt-[14px] text-[15px] leading-[1.8] text-foreground-muted">
            Esta página presenta la propuesta de PatitApp. La búsqueda de
            anfitriones y la gestión de reservas corresponden a otros módulos
            del proyecto.
          </p>
        </details>
      </section>
    </main>
  );
}
