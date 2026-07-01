import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children, transparentNav = false }: { children: ReactNode; transparentNav?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className={transparentNav ? "" : "pt-32"}>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative bg-navy text-navy-foreground pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_10%_10%,color-mix(in_oklab,var(--color-primary)_40%,transparent),transparent),radial-gradient(50%_50%_at_90%_20%,color-mix(in_oklab,var(--color-gold)_25%,transparent),transparent)]" />
      <div className="container-wide relative">
        <div className="eyebrow text-gold">{eyebrow}</div>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-balance max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-white/70 max-w-3xl">{subtitle}</p>}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gold">
      <div className="container-wide py-16 md:py-20 grid gap-6 md:grid-cols-[1.5fr_auto] items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy text-balance">Let's build the future together</h2>
          <p className="mt-4 text-navy/80 max-w-2xl">
            Partner with Dynamic Renaissance Biz Ents. Ltd. for innovative, reliable and sustainable business solutions across Nigeria.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/contact" className="btn-green">Request Consultation</a>
          <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-navy/40 text-navy font-semibold hover:bg-navy hover:text-white transition-colors">Contact Us</a>
        </div>
      </div>
    </section>
  );
}
