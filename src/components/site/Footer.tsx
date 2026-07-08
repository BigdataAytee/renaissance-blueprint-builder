import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { company, businesses } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-wide py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-md bg-primary grid place-items-center font-display font-extrabold text-lg">DR</div>
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
              <span key={i} aria-label="Social channel" className="size-9 rounded-full grid place-items-center border border-white/15 text-white/60">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {["About","Projects","Sustainability","News & Insights","Careers","Contact"].map((l, i) => (
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
            <label className="text-xs uppercase tracking-[0.18em] text-white/60">Newsletter</label>
            <div className="mt-2 flex">
              <input type="email" required placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-l-md px-3 py-2 text-sm outline-none focus:border-gold" />
              <button className="bg-gold text-navy rounded-r-md px-4 text-sm font-semibold hover:brightness-95">Join</button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
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
