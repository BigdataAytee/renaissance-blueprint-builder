// Tests for the contact-form notification email.
//
//   deno test tests/
//
// The module under test is deliberately dependency-free, so these run with no
// framework, no environment and no network — and without adding a test runner
// to package.json, which would mean regenerating the lockfile.
import {
  buildNotificationEmail,
  sendContactNotification,
  type ContactSubmission,
} from "../src/lib/cms/contact-notification.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function assertEquals<T>(actual: T, expected: T, message = ""): void {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  if (a !== b) throw new Error(`${message ? message + ": " : ""}expected ${b}, got ${a}`);
}
function assertStringIncludes(haystack: string, needle: string): void {
  if (!haystack.includes(needle)) {
    throw new Error(`expected ${JSON.stringify(needle)} in ${JSON.stringify(haystack)}`);
  }
}

const SUBMISSION: ContactSubmission = {
  name: "Ada Okafor",
  company: "Renaissance Partners",
  email: "ada@example.com",
  phone: "+2348012345678",
  department: "Oil & Gas Services",
  message: "Requesting a consultation on depot maintenance.",
};
const CONFIG = {
  apiKey: "re_test",
  to: "admin@dynamicrenaissance.org",
  from: "Website <no-reply@x>",
};

type Call = { url: string; init: RequestInit };
function recorder(respond: () => Response) {
  const calls: Call[] = [];
  const impl = ((url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return Promise.resolve(respond());
  }) as typeof fetch;
  return { calls, impl };
}
const accepted = () => new Response(JSON.stringify({ id: "re_1" }), { status: 200 });
const bodyOf = (calls: Call[]) => JSON.parse(String(calls[0].init.body));

Deno.test("the subject names the department and the sender", () => {
  const { subject } = buildNotificationEmail(SUBMISSION);
  assertStringIncludes(subject, "Oil & Gas Services");
  assertStringIncludes(subject, "Ada Okafor");
});

Deno.test("a blank department falls back to General Enquiry", () => {
  const { subject, html } = buildNotificationEmail({ ...SUBMISSION, department: "" });
  assertStringIncludes(subject, "General Enquiry");
  assertStringIncludes(html, "General Enquiry");
});

Deno.test("missing optional fields render as a dash, not as 'undefined'", () => {
  const { html } = buildNotificationEmail({
    name: "Solo",
    email: "solo@example.com",
    message: "hello",
  });
  assertStringIncludes(html, "—");
  assert(!html.includes("undefined"), `"undefined" leaked into the email: ${html}`);
});

Deno.test("markup from the submitter cannot form a tag in the email", () => {
  // Every field on that form is attacker-controlled.
  const { html } = buildNotificationEmail({
    ...SUBMISSION,
    name: "<img src=x onerror=alert(1)>",
    company: '"><b>injected</b>',
    message: "</p><script>steal()</script>",
  });
  // An escaped "onerror=" inside &lt;img …&gt; is inert text; what matters is
  // that no `<` survives to open a tag a mail client would honour.
  assert(!/<(?:img|script|b)\b/i.test(html), `a tag survived escaping: ${html}`);
  assertStringIncludes(html, "&lt;script&gt;");
  assertStringIncludes(html, "&lt;img");
});

Deno.test("without an API key it skips instead of sending", async () => {
  const { calls, impl } = recorder(accepted);
  const result = await sendContactNotification(SUBMISSION, { ...CONFIG, apiKey: undefined }, impl);
  assertEquals(result, { skipped: true });
  assertEquals(calls.length, 0, "must not call Resend when unconfigured");
});

Deno.test("a configured submission reaches Resend once, addressed correctly", async () => {
  const { calls, impl } = recorder(accepted);
  const result = await sendContactNotification(SUBMISSION, CONFIG, impl);
  assertEquals(result, { sent: true });
  assertEquals(calls.length, 1);
  assertEquals(calls[0].url, "https://api.resend.com/emails");
  assertEquals((calls[0].init.headers as Record<string, string>).Authorization, "Bearer re_test");

  const mail = bodyOf(calls);
  assertEquals(mail.to, [CONFIG.to]);
  assertEquals(mail.from, CONFIG.from);
  assertEquals(mail.reply_to, SUBMISSION.email, "replying should reach the enquirer");
});

Deno.test("a rejection from Resend is reported, not thrown", async () => {
  const { impl } = recorder(() => new Response("quota exceeded", { status: 429 }));
  const result = await sendContactNotification(SUBMISSION, CONFIG, impl);
  assert("failed" in result, `expected a failure result, got ${JSON.stringify(result)}`);
  assertStringIncludes(result.failed, "429");
});

Deno.test("an unreachable Resend is reported, not thrown", async () => {
  // The submission is already stored by this point, so a network fault must
  // never propagate out and fail the visitor's request.
  const impl = (() => Promise.reject(new Error("connection reset"))) as unknown as typeof fetch;
  const result = await sendContactNotification(SUBMISSION, CONFIG, impl);
  assert("failed" in result, `expected a failure result, got ${JSON.stringify(result)}`);
  assertStringIncludes(result.failed, "connection reset");
});
