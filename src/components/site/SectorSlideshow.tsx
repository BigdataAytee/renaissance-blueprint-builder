import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import type { SectorSlide } from "@/lib/sector-slides";

export function SectorSlideshow({ slides, sectorTitle }: { slides: SectorSlide[]; sectorTitle: string }) {
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <section className="section-y">
      <div className="container-wide">
        <div className="max-w-3xl">
          <div className="eyebrow">Goods & Services Showcase</div>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">
            What we deliver in {sectorTitle.toLowerCase()}.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            A closer look at the products, equipment and services we supply, operate and manage across this sector.
          </p>
        </div>

        <div className="mt-12">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {slides.map((s, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <figure className="group relative overflow-hidden rounded-xl border border-border bg-secondary shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        width={1600}
                        height={1000}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">
                        Slide {i + 1} / {slides.length}
                      </div>
                      <h3 className="mt-1.5 text-xl md:text-2xl font-extrabold drop-shadow">{s.title}</h3>
                      <p className="mt-2 text-sm text-white/85 leading-relaxed line-clamp-2">{s.caption}</p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-background border-border" />
            <CarouselNext className="hidden md:flex -right-4 bg-background border-border" />
          </Carousel>
          <p className="mt-4 text-xs text-muted-foreground md:hidden text-center">
            Swipe to explore →
          </p>
        </div>
      </div>
    </section>
  );
}
