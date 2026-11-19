import Link from "next/link";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* HEADER */}
      <header className="mx-auto flex max-w-[1200px] flex-col items-start gap-4 px-6 py-7 md:flex-row md:items-center md:justify-between md:gap-6">
        <a
          href="#inicio"
          className="inline-flex items-center text-[29px] font-extrabold tracking-[-1px] text-foreground focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
          aria-label="PatitApp, inicio"
        >
          <span aria-hidden="true" className="mr-[10px]">
            🐾
          </span>
          Patit<span className="text-primary">App</span>
        </a>

        <nav
          className="flex flex-wrap gap-[15px] text-[13px] md:gap-7 md:text-sm"
          aria-label="Navegación principal"
        >
          <a
            href="#como-funciona"
            className="text-foreground-muted transition-colors hover:text-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
          >
            Cómo funciona
          </a>
          <a
            href="#beneficios"
            className="text-foreground-muted transition-colors hover:text-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
          >
            Nuestra propuesta
          </a>
          <a
            href="#anfitriones"
            className="text-foreground-muted transition-colors hover:text-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
          >
            Anfitriones
          </a>
          <Link
            href="/cuidadores/buscar"
            className="text-foreground-muted transition-colors hover:text-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
          >
            Buscador
          </Link>
        </nav>
      </header>

      {/* CONTENIDO DE LA PÁGINA */}
      {children}

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-[1152px] flex-col items-start gap-5 border-t border-border px-6 py-[30px] md:flex-row md:items-center md:justify-between">
        <a
          href="#inicio"
          className="inline-flex items-center text-[29px] font-extrabold tracking-[-1px] text-foreground focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
        >
          Patit<span className="text-primary">App</span>
        </a>
        <p className="text-xs text-foreground-muted">
          Animales confiados, en manos seguras.
        </p>
        <small className="text-xs text-foreground-muted">
          Proyecto académico · Grupo 4 · UDP
        </small>
      </footer>
    </>
  );
}
