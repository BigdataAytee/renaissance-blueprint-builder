import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { company, businesses } from "@/lib/site-data";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Honeypot } from "@/components/site/Honeypot";


export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || loading) return;

    // Honeypot: humans never see this field, so a filled one means a bot.
    if (String(new FormData(e.currentTarget).get("website") || "").trim()) {
      setEmail("");
      toast.success("Subscribed! Thanks for joining our newsletter.");
      return;
    }

    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(address)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: address });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.info("You're already subscribed. Thanks!");
        setEmail("");
      } else {
        toast.error(error.message || "Could not subscribe. Please try again.");
      }
      return;
    }
    toast.success("Subscribed! Thanks for joining our newsletter.");
    setEmail("");
  };

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-wide py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="size-10 rounded-md bg-primary grid place-items-center font-display font-extrabold text-base shrink-0">DR</div>
              <div className="leading-tight">
                <div className="font-display font-extrabold text-sm">Dynamic Renaissance</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Biz Ents. Ltd.</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Integrated solutions across infrastructure, energy, agriculture, logistics and manufacturing.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <span key={i} aria-label="Social channel" className="size-8 rounded-full grid place-items-center border border-white/15 text-white/60 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer">
                  <Icon className="size-3.5" />
                </span>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              {["About","Projects","Careers","Contact"].map((l, i) => (
                <li key={i}><Link to={"/" + l.toLowerCase().split(" ")[0].replace("&","")} className="hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Business Sectors */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white mb-4">Sectors</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              {businesses.slice(0, 6).map((b) => (
                <li key={b.slug}><Link to="/business-sectors/$slug" params={{ slug: b.slug }} className="hover:text-gold transition-colors">{b.title}</Link></li>
              ))}
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white mb-4">Reach Us</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex gap-2.5 items-start"><MapPin className="size-3.5 mt-1 shrink-0 text-gold" />{company.address}</li>
              <li className="flex gap-2.5 items-center"><Phone className="size-3.5 shrink-0 text-gold" />{company.phone}</li>
              <li className="flex gap-2.5 items-center"><Mail className="size-3.5 shrink-0 text-gold" />{company.email}</li>
            </ul>
            <form className="relative mt-5" onSubmit={handleSubscribe}>
              <Honeypot />
              <label htmlFor="newsletter-email" className="text-[10px] uppercase tracking-[0.14em] text-white/50">Newsletter</label>
              <div className="mt-1.5 flex">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-l-md px-3 py-2 text-sm outline-none focus:border-gold disabled:opacity-60"
                />
                <button type="submit" disabled={loading} className="bg-gold text-navy rounded-r-md px-4 text-sm font-semibold hover:brightness-95 shrink-0 disabled:opacity-60 flex items-center gap-1.5">
                  {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}
                  {loading ? "Joining" : "Join"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Dynamic Renaissance Biz Ents. Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/80 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

