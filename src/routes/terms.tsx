import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { termsSections } from "@/lib/legal-content";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Use — Dynamic Renaissance" },
      {
        name: "description",
        content: "The terms that govern your use of the Dynamic Renaissance website.",
      },
      { property: "og:title", content: "Terms of Use — Dynamic Renaissance" },
      {
        property: "og:description",
        content: "Terms governing use of this website and anything you submit through it.",
      },
      { property: "og:url", content: absoluteUrl("/terms") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/terms") }],
  }),
});

function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use."
      subtitle="The terms you agree to when you use this website or submit information through it."
      updated="August 2026"
      sections={termsSections}
    />
  );
}
