import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { company, businesses } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative bg-navy text-navy-foreground overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute -top-32 -left-24 size-[400px] rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 size-[400px] rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="container-wide relative py-20 grid gap-12 lg:grid-cols-12">

        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark grid place-items-center font-display font-extrabold text-lg shadow-lg">DR</div>
            <div className="leading-tight">
              <div className="font-display font-extrabold">Dynamic Renaissance</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Biz Ents. Ltd.</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-white/70 max-w-sm">
            A diversified enterprise group delivering integrated solutions across infrastructure, energy, agriculture, logistics, manufacturing and commercial services.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social channel" className="size-10 rounded-full grid place-items-center border border-white/15 text-white/70 hover:text-gold hover:border-gold/60 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5">
                <Icon className="size-4" />
              </a>
            ))}

          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {["About","Projects","Careers","Contact"].map((l, i) => (
              <li key={i}><Link to={"/" + l.toLowerCase().split(" ")[0].replace("&","")} className="hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold text-white mb-4">Business Sectors</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {businesses.slice(0, 6).map((b) => (
              <li key={b.slug}><Link to="/business-sectors/$slug" params={{ slug: b.slug }} className="hover:text-gold">{b.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold text-white mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin className="size-4 mt-0.5 shrink-0 text-gold" />{company.address}</li>
            <li className="flex gap-3"><Phone className="size-4 mt-0.5 shrink-0 text-gold" />{company.phone}</li>
            <li className="flex gap-3"><Mail className="size-4 mt-0.5 shrink-0 text-gold" />{company.email}</li>
          </ul>
          <form className="mt-5" onSubmit={(e) => e.preventDefault()}>
            <label className="text-xs uppercase tracking-[0.22em] text-white/60 font-semibold">Newsletter</label>
            <div className="mt-3 flex rounded-full overflow-hidden border border-white/15 bg-white/5 backdrop-blur focus-within:border-gold/60 transition-colors">
              <input type="email" required placeholder="Your email" className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-white/40" />
              <button className="bg-gradient-to-r from-gold to-[oklch(0.62_0.14_78)] text-navy px-5 text-sm font-bold hover:brightness-105 transition">Join</button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative border-t border-white/10">

        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Dynamic Renaissance Biz Ents. Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
