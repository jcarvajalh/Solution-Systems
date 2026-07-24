import { useState } from "react";

export interface Testimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
}

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  function goToPrevious() {
    setIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  }

  function goToNext() {
    setIndex((current) => (current + 1) % testimonials.length);
  }

  return (
    <div>
      {current && (
        <blockquote>
          <p>{current.quote}</p>
          <cite>
            {current.author} — {current.role}, {current.company}
          </cite>
        </blockquote>
      )}
      <button type="button" onClick={goToPrevious}>
        Anterior
      </button>
      <button type="button" onClick={goToNext}>
        Siguiente
      </button>
    </div>
  );
}
