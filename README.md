# Solution Systems

Sitio web corporativo. Fase actual: **andamiaje/arquitectura** — estructura de carpetas, tooling y stubs de componentes. Sin estilos, tokens de diseño ni contenido real todavía.

## Stack

- [Astro](https://astro.build) — framework base, renderizado estático.
- [React](https://react.dev) vía `@astrojs/react` — islands interactivas.
- [Tailwind CSS v4](https://tailwindcss.com) vía `@tailwindcss/vite` — sin tema/tokens configurados aún.
- TypeScript en modo `strict`.
- [nanostores](https://github.com/nanostores/nanostores) + `@nanostores/react` — estado compartido entre islands.
- [zod](https://zod.dev) — validación de Content Collections y formularios.
- [astro-icon](https://www.astroicon.dev) + `@iconify-json/lucide` — iconos.
- `clsx` + `tailwind-merge` — composición de clases (`cn()` en `src/lib/utils.ts`).
- ESLint + Prettier (con plugins de Astro y Tailwind).

## Comandos

| Comando             | Acción                                   |
| :------------------ | :--------------------------------------- |
| `pnpm install`      | Instala dependencias                     |
| `pnpm dev`          | Levanta el servidor de desarrollo        |
| `pnpm build`        | Compila el sitio a `./dist/`             |
| `pnpm preview`      | Previsualiza el build de producción      |
| `pnpm typecheck`    | Corre `astro check` (TypeScript + Astro) |
| `pnpm lint`         | Corre ESLint                             |
| `pnpm format`       | Formatea con Prettier                    |
| `pnpm format:check` | Verifica el formato sin escribir         |

## Estructura de carpetas

```text
src/
├── assets/               # Imágenes/SVG procesados por Astro (import optimizado)
├── components/
│   ├── ui/                # Átomos reutilizables, agnósticos de dominio
│   ├── layout/             # Header/Footer/wrappers globales
│   ├── sections/           # Secciones compuestas reutilizables entre páginas
│   └── islands/            # Componentes React interactivos (hidratados)
├── features/               # Dominios aislados (mini-apps interactivas)
│   └── interactive-app/    # components/hooks/stores/lib/types propios del dominio
├── content/                 # Datos de Content Collections (team, testimonials, faqs, products, clients, timeline)
├── content.config.ts        # Definición tipada (zod) de las Content Collections
├── layouts/
│   └── BaseLayout.astro     # Layout base (head, Navbar, Footer)
├── pages/                   # Rutas del sitio
├── lib/                     # Utilidades puras (p. ej. cn())
├── stores/                  # Estado global compartido entre islands (nanostores)
├── config/
│   ├── site.ts               # Metadata del sitio, redes, contacto
│   └── navigation.ts         # Items de navbar/footer
├── styles/
│   └── global.css            # Import base de Tailwind
└── types/                    # Tipos compartidos
```

> Nota: el archivo de configuración de Content Collections vive en `src/content.config.ts` (ubicación oficial actual de Astro), mientras que los datos de cada colección se mantienen en `src/content/<colección>/`.

## Aliases de import

`@/*`, `@components/*`, `@layouts/*`, `@lib/*`, `@config/*`, `@features/*`, `@assets/*` — definidos en `tsconfig.json`.

## Próximos pasos

Esta fase no incluye estilos visuales, tema de Tailwind, maquetado de secciones ni contenido real. Eso corresponde a fases posteriores.
