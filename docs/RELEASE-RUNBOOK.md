# Release runbook

Publishing the work merged in pull requests 1–6 to the live site.

Three steps in a fixed order, then a smoke test. Budget about twenty minutes.

| | |
| --- | --- |
| Live site | https://renaissance-blueprint-builder.lovable.app |
| Release commit | `574256c` on `main` |
| Migrations already applied | `20260827090000`, `20260827091000`, `20260827092000` |
| Migrations to apply | `20260827120000`, `20260827140000` |

## Order is not optional

`20260827140000_captcha_and_ip_throttle.sql` revokes anonymous write access to
`contact_messages`, `job_applications` and `newsletter_subscribers`, because
those writes now go through the app's own server functions.

If it lands while the old code is still live, **all three public forms stop
working** until the new code publishes. Publish the code first, set the secrets
second, run the SQL last.

---

## 1. Publish the code

Pushing to `main` syncs into Lovable, so this may already be done. Open the
[Lovable editor](https://lovable.dev/projects/d1f86a5b-b251-4696-9282-107e7bd3e882)
and confirm it shows commit `574256c`. If the live site has not picked it up,
press **Publish**.

**Confirm before moving on:** the live site loads and the footer links to
*Privacy Policy* and *Terms* — two pages that only exist in this release.

## 2. Set the secrets

In Lovable Cloud's environment settings. Do this *before* the migration, so the
forms go from working to working with no window where new code is live but
unconfigured.

| Variable | Value | If you skip it |
| --- | --- | --- |
| `THROTTLE_IP_PEPPER` | Any long random string | Rate limiting still works; stored IP hashes become brute-forceable |
| `RESEND_API_KEY` | From resend.com | Enquiries are stored, but nobody is emailed |
| `CONTACT_NOTIFICATION_TO` | `admin@dynamicrenaissance.org` | Falls back to that same address |
| `CONTACT_NOTIFICATION_FROM` | A domain verified in Resend | Mail only reaches your own Resend account |
| `VITE_TURNSTILE_SITE_KEY` | From Cloudflare Turnstile | No captcha; per-IP limits still apply |
| `TURNSTILE_SECRET_KEY` | From Cloudflare Turnstile | No captcha; per-IP limits still apply |

### Set both Turnstile keys, or neither

With neither, the widget never renders and the server skips verification — the
site works normally. With only the secret, the browser has no challenge to show
and the server rejects every submission as unverified. There is no useful
middle state.

**Confirm before moving on:** republish, so the build picks up
`VITE_TURNSTILE_SITE_KEY` — it is inlined at build time, not read at runtime.
If you set a site key, the contact form now shows a verification widget above
its Send button.

## 3. Run the migration

Open the SQL editor for the Supabase project, reachable from Lovable Cloud's
backend view. Run these two files, in this order, from `supabase/migrations/`:

1. `20260827120000_rate_limit_public_writes.sql`
2. `20260827140000_captcha_and_ip_throttle.sql`

Both are written to be re-runnable, so a partly-applied earlier attempt is not
fatal. If Lovable offers to apply pending migrations itself, prefer that.

**Confirm before moving on** — run these and check the numbers:

```sql
-- Expect 0: the public can no longer write directly.
select count(*) from pg_policies
 where schemaname = 'public'
   and tablename in ('contact_messages','job_applications','newsletter_subscribers')
   and cmd = 'INSERT' and roles::text like '%anon%';

-- Expect 3: the app's server still can.
select count(*) from pg_policies
 where cmd = 'INSERT' and roles::text like '%service_role%';

-- Expect 1 each.
select count(*) from information_schema.tables
 where table_schema = 'public' and table_name = 'request_throttle';
select count(*) from pg_proc where proname = 'register_throttle_hit';
```

Any other numbers mean the migration did not fully apply. Read the SQL editor's
output before continuing — do not re-run blindly.

## 4. Smoke test the live site

| Do this | Expect |
| --- | --- |
| Submit the contact form | Success toast, a row in `contact_messages`, and an email |
| Submit it four more times | The fifth is refused: *"You have made several submissions recently."* |
| Apply to a vacancy with a PDF CV | Success toast, a row in `job_applications`, the file in the `applications` bucket |
| Sign in → Admin → Applications | The application listed; **Download** opens the CV; **Clean up orphaned CVs** reports a count |

Also worth one look: open a CV's public URL directly. It must **not** load — the
bucket is private and reads require a signed URL.

---

## If something looks wrong

**Every form submission is refused** — *"Please complete the verification
challenge and try again."* Only `TURNSTILE_SECRET_KEY` is set. Add
`VITE_TURNSTILE_SITE_KEY` and republish, or remove both.

**Forms fail with a permission error** — `permission denied for table
contact_messages`. The migration ran before the code published. Publish the
current `main`; no database change is needed.

**Enquiries arrive but no email does.** Check `CONTACT_NOTIFICATION_FROM` is a
domain verified in Resend. The `onboarding@resend.dev` default only delivers to
the address that owns the Resend account, which looks identical to a broken
deploy.

**Rolling back.** Revert the merge commits and republish. Leave the migration in
place — the old code cannot write through the new server functions, so a
database rollback is the wrong lever. If you must reopen direct writes, restore
the `anon` INSERT policies rather than dropping the throttle.

## What this release does not cover

**Per-IP limits behind a non-Cloudflare host.** The limit reads
`cf-connecting-ip`, which a client cannot forge. Where that header is absent it
falls back to `x-forwarded-for`, which a client *can* forge — an attacker
rotating it would evade the IP cap, leaving Turnstile and the per-address limits
as the defence. Worth confirming Lovable fronts the site with Cloudflare.

**Orphaned CVs.** A CV uploads before its application row is written, so an
insert that fails afterwards strands the file. *Clean up orphaned CVs* on the
admin page removes day-old files nothing references. It is manual by design —
nothing runs it on a schedule.

## For the next release

Steps 1, 2 and 4 generalise. Step 3 only applies when a release adds migrations,
and the ordering rule only bites when one of them removes an access grant the
running code still depends on. A release that only adds tables or columns can be
applied in either order.

---

Verified against PostgreSQL 16 with these migrations applied, and end to end in
a browser against the app's real server functions. Nothing here was run against
the production instance.
