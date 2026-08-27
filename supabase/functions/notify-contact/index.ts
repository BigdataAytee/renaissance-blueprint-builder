// Emails a contact-form submission to the company inbox via Resend.
//
// Invoked (non-blocking) by src/routes/contact.tsx after the row has already
// been written to public.contact_messages, so a mail failure never costs the
// visitor their message. If RESEND_API_KEY is unset the function logs and
// returns success — the submission is still safely in the database.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Submission = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  department?: string;
  message?: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const row = (label: string, value: string) =>
  `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  let submission: Submission;
  try {
    submission = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const name = (submission.name ?? "").trim();
  const email = (submission.email ?? "").trim();
  const message = (submission.message ?? "").trim();
  if (!name || !email || !message) {
    return json({ error: "name, email and message are required" }, 400);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("CONTACT_NOTIFICATION_TO") ?? "admin@dynamicrenaissance.org";
  const from = Deno.env.get("CONTACT_NOTIFICATION_FROM") ?? "Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("RESEND_API_KEY is not set — skipping notification email", { to, email });
    return json({ skipped: true });
  }

  const department = (submission.department ?? "").trim() || "General Enquiry";
  const html = `
    <h2 style="font-family:system-ui,sans-serif">New enquiry — ${escapeHtml(department)}</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      ${row("Name", name)}
      ${row("Company", (submission.company ?? "").trim() || "—")}
      ${row("Email", email)}
      ${row("Phone", (submission.phone ?? "").trim() || "—")}
      ${row("Department", department)}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Website enquiry — ${department} — ${name}`,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Resend rejected the notification", response.status, detail);
    return json({ error: "Notification email failed" }, 502);
  }

  return json({ sent: true });
});
