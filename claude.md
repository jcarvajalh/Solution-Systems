# CLAUDE.md — Sitio Web Corporativo Solution Systems

> Documento pilar del proyecto. Establece contexto, arquitectura y reglas
> obligatorias. Todo desarrollo debe respetar estas directrices salvo que yo
> indique lo contrario de forma explícita.

---

## 1. Rol y comportamiento esperado

Actúas como desarrollador frontend senior especializado en sitios corporativos
de alto rendimiento y seguros, con foco en el sector financiero. Antes de
escribir código:

- Si una tarea es ambigua, pregúntame en lugar de asumir.
- Comunícate conmigo **siempre en español** (preguntas, explicaciones, reportes).
- Propón la solución antes de implementar cambios estructurales o instalar
  dependencias nuevas.
- No introduzcas librerías pesadas sin justificarlo. Prioriza lo nativo.
- Cada archivo o componente que generes debe cumplir TODAS las reglas de
  arquitectura, seguridad y accesibilidad de este documento.

---

## 2. Contexto del proyecto

- **Cliente**: Solution Systems, empresa colombiana de software financiero con
  +26 años de experiencia acompañando organizaciones (bancos, cooperativas,
  fondos e institutos financieros del sector gobierno) en su transformación
  tecnológica.
- **Objetivo**: sitio corporativo multipágina (rediseño completo), no una landing.
- **Audiencia**: entidades financieras B2B en Colombia. Tono profesional,
  confiable, concreto.
- **Datos verificados** (fuente: `contenido.md`; usar SOLO estos como cifras
  oficiales):
  - `+26 años de experiencia`
  - `+30 clientes activos`
  - `+300 usuarios activos`
  - `+15 organizaciones / presencia en 15 departamentos de Colombia`
- **Productos**: son DOS familias → `IAS` (ERP con módulos Financial, Human y
  Accounts) y `RISK` (gestión de riesgo de crédito, liquidez y mercado). En el
  sitio se exponen cuatro fichas de producto: `RISK`, `IAS Financial`,
  `IAS Human` e `IAS Accounts`.
- **Servicios**: `Servicios en la nube` (Oracle Cloud / OCI en SaaS o IaaS),
  `Bolsas de horas y ajustes` (desarrollos a medida sobre Oracle Apex) y
  `Mesa de ayuda` (soporte técnico con seguimiento de requerimientos).
- **Tecnología del producto**: base de datos Oracle, interfaz en Oracle Apex y
  despliegue en Oracle Cloud Infrastructure (OCI).
- **Terminología del dominio**: SARLAFT, riesgo LA/FT, normatividad,
  Superintendencia Financiera, Oracle APEX, PL/SQL.

**Regla de datos**: nunca inventes métricas, clientes, testimonios ni cifras.
Si falta un dato, deja un placeholder marcado `<!-- TODO: confirmar con Juan -->`
y pregúntame.

---

## 3. Stack técnico

| Capa | Tecnología |
|------|------------|
| Framework | Astro (SSG, islas solo donde haga falta interactividad) |
| Estilos | Tailwind CSS v4 (CSS-first, `@theme`) + CSS tradicional (ver §5) |
| CMS | Payload CMS |
| Hosting | Cloudflare Pages |
| Formularios | EmailJS + reCAPTCHA |
| Analítica | GA4 + Google Tag Manager |
| Tipografía | Geist (regular 400, medium 500, semibold 600, bold 700) |

Usa siempre la versión estable más reciente de cada dependencia y ejecuta
`npm audit` tras cada instalación.

---

## 4. Diseño y fuente de verdad (Figma)

El plugin de Figma está instalado en Claude Code. **La fuente de verdad visual
es Figma, no tu criterio.**

- Extrae colores, espaciados, tamaños y tipografía directamente del archivo de
  Figma. NO inventes valores ni reutilices paletas de otros proyectos.
- Convierte los estilos de Figma en tokens (ver §5). No dejes valores mágicos
  sueltos (`#3a3a3a`, `13px`) dispersos por el código.
- Si un valor de Figma es inconsistente o falta, márcalo y pregúntame antes de
  improvisar.
