import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { company } from "@/lib/site-data";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Honeypot } from "@/components/site/Honeypot";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Dynamic Renaissance" },
      { name: "description", content: "Get in touch with our team for consultations, partnerships and general enquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const companyName = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const department = String(data.get("department") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Honeypot: only automated submissions fill a field humans cannot see.
    if (String(data.get("website") || "").trim()) {
      form.reset();
      toast.success("Thank you — your message has been sent.");
      return;
    }

    setSubmitting(true);
    const submission = { name, company: companyName, email, phone, department, message };
    const { error } = await supabase.from("contact_messages" as never).insert(submission as never);
    setSubmitting(false);

    if (error) {
      toast.error(error.message || "Could not send your message. Please try again.");
      return;
    }

    // Best-effort notification — the message is already stored, so a mail
    // failure must not be surfaced as a failed submission.
    void supabase.functions
      .invoke("notify-contact", { body: submission })
      .catch((err) => console.error("notify-contact failed", err));

    form.reset();
    toast.success("Thank you — your message has been sent. We respond within one business day.");
  };

  return (
    <Layout>
      <PageHero eyebrow="Contact" title="Speak with our team." subtitle="Request a consultation, partnership discussion or general enquiry — we respond within one business day." />
      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {[
              { icon: MapPin, t: "Head Office", d: company.address },
              { icon: Phone, t: "Phone", d: <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="hover:text-primary">{company.phone}</a> },
              { icon: Mail, t: "Email", d: <a href={`mailto:${company.email}`} className="hover:text-primary">{company.email}</a> },
              { icon: Clock, t: "Business Hours", d: company.hours },
            ].map((c) => (
              <div key={c.t} className="p-6 rounded-lg border border-border flex gap-4">
                <div className="size-11 rounded-md bg-primary text-primary-foreground grid place-items-center shrink-0"><c.icon className="size-5" /></div>
                <div>
                  <div className="font-extrabold">{c.t}</div>
                  <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
                </div>
              </div>
            ))}
            <div className="rounded-lg overflow-hidden border border-border bg-secondary aspect-video">
              <iframe
                title="Dynamic Renaissance head office map"
                src="https://www.google.com/maps?q=30%20Sasere%20Ajibade%20off%20Saidku%20Street%20Ilasamaja%20Mushin%20Lagos&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 md:p-10 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Send us a message</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field name="name" label="Full name" required />
              <Field name="company" label="Company" />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" type="tel" />
              <div className="sm:col-span-2">
                <label htmlFor="contact-department" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Department</label>
                <select id="contact-department" name="department" defaultValue="General Enquiry" className="mt-2 w-full cursor-pointer rounded-xl border border-border bg-muted px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 hover:bg-background hover:border-primary/30 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10">
                  <option>General Enquiry</option>
                  <option>Project & Property Management</option>
                  <option>Oil & Gas Services</option>
                  <option>Agriculture</option>
                  <option>Logistics & Distribution</option>
                  <option>Consultancy</option>
                  <option>Careers</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea id="contact-message" name="message" required rows={5} className="mt-2 w-full min-h-[140px] resize-none rounded-xl border border-border bg-muted px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 hover:bg-background hover:border-primary/30 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10" />
              </div>
            </div>
            <Honeypot />
            <button type="submit" className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-sm font-bold text-gold-foreground shadow-[0_12px_32px_-8px_rgba(199,154,46,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--color-gold)_88%,black)] hover:shadow-[0_16px_40px_-10px_rgba(199,154,46,0.55)] active:translate-y-0 sm:w-auto">
              Send message
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}{required && " *"}</label>
      <input id={id} name={name} type={type} required={required} className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 hover:bg-background hover:border-primary/30 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10" />
    </div>
  );
}
