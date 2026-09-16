import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

export interface NewsCard {
  /** Titular de la noticia; usado como texto accesible del enlace "Leer más". */
  title: string;
  /** Introducción mostrada en la tarjeta. */
  summary: string;
  /** Nombre del cliente protagonista de la noticia. */
  client: string;
  /** Ruta interna a la noticia completa (/noticias/[slug]). */
  href: string;
  /** URL optimizada del logo del cliente; ausente mientras no exista el asset. */
  logo?: string;
}

// Iniciales del cliente para el marcador mientras no exista el logo real.
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

export interface NewsCarouselProps {
  items: NewsCard[];
}

// Copias del set para un desplazamiento cíclico sin costuras (una a cada lado).
const COPIES = 3;

// Umbral (px) para distinguir un arrastre de un clic: por debajo, un toque sobre
// "Leer más" navega; por encima, se cancela para no abrir la noticia sin querer.
const DRAG_THRESHOLD = 6;

export default function NewsCarousel({ items }: NewsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Estado del arrastre en refs: se manipula el transform directamente para no
  // re-renderizar en cada pointermove.
  const pos = useRef(0);
  const setWidth = useRef(0);
  const drag = useRef({
    active: false,
    startX: 0,
    startPos: 0,
    moved: false,
    pointerId: -1,
  });

  function apply() {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${pos.current}px, 0, 0)`;
    }
  }

  // Mantiene la posición dentro de (-2·set, -set]: como el contenido se repite
  // cada `set`, ajustar por ese ancho es imperceptible y hace el ciclo infinito.
  function normalize() {
    const w = setWidth.current;
    if (w <= 0) return;
    while (pos.current > -w) pos.current -= w;
    while (pos.current <= -2 * w) pos.current += w;
  }

  function measure() {
    const track = trackRef.current;
    if (!track) return;
    setWidth.current = track.scrollWidth / COPIES;
    if (pos.current === 0) pos.current = -setWidth.current;
    normalize();
    apply();
  }

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    // No se captura el puntero aquí: hacerlo redirigiría el `pointerup` al
    // viewport y el navegador dispararía el `click` sobre este contenedor (el
    // ancestro común), no sobre el enlace "Leer más". La captura se difiere a
    // `onPointerMove`, cuando de verdad empieza un arrastre.
    drag.current = {
      active: true,
      startX: event.clientX,
      startPos: pos.current,
      moved: false,
      pointerId: event.pointerId,
    };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    // Al superar el umbral se confirma el arrastre: recién ahí se captura el
    // puntero (para no perder eventos si el cursor sale del viewport).
    if (!drag.current.moved && Math.abs(delta) > DRAG_THRESHOLD) {
      drag.current.moved = true;
      try {
        viewportRef.current?.setPointerCapture(event.pointerId);
      } catch {
        /* el puntero ya no es capturable */
      }
    }
    pos.current = drag.current.startPos + delta;
    normalize();
    apply();
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      try {
        viewportRef.current.releasePointerCapture(event.pointerId);
      } catch {
        /* el puntero ya se liberó */
      }
    }
  }

  // Si el pointerup vino de un arrastre, cancela el clic que le sigue para no
  // abrir la noticia al soltar sobre "Leer más".
  function onClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  }

  // Avance por teclado: una noticia por pulsación (accesibilidad, §9).
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = setWidth.current / items.length;
    if (event.key === "ArrowRight") {
      pos.current -= step;
    } else if (event.key === "ArrowLeft") {
      pos.current += step;
    } else {
      return;
    }
    event.preventDefault();
    normalize();
    apply();
  }

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label="Noticias sobre nuestros clientes"
      aria-roledescription="carrusel"
      tabIndex={0}
      className="w-full cursor-grab touch-pan-y overflow-hidden outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      onKeyDown={onKeyDown}
    >
      <div ref={trackRef} className="flex w-max gap-6">
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          items.map((item, i) => {
            // Solo la primera copia es accesible; en las demás los enlaces salen
            // del orden de tabulación para no duplicar el foco.
            const isPrimary = copy === 0;
            return (
              <article
                key={`${copy}-${i}`}
                aria-hidden={isPrimary ? undefined : "true"}
                className="group bg-surface-muted flex h-[225px] w-[294px] shrink-0 flex-col justify-between rounded-[10px] p-[18px] transition-colors duration-200 ease-out hover:bg-brand"
              >
                <p className="text-ink line-clamp-4 text-[1rem] leading-[1.3] font-semibold tracking-[-0.03em] group-hover:text-white">
                  {item.summary}
                </p>

                <div className="flex items-center gap-3">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={`Logo de ${item.client}`}
                      width={32}
                      height={32}
                      loading="lazy"
                      decoding="async"
                      className="size-8 shrink-0 rounded-full bg-white object-contain p-0.5"
                    />
                  ) : (
                    /* Placeholder mientras no exista el logo real del cliente. */
                    <span
                      className="bg-ink/10 text-ink-secondary flex size-8 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold tracking-tight uppercase group-hover:bg-white/25 group-hover:text-white"
                      aria-hidden="true"
                    >
                      {initials(item.client)}
                    </span>
                  )}

                  <p className="text-ink min-w-0 flex-1 truncate text-[0.875rem] leading-[1.25] font-semibold tracking-[-0.04em] group-hover:text-white">
                    {item.client}
                  </p>

                  <a
                    href={item.href}
                    tabIndex={isPrimary ? undefined : -1}
                    className="text-brand ss-tap-target inline-flex shrink-0 items-center gap-1 text-[0.875rem] leading-[1.25] font-semibold tracking-[-0.04em] group-hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                  >
                    <span aria-hidden="true">Leer más</span>
                    <span className="sr-only">
                      Leer más sobre: {item.title}
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                </div>
              </article>
            );
          }),
        )}
      </div>
    </div>
  );
}