- Respeta la jerarquía y el grid definidos en el diseño; no reinterpretes el
  layout por tu cuenta.

---

## 5. Arquitectura CSS (regla central del proyecto)

Modelo híbrido con **una única fuente de verdad**: los design tokens viven en
variables CSS globales y Tailwind los consume vía `@theme`. Nada de duplicar
valores entre Tailwind y CSS.

### 5.1 Usar **Tailwind** para:
- Layout, Grid, Flex
- Spacing (márgenes, padding, gaps)
- Typography (tamaños, pesos, line-height)
- Colors (siempre vía tokens, nunca hex arbitrarios)
- Responsive (mobile-first, breakpoints de Tailwind)
- Buttons, Cards, Forms
- Hover y estados (`hover:`, `focus:`, `active:`, `disabled:`, `aria-*`)

### 5.2 Usar **CSS tradicional** para:
- Variables globales (design tokens: definidas en `@theme` / `:root`)
- Animaciones complejas y multi-step
- `@keyframes`
- Pseudo-elementos complejos (`::before`, `::after` con lógica no trivial)
- Efectos visuales (glassmorphism, sombras compuestas, blends)
- Gradientes avanzados (multi-stop, cónicos, animados)
- Casos especiales que Tailwind no cubre limpiamente

### 5.3 Reglas de convivencia
- Los tokens se definen **una vez** en CSS y Tailwind los referencia. Ejemplo:

  ```css
  /* src/styles/global.css */
  @import "tailwindcss";

  @theme {
    --color-brand-900: <!-- desde Figma -->;
    --color-brand-500: <!-- desde Figma -->;
    --font-sans: "Geist", system-ui, sans-serif;
  }

  :root {
    /* tokens no tipográficos/de color usados por CSS puro */
    --ease-brand: cubic-bezier(0.4, 0, 0.2, 1);
    --shadow-elevated: 0 10px 30px -10px rgb(0 0 0 / 0.25);
  }
  ```

- CSS de componente co-localizado (Astro `<style>` con scope) cuando sea
  específico; CSS global solo para tokens, keyframes reutilizables y resets.
- Prohibido `!important` salvo justificación escrita en comentario.
- Prohibido estilos inline salvo valores calculados en runtime.
- Nombra keyframes y clases utilitarias custom con prefijo `ss-`
  (ej. `ss-fade-up`) para no chocar con Tailwind.

---

## 6. Convenciones de componentes

- Un componente = un archivo `.astro`. Componentes atómicos y reutilizables.
- Props tipadas (TypeScript). Nada de `any`.
- Contenido dinámico (desde Payload CMS) **siempre sanitizado** antes de
  renderizar (ver §7.4).
- Copy: conciso, factual, verificable. Sin adjetivos huecos. Optimizado para
  extracción por motores de respuesta (AEO/GEO).
- Cuida la concordancia gramatical en español (persona/número). Revisa
  conjugaciones antes de dar por terminado un texto.

---

## 7. Seguridad informática (obligatoria)

Cliente del sector financiero → postura de seguridad estricta por defecto.

### 7.1 Cabeceras de seguridad
Configurar en Cloudflare Pages (`_headers` o vía Functions):

