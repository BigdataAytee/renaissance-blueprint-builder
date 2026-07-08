import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { company } from "@/lib/site-data";
import { useState } from "react";

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
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHero eyebrow="Contact" title="Speak with our team." subtitle="Request a consultation, partnership discussion or general enquiry — we respond within one business day." />
      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {[
              { icon: MapPin, t: "Head Office", d: company.address },
              { icon: Phone, t: "Phone", d: company.phone },
              { icon: Mail, t: "Email", d: company.email },
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
                src="https://www.google.com/maps?q=Central%20Business%20District%20Abuja&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="p-8 rounded-lg border border-border bg-secondary">
            <h2 className="text-2xl font-extrabold">Send us a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required />
              <Field label="Company" />
              <Field label="Email" type="email" required />
              <Field label="Phone" type="tel" />
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">Department</label>
                <select className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
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
                <label className="text-sm font-semibold">Message</label>
                <textarea required rows={5} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
            </div>
            <button className="btn-gold mt-6 w-full sm:w-auto">Send message</button>
            {sent && <p className="mt-4 text-sm text-primary font-semibold">Thank you — our team will be in touch shortly.</p>}
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}{required && " *"}</label>
      <input type={type} required={required} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
    </div>
  );
}
