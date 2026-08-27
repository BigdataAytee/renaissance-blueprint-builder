// Tests for the notify-contact edge function.
//
//   deno test --allow-env supabase/functions/notify-contact/
//
// The handler reaches the outside world in exactly one place — the Resend call
// — so each test swaps in its own fetch and asserts on what would have been
// sent. Nothing here touches the network or needs a Supabase project.
import { handleRequest } from "./handler.ts";

// Deliberately dependency-free: `deno test` needs no assertion library, and not
// pulling one in means these run offline, in CI, and behind a proxy alike.
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
    throw new Error(`expected to find ${JSON.stringify(needle)} in ${JSON.stringify(haystack)}`);
  }
}

const SUBMISSION = {
  name: "Ada Okafor",
  company: "Renaissance Partners",
  email: "ada@example.com",
  phone: "+2348012345678",
  department: "Oil & Gas Services",
  message: "Requesting a consultation on depot maintenance.",
};

const ENV_KEYS = ["RESEND_API_KEY", "CONTACT_NOTIFICATION_TO", "CONTACT_NOTIFICATION_FROM"];

type Sent = { url: string; init: RequestInit };

/**
 * Runs `body` with the given environment and a stubbed fetch, restoring both
 * afterwards. Returns whatever the handler returned plus the captured calls.
 */
async function withStubs(
  env: Record<string, string>,
  respond: () => Response,
  body: (req: Request) => Promise<Response>,
  request: Request,
): Promise<{ response: Response; sent: Sent[] }> {
  const previous = new Map(ENV_KEYS.map((k) => [k, Deno.env.get(k)]));
  for (const k of ENV_KEYS) Deno.env.delete(k);
  for (const [k, v] of Object.entries(env)) Deno.env.set(k, v);

  const realFetch = globalThis.fetch;
  const sent: Sent[] = [];
  globalThis.fetch = ((url: string | URL | Request, init?: RequestInit) => {
    sent.push({ url: String(url), init: init ?? {} });
    return Promise.resolve(respond());
  }) as typeof fetch;

  try {
    return { response: await body(request), sent };
  } finally {
    globalThis.fetch = realFetch;
    for (const [k, v] of previous) v === undefined ? Deno.env.delete(k) : Deno.env.set(k, v);
  }
}

const post = (body: unknown) =>
  new Request("https://fn.local/notify-contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const accepted = () => new Response(JSON.stringify({ id: "re_1" }), { status: 200 });
const bodyOf = (sent: Sent[]) => JSON.parse(String(sent[0].init.body));

Deno.test("preflight is answered with the CORS contract", async () => {
  const res = await handleRequest(new Request("https://fn.local", { method: "OPTIONS" }));
  assertEquals(res.status, 200);
  assertStringIncludes(res.headers.get("access-control-allow-methods") ?? "", "POST");
  assertEquals(res.headers.get("access-control-allow-origin"), "*");
  await res.text();
});

Deno.test("a malformed body is rejected, with CORS headers intact", async () => {
  const { response } = await withStubs({}, accepted, handleRequest, post("{not json"));
  assertEquals(response.status, 400);
  assertEquals(response.headers.get("access-control-allow-origin"), "*");
  await response.text();
});

for (const field of ["name", "email", "message"] as const) {
  Deno.test(`a blank ${field} is rejected`, async () => {
    const { response, sent } = await withStubs(
      { RESEND_API_KEY: "re_test" },
      accepted,
      handleRequest,
      post({ ...SUBMISSION, [field]: "   " }),
    );
    assertEquals(response.status, 400);
    assertEquals(sent.length, 0, "must not email an incomplete submission");
    await response.text();
  });
}

Deno.test("without an API key it skips instead of failing", async () => {
  // The contact form fires this without awaiting it, and the message is already
  // in the database by then, so an unconfigured mailer must never look broken.
  const { response, sent } = await withStubs({}, accepted, handleRequest, post(SUBMISSION));
  assertEquals(response.status, 200);
  assertEquals((await response.json()).skipped, true);
  assertEquals(sent.length, 0);
});

Deno.test("a complete submission is emailed to the company inbox", async () => {
  const { response, sent } = await withStubs(
    { RESEND_API_KEY: "re_test" },
    accepted,
    handleRequest,
    post(SUBMISSION),
  );
  assertEquals(response.status, 200);
  assertEquals((await response.json()).sent, true);
  assertEquals(sent.length, 1);
  assertEquals(sent[0].url, "https://api.resend.com/emails");

  const headers = sent[0].init.headers as Record<string, string>;
  assertEquals(headers.Authorization, "Bearer re_test");

  const mail = bodyOf(sent);
  assertEquals(mail.to, ["admin@dynamicrenaissance.org"]);
  assertEquals(mail.reply_to, SUBMISSION.email, "replying should reach the enquirer");
  assertStringIncludes(mail.subject, SUBMISSION.department);
  assertStringIncludes(mail.subject, SUBMISSION.name);
  assertStringIncludes(mail.html, "Requesting a consultation");
});

Deno.test("recipient and sender can be overridden by environment", async () => {
  const { sent } = await withStubs(
    {
      RESEND_API_KEY: "re_test",
      CONTACT_NOTIFICATION_TO: "hr@dynamicrenaissance.org",
      CONTACT_NOTIFICATION_FROM: "Website <no-reply@dynamicrenaissance.org>",
    },
    accepted,
    handleRequest,
    post(SUBMISSION),
  );
  const mail = bodyOf(sent);
  assertEquals(mail.to, ["hr@dynamicrenaissance.org"]);
  assertEquals(mail.from, "Website <no-reply@dynamicrenaissance.org>");
});

Deno.test("a department is supplied when the visitor left it blank", async () => {
  const { sent } = await withStubs(
    { RESEND_API_KEY: "re_test" },
    accepted,
    handleRequest,
    post({ ...SUBMISSION, department: "" }),
  );
  assertStringIncludes(bodyOf(sent).subject, "General Enquiry");
});

Deno.test("markup from the submitter cannot form a tag in the email", async () => {
  // Every field here is attacker-controlled: the form is open to the public.
  const { sent } = await withStubs(
    { RESEND_API_KEY: "re_test" },
    accepted,
    handleRequest,
    post({
      ...SUBMISSION,
      name: "<img src=x onerror=alert(1)>",
      company: '"><b>injected</b>',
      message: "</p><script>steal()</script>",
    }),
  );
  const { html } = bodyOf(sent);
  // The escaped text may still contain the words "script" or "onerror"; what
  // matters is that no `<` survives to open a tag the mail client would honour.
  assert(!/<(?:img|script|b)\b/i.test(html), `tag survived escaping: ${html}`);
  assertStringIncludes(html, "&lt;script&gt;");
  assertStringIncludes(html, "&lt;img");
});

Deno.test("a rejection from Resend is reported, not swallowed", async () => {
  const { response, sent } = await withStubs(
    { RESEND_API_KEY: "re_test" },
    () => new Response("quota exceeded", { status: 429 }),
    handleRequest,
    post(SUBMISSION),
  );
  assertEquals(response.status, 502);
  assertEquals(sent.length, 1);
  await response.text();
});