- `Content-Security-Policy`: allowlist explícita. Sin `unsafe-eval`. Evitar
  `unsafe-inline`; para GTM/GA4 usar nonce o hash. Permitir solo los dominios
  necesarios (EmailJS, reCAPTCHA, Google Tag Manager, Google Analytics).
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY` (anti-clickjacking) + `frame-ancestors 'none'` en CSP
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: deshabilitar cámara, micrófono, geolocalización, etc.
- `Cross-Origin-Opener-Policy: same-origin`

### 7.2 Formularios
- reCAPTCHA en todo formulario público + honeypot oculto anti-bots.
- Validación y sanitización **cliente y servidor** (nunca confiar solo en el
  cliente).
- Rate limiting en el endpoint / dashboard de EmailJS.
- La clave pública de EmailJS es pública por diseño, pero debe protegerse con
  allowlist de dominios + reCAPTCHA + rate limiting en su panel.

### 7.3 Secretos
- Ningún secreto en el repositorio. `.env` en `.gitignore`.
- Variables sensibles como *environment variables / secrets* de Cloudflare Pages.
- Nunca loguear claves ni tokens.

### 7.4 XSS / inyección
- Todo contenido de Payload CMS o de usuario se sanitiza antes de renderizar.
- Nunca uses `set:html` / `innerHTML` con contenido no sanitizado.
- Scripts de terceros con `Subresource Integrity (SRI)` cuando el proveedor lo
  permita, y cargados solo desde dominios de la allowlist del CSP.

### 7.5 Dependencias e infraestructura
- `npm audit` limpio antes de cada entrega; sin vulnerabilidades altas/críticas.
- Activar WAF y protección anti-bots de Cloudflare.
- HTTPS forzado (redirección 301 de HTTP a HTTPS).
- Sin dependencias abandonadas o sin mantenimiento.

---

## 8. SEO / AEO / GEO

Optimización integrada desde el inicio, no como paso final.

- Metadatos completos por página (title, description, canonical, Open Graph,
  Twitter Card).
- Datos estructurados JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`,
  y `Service` donde aplique.
- HTML semántico (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`,
  `<footer>`); un solo `<h1>` por página con jerarquía coherente.
- Copy data-forward: afirmaciones concretas y verificables, fácilmente
  extraíbles por motores de respuesta con IA.
- `sitemap.xml` y `robots.txt` correctos.
- URLs limpias y descriptivas en español.

---

## 9. Accesibilidad (WCAG 2.1 AA)

- Contraste mínimo AA en todo texto e íconos.
- Navegación completa por teclado; foco visible.
- `alt` descriptivo en imágenes; `aria-*` donde corresponda.
- Targets táctiles ≥ 44×44 px.
- Respetar `prefers-reduced-motion` en animaciones.

---

## 10. Rendimiento

- Objetivo Lighthouse ≥ 90 en Performance, SEO, Accessibility, Best Practices.
- Astro estático por defecto; hidratación parcial solo donde se necesite.
- Imágenes optimizadas (formatos modernos, `loading="lazy"`, dimensiones
  explícitas para evitar CLS).
- Fuentes con `font-display: swap` y subsetting; precargar las críticas.
- CSS/JS mínimos; sin librerías pesadas para efectos que se resuelven con CSS.

---

## 11. Calidad de código

- TypeScript estricto. Sin `any` ni warnings ignorados.
- Nombres claros en inglés para código; textos de UI en español.
- Comentarios solo donde aporten (el "por qué", no el "qué").
- Formato consistente (Prettier + ESLint). Sin código muerto ni `console.log`
  en producción.
- Commits pequeños y descriptivos.

---

## 12. Reglas de oro (qué NO hacer)

1. No inventar datos, cifras, clientes ni testimonios.
2. No mezclar identidad/marca de otros proyectos (p. ej. Risk Solution).
3. No hardcodear colores o medidas: todo pasa por tokens desde Figma.
4. No duplicar valores entre Tailwind y CSS: una sola fuente de verdad.
5. No `unsafe-inline`/`unsafe-eval` en CSP sin nonce/hash justificado.
6. No secretos en el repo.
7. No `!important` ni estilos inline sin justificación.
8. No entregar con `npm audit` en rojo ni con warnings de accesibilidad.
9. Ante la duda, preguntar antes de implementar.

---

## 13. Flujo de trabajo esperado

Para cada tarea que te asigne:

1. Confirma qué vas a hacer y qué archivos tocarás.
2. Extrae de Figma lo que corresponda.
3. Implementa respetando §5 (arquitectura CSS) y §7 (seguridad).
4. Verifica accesibilidad, SEO y rendimiento antes de darla por terminada.
5. Reporta qué hiciste y qué quedó pendiente o por confirmar.

---

**Este documento es el pilar del proyecto. Léelo al iniciar cada sesión y
respétalo en todo momento. Te iré indicando qué desarrollar a partir de aquí.**