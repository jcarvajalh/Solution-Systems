import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** Año del testimonio; se muestra junto al nombre (ej. "Mauricio Gamboa - 2023"). */
  year?: string;
  /** Nombre de la empresa del cliente; usado para el `alt` y las iniciales. */
  company: string;
  /** URL optimizada del logo de la empresa; ausente mientras no exista el asset. */
  logo?: string;
}

// Iniciales de la empresa para el marcador mientras no exista el logo real.
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

// Copias del set para un desplazamiento cíclico sin costuras (una a cada lado).
const COPIES = 3;

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Estado del arrastre en refs: se manipula el transform directamente para no
  // re-renderizar en cada pointermove.
  const pos = useRef(0);
  const setWidth = useRef(0);
  const drag = useRef({ active: false, startX: 0, startPos: 0 });

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
    drag.current = {
      active: true,
      startX: event.clientX,
      startPos: pos.current,
    };
    viewportRef.current?.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    pos.current = drag.current.startPos + (event.clientX - drag.current.startX);
    normalize();
    apply();
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    try {
      viewportRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* el puntero ya se liberó */
    }
  }

  // Avance por teclado: un testimonio por pulsación (accesibilidad, §9).
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = setWidth.current / testimonials.length;
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
      aria-label="Testimonios de clientes"
      aria-roledescription="carrusel"
      tabIndex={0}
      className="w-full cursor-grab touch-pan-y overflow-hidden outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <div ref={trackRef} className="flex w-max gap-6">
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          testimonials.map((item, i) => (
            <article
              key={`${copy}-${i}`}
              aria-hidden={copy === 0 ? undefined : "true"}
              className="group bg-surface-muted flex h-[225px] w-[294px] shrink-0 flex-col justify-between rounded-[10px] p-[18px] transition-colors duration-200 ease-out hover:bg-brand"
            >
              <p className="text-ink text-[1.25rem] leading-[1.3] font-semibold tracking-[-0.04em] group-hover:text-white">
                {item.quote}
              </p>

              <div className="flex items-center gap-3">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`Logo de ${item.company}`}
                    width={32}
                    height={32}
                    loading="lazy"
                    decoding="async"
                    className="size-8 shrink-0 rounded-full bg-white object-contain"
                  />
                ) : (
                  /* Placeholder mientras no exista el logo real de la empresa. */
                  <span
                    className="bg-ink/10 text-ink-secondary flex size-8 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold tracking-tight uppercase group-hover:bg-white/25 group-hover:text-white"
                    aria-hidden="true"
                  >
                    {initials(item.company)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-ink truncate text-[0.875rem] leading-[1.25] font-semibold tracking-[-0.04em] group-hover:text-white">
                    {item.author}
                    {item.year ? ` - ${item.year}` : ""}
                  </p>
                  <p className="text-ink-secondary truncate text-[0.875rem] leading-[1.25] font-normal tracking-[-0.04em] group-hover:text-white/90">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          )),
        )}
      </div>
    </div>
  );
}
