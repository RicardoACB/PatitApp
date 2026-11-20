import { PropsWithChildren, Suspense } from "react";
import FiltrosCuidador from "../components/FiltrosCuidador";
import BotonTheme from "@/components/BotonTheme";

export default function BuscadorLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-background">
      <header className="sticky top-0 z-30 w-full bg-background border-b border-border shadow-sm px-3 sm:px-4 py-2 md:py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 md:gap-4">
          {/* min-w-0 permite que el scroll horizontal funcione dentro de un contenedor flex */}
          <div className="flex-1 min-w-0">
            <Suspense
              fallback={
                <div className="h-10 w-full md:w-[720px] max-w-full bg-secondary animate-pulse rounded-full" />
              }
            >
              <FiltrosCuidador />
            </Suspense>
          </div>

          <div className="shrink-0">
            <BotonTheme />
          </div>
        </div>
      </header>

      <main className="flex flex-grow w-full max-w-[1600px] mx-auto">
        {children}
      </main>
    </div>
  );
}
