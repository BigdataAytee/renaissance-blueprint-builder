import { useEffect, useState } from "react";

/**
 * Auto-rotating crossfade slideshow for the background of a service card.
 * Purely decorative — the card overlays a gradient + content on top.
 */
export function ServiceCardBackground({
  images,
  interval = 4200,
  delay = 0,
}: {
  images: string[];
  interval?: number;
  delay?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startId = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
      intervalId = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, interval);
    }, delay);
    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length, interval, delay]);

  if (!images.length) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
