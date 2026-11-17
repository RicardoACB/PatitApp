import Image from "next/image";
import styles from "./page.module.css";

const pasos = [
  {
    numero: "01",
    titulo: "Busca cerca de ti",
    texto: "Encuentra un hogar temporal según tu comuna y las necesidades de tu mascota.",
  },
  {
    numero: "02",
    titulo: "Conoce al anfitrión",
    texto: "Revisa las características del hogar y coordina un encuentro previo sin compromiso.",
  },
  {
    numero: "03",
    titulo: "Prepara su estadía",
    texto: "Comparte sus horarios, alimentación y cuidados para mantener su rutina.",
  },
  {
    numero: "04",
    titulo: "Mantente cerca",
    texto: "Nuestra propuesta contempla fotos y reportes para acompañar su día a día.",
  },
];

const beneficios = [
  {
    titulo: "Un hogar temporal",
    texto: "Un ambiente hogareño donde tu mascota pueda descansar, jugar y recibir compañía.",
  },
  {
    titulo: "Información para decidir",
    texto: "Conoce el tipo de vivienda, sus espacios y la experiencia del anfitrión.",
  },
  {
    titulo: "Su rutina importa",
    texto: "Cada mascota tiene necesidades distintas. Compartirlas es el primer paso para cuidarla.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a
          href="#inicio"
          className={styles.logo}
          aria-label="PatitApp, inicio"
        >
          <span aria-hidden="true">🐾</span>
          Patit<span className={styles.accent}>App</span>
        </a>

        <nav className={styles.nav} aria-label="Navegación principal">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#beneficios">Nuestra propuesta</a>
          <a href="#anfitriones">Anfitriones</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>
              PEQUEÑAS PATITAS, GRANDES CUIDADOS
            </p>

            <h1>
              Tu mascota,
              <br />
              como en <span>casa.</span>
            </h1>

            <p className={styles.intro}>
              Un hogar temporal y alguien que la cuide con cariño.
              PatitApp busca conectar a dueños de mascotas con
              anfitriones en Santiago.
            </p>

            <a className={styles.button} href="#como-funciona">
              Conoce cómo funciona →
            </a>

            <p className={styles.slogan}>
              Animales confiados, en manos seguras.
            </p>
          </div>

          <div className={styles.photo}>
            <Image
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1000&q=85&fit=crop"
              alt="Perro disfrutando al aire libre"
              fill
              priority
              unoptimized
              sizes="(max-width: 760px) 100vw, 50vw"
              className={styles.heroImage}
            />

            <div className={styles.photoCaption}>
              Un nuevo hogar.
              <strong>El mismo cariño.</strong>
            </div>
          </div>
        </section>

        <section id="beneficios" className={styles.section}>
          <p className={styles.eyebrow}>PENSADO PARA SU BIENESTAR</p>
          <h2>Mucho más que un lugar donde quedarse.</h2>

          <div className={styles.cards}>
            {beneficios.map((beneficio) => (
              <article className={styles.card} key={beneficio.titulo}>
                <h3>{beneficio.titulo}</h3>
                <p>{beneficio.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className={styles.stepsSection}>
          <div className={styles.section}>
            <p className={styles.eyebrow}>
              DE TU CASA A UN HOGAR DE CONFIANZA
            </p>
            <h2>Tu tranquilidad empieza aquí.</h2>

            <div className={styles.steps}>
              {pasos.map((paso) => (
                <article key={paso.numero}>
                  <span className={styles.stepNumber}>
                    {paso.numero}
                  </span>
                  <h3>{paso.titulo}</h3>
                  <p>{paso.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="anfitriones" className={styles.section}>
          <div className={styles.hostBanner}>
            <div>
              <p className={styles.eyebrow}>
                HAZ ESPACIO PARA UNA NUEVA AMISTAD
              </p>
              <h2>Tu hogar puede ser su lugar feliz.</h2>
              <p>
                La propuesta está dirigida a personas con tiempo,
                experiencia y un espacio adecuado para recibir mascotas.
              </p>
            </div>

            <a className={styles.button} href="#preguntas">
              Conoce la propuesta →
            </a>
          </div>
        </section>

        <section id="preguntas" className={styles.faq}>
          <p className={styles.eyebrow}>RESOLVAMOS TUS DUDAS</p>
          <h2>Antes de hacer las maletas.</h2>

          <details>
            <summary>¿Qué es PatitApp?</summary>
            <p>
              Es un proyecto universitario que propone conectar a
              dueños de mascotas con anfitriones que puedan hospedarlas
              temporalmente en sus hogares.
            </p>
          </details>

          <details>
            <summary>¿Para quién está pensado?</summary>
            <p>
              Para dueños de perros y gatos en Santiago que necesitan
              apoyo durante viajes o ausencias, y para personas que
              cuentan con tiempo y espacio para cuidarlos.
            </p>
          </details>

          <details>
            <summary>¿Podré conocer el hogar antes de decidir?</summary>
            <p>
              El proyecto contempla un encuentro previo gratuito y sin
              compromiso para conocer al anfitrión, el espacio y las
              necesidades de tu mascota.
            </p>
          </details>

          <details>
            <summary>¿Qué información conviene compartir?</summary>
            <p>
              Sus horarios de alimentación, hábitos, comportamiento,
              necesidades especiales y contactos para emergencias.
            </p>
          </details>

          <details>
            <summary>¿Esta página permite hacer reservas?</summary>
            <p>
              Esta página presenta la propuesta de PatitApp. La búsqueda
              de anfitriones y la gestión de reservas corresponden a
              otros módulos del proyecto.
            </p>
          </details>
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="#inicio" className={styles.logo}>
          Patit<span className={styles.accent}>App</span>
        </a>
        <p>Animales confiados, en manos seguras.</p>
        <small>Proyecto académico · Grupo 4 · UDP</small>
      </footer>
    </div>
  );
}
