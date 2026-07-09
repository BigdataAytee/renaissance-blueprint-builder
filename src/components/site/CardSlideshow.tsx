import { useEffect, useRef, useState } from "react";

type Props = {
  /** Pre-picked image URLs (AI-generated, curated, etc.). Takes priority over keywords. */
  images?: string[];
  /** Fallback tag-matched images (loremflickr) when no curated images are supplied. */
  keywords?: string[];
  intervalMs?: number;
  className?: string;
  overlayClassName?: string;
};

/**
 * A background slideshow of images with cross-fade, Ken Burns zoom, dark
 * overlay for readability, and hover-to-slow. Lazy-loads only when
 * scrolled near the viewport. Prefers explicit `images` (curated URLs);
 * falls back to `keywords` (Flickr tag search) when no images are given.
 */
export function CardSlideshow({
  images,
  keywords = [],
  intervalMs = 4000,
  className = "",
  overlayClassName = "bg-black/55",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);

  const urls =
    images && images.length > 0
      ? images
      : keywords.map((kw, i) => {
          const seed = ((hashString(kw) + i * 17) % 900) + 1;
          const tag = kw.split(",").map((t) => encodeURIComponent(t.trim())).join(",");
          return `https://loremflickr.com/1200/800/${tag}/all?lock=${seed}`;
        });



  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || urls.length <= 1) return;
    const delay = hovered ? intervalMs * 2.5 : intervalMs;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, delay);
    return () => window.clearInterval(id);
  }, [nearViewport, hovered, urls.length, intervalMs]);

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {nearViewport &&
        urls.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            } motion-safe:[animation:kenburns_14s_ease-in-out_infinite_alternate]`}
          />
        ))}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
