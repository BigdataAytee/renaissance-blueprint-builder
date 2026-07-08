import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Mail, Clock, Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { company, businesses } from "@/lib/site-data";
import logoMark from "@/assets/logo-mark.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/business-sectors", label: "Business Sectors", mega: "businesses" as const },
  { to: "/projects", label: "Projects" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<null | "businesses">(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenMega(null); }, [pathname]);

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${solid ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-[0_4px_24px_-12px_rgba(15,27,61,0.15)]" : "bg-transparent"}`}>
      {/* top bar */}
      <div className={`hidden lg:block transition-colors ${solid ? "bg-navy text-navy-foreground" : "bg-black/20 text-white"}`}>
        <div className="container-wide flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2"><Phone className="size-3.5" />{company.phone}</span>
            <span className="inline-flex items-center gap-2"><Mail className="size-3.5" />{company.email}</span>
            <span className="inline-flex items-center gap-2"><Clock className="size-3.5" />{company.hours}</span>
          </div>
          <div className="flex items-center gap-4 opacity-90">
            <button aria-label="Search"><Search className="size-3.5" /></button>
            <span>EN</span>
          </div>
        </div>
      </div>

      {/* main nav */}
      <div className="container-wide flex items-center justify-between h-28 lg:h-32">
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logoMark}
            alt="Dynamic Renaissance monogram"
            width={112}
            height={112}
            className="size-20 lg:size-24 object-contain drop-shadow-md"
          />
          <div className={`leading-tight ${solid ? "text-foreground" : "text-white"}`}>
            <div className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight">Dynamic Renaissance</div>
            <div className={`text-[10px] sm:text-xs uppercase tracking-[0.22em] ${solid ? "text-muted-foreground" : "text-white/70"}`}>Biz Ents. Ltd.</div>
          </div>
        </Link>



        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => item.mega && setOpenMega(item.mega)}
                onMouseLeave={() => item.mega && setOpenMega(null)}
              >
                <Link
                  to={item.to}
                  className={`relative inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors ${
                    solid
                      ? active ? "text-primary" : "text-foreground/80 hover:text-primary"
                      : active ? "text-gold" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.mega && <ChevronDown className="size-3.5 opacity-70" />}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full ${solid ? "bg-primary" : "bg-gold"}`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>

                {item.mega && openMega === item.mega && (
                  <MegaMenu type={item.mega} />
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden md:inline-flex btn-gold">Request Consultation</Link>
          <button className={`xl:hidden ${solid ? "text-foreground" : "text-white"}`} onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="xl:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="container-wide py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="py-2.5 text-sm font-medium text-foreground hover:text-primary">
                  {item.label}
                </Link>
              ))}
              <Link to="/contact" className="btn-gold mt-3 justify-center">Request Consultation</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaMenu({ type }: { type: "businesses" }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[720px]">
      <div className="bg-background border border-border rounded-lg shadow-2xl p-6 grid grid-cols-2 gap-x-8 gap-y-3">
        {type === "businesses" && businesses.map((b) => (
          <Link key={b.slug} to="/business-sectors/$slug" params={{ slug: b.slug }} className="group flex items-start gap-3 p-2 rounded-md hover:bg-secondary transition-colors">
            <div className="size-9 rounded-md bg-accent text-primary grid place-items-center shrink-0">
              <b.icon className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground group-hover:text-primary">{b.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{b.short}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
