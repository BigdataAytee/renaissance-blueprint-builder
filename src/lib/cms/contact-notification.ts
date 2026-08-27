/**
 * Builds and sends the "new enquiry" email for a contact-form submission.
 *
 * Deliberately dependency-free and free of globals: the caller passes the
 * configuration in, so this is a pure module the tests can drive directly
 * without a framework, an environment, or a network.
 *
 * This used to be a Supabase edge function. Contact submissions already run
 * server-side, so the extra deployable earned nothing and cost a separate
 * deploy step to keep in sync.
 */

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  department?: string;
};

export type NotificationConfig = {
  /** Resend API key. Absent means "not configured" — see sendContactNotification. */
  apiKey?: string;
  to: string;
  from: string;
};

export type NotificationResult = { sent: true } | { skipped: true } | { failed: string };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const row = (label: string, value: string) =>
  `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`;

/**
 * The subject and body for one submission.
 *
 * Every field here is attacker-controlled — the form is open to the public — so
 * all of them are escaped before they reach the HTML.
 */
export function buildNotificationEmail(submission: ContactSubmission): {
  subject: string;
  html: string;
} {
  const department = (submission.department ?? "").trim() || "General Enquiry";
  const html = `
    <h2 style="font-family:system-ui,sans-serif">New enquiry — ${escapeHtml(department)}</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      ${row("Name", submission.name)}
      ${row("Company", (submission.company ?? "").trim() || "—")}
      ${row("Email", submission.email)}
      ${row("Phone", (submission.phone ?? "").trim() || "—")}
      ${row("Department", department)}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(submission.message)}</p>
  `;
  return { subject: `Website enquiry — ${department} — ${submission.name}`, html };
}

/**
 * Emails a submission to the company inbox.
 *
 * Never throws: the message is already stored by the time this runs, so a mail
 * failure must not turn a successful submission into a failed one. With no API
 * key it reports `skipped`, which is how the site keeps working before Resend
 * is configured.
 */
export async function sendContactNotification(
  submission: ContactSubmission,
  config: NotificationConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<NotificationResult> {
  if (!config.apiKey) return { skipped: true };

  const { subject, html } = buildNotificationEmail(submission);

  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: submission.email,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      return { failed: `Resend responded ${response.status}: ${await response.text()}` };
    }
    return { sent: true };
  } catch (error) {
    return { failed: error instanceof Error ? error.message : String(error) };
  }
}
