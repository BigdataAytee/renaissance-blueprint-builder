import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { privacySections } from "@/lib/legal-content";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Dynamic Renaissance" },
      { name: "description", content: "How Dynamic Renaissance collects, uses, stores and protects the personal information you share through this website." },
      { property: "og:title", content: "Privacy Policy — Dynamic Renaissance" },
      { property: "og:description", content: "How we handle enquiries, newsletter subscriptions and job applications." },
      { property: "og:url", content: absoluteUrl("/privacy-policy") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/privacy-policy") }],
  }),
});

function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy."
      subtitle="What we collect when you contact us, subscribe or apply for a role — and what we do with it."
      updated="August 2026"
      sections={privacySections}
    />
  );
}
