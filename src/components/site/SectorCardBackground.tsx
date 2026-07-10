import { useEffect, useState } from "react";
import { sectorSlides } from "@/lib/sector-slides";

type Props = {
  slug: string;
  interval?: number;
};

/**
 * Auto-rotating background slideshow for sector cards.
 * Crossfades industry-specific images. Purely decorative (aria-hidden).
 */
export function SectorCardBackground({ slug, interval = 4500 }: Props) {
  const slides = sectorSlides[slug] ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  if (slides.length === 0) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 15% 15%, color-mix(in oklab, var(--color-primary) 40%, transparent), transparent), radial-gradient(50% 50% at 85% 30%, color-mix(in oklab, var(--color-gold) 30%, transparent), transparent)",
        }}
      />
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-navy">
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          } motion-safe:[animation:kenburns_18s_ease-in-out_infinite_alternate]`}
        />
      ))}
    </div>
  );
}
