# 🐾 PatitApp

Plataforma web que conecta a dueños de mascotas en Santiago con anfitriones verificados que ofrecen hospedaje temporal en sus hogares.

> **Versión actual:** `0.1.0` · Proyecto académico — Grupo 4 · Universidad Diego Portales (UDP).

---

## ✨ Funcionalidades implementadas (v0.1.0)

- **Landing Page (`/`):** Presentación de la propuesta, beneficios, flujo de uso, sección para anfitriones, preguntas frecuentes y soporte de tema claro/oscuro.
- **Buscador de cuidadores (`/cuidadores/buscar`):**
  - Geocodificación de direcciones y comunas mediante Server Action (`geocodificador`).
  - Filtros dinámicos sincronizados con la URL (ubicación, radio de búsqueda, tamaños aceptados y características del hogar).
  - Visualización interactiva en mapa con **Leaflet** (marcadores y radio de búsqueda) y listado de tarjetas.
- **Perfil de cuidador (`/cuidadores/[id]`):** Vista de detalle con tarifa por noche, calificación, tamaños de mascotas aceptados, entorno del hogar y estado de carga dedicado.
- **Pruebas unitarias:** Cobertura con Jest y Testing Library para lógica pura en `lib/`, componentes interactivos y Server Actions (13 suites / 50 tests).

---

## 🛠️ Stack tecnológico

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Lenguaje:** TypeScript
- **UI y Estilos:** React, Tailwind CSS (tokens semánticos para modo claro/oscuro)
- **Base de datos y ORM:** PostgreSQL (Supabase) + Prisma 7
- **Mapas:** Leaflet
- **Testing:** Jest + React Testing Library
- **Gestor de paquetes:** pnpm

---

## 📁 Estructura del proyecto

```text
patitapp/
├── lib/                       # Utilidades puras de negocio y sus tests unitarios
├── prisma/                    # Esquema y configuración de Prisma
├── public/                    # Recursos estáticos
└── src/
    ├── app/
    │   ├── (landing)/         # Página principal y layout del landing
    │   ├── actions/           # Server Actions (ej. geocodificador)
    │   └── cuidadores/        # Módulo de búsqueda y perfil de cuidadores
    ├── components/            # Componentes compartidos (ej. BotonTheme)
    ├── generated/             # Cliente generado de Prisma
    ├── providers/             # Contextos y providers (tema)
    └── types/                 # Definiciones de tipos TypeScript
```

---

## 🚀 Instalación y ejecución local

### Prerrequisitos

- Node.js 20.9+
- pnpm
- Instancia de PostgreSQL (Supabase)

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd patitapp
   ```

2. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con tu cadena de conexión de Supabase:

   ```env
   DATABASE_URL="postgresql://USUARIO:PASSWORD@HOST:6543/postgres?pgbouncer=true"
   ```

4. **Generar el cliente de Prisma y levantar el servidor de desarrollo:**

   ```bash
   pnpm dev
   ```

La aplicación estará disponible en `http://localhost:3000`.

---

## 📜 Scripts disponibles

| Comando      | Descripción                                                         |
| :----------- | :------------------------------------------------------------------ |
| `pnpm dev`   | Inicia el servidor de desarrollo con Next.js                        |
| `pnpm build` | Genera el cliente de Prisma y compila la aplicación para producción |
| `pnpm start` | Inicia el servidor en modo producción                               |
| `pnpm test`  | Ejecuta la suite de pruebas unitarias con Jest                      |

---

## 🧪 Pruebas

Para ejecutar todas las pruebas unitarias:

```bash
pnpm test
```

Las pruebas cubren:

- **Utilidades (`lib/`):** validación de UUID, extracción de centro/radio, cálculo de zoom, construcción de parámetros de filtros, condiciones de Prisma y formateo de cuidadores.
- **Componentes:** `FiltrosCuidadores`, `ListaCuidadores`, `MapaCuidadores` y `BotonTheme`.
- **Server Actions:** `geocodificador`.
