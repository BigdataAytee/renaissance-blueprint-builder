import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
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
    <section className="relative gradient-hero-bg text-navy-foreground pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-32 -right-32 size-[520px] rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-24 size-[520px] rounded-full bg-primary/25 blur-3xl" />
      <div className="container-wide relative">
        <div className="eyebrow text-gold">{eyebrow}</div>
        <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold text-balance max-w-4xl tracking-tight">{title}</h1>
        {subtitle && <p className="mt-6 text-lg md:text-xl text-white/75 max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-primary-dark" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -top-24 -right-24 size-[400px] rounded-full bg-gold/25 blur-3xl" />
      <div className="container-wide relative py-20 md:py-24 grid gap-8 md:grid-cols-[1.5fr_auto] items-center">
        <div>
          <div className="eyebrow text-gold">Get in touch</div>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white text-balance tracking-tight">Let's build the future together</h2>
          <p className="mt-5 text-white/75 max-w-2xl text-lg leading-relaxed">
            Partner with Dynamic Renaissance Biz Ents. Ltd. for innovative, reliable and sustainable business solutions across priority sectors.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-gold">Request Consultation</Link>
          <Link to="/contact" className="btn-outline-white">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
