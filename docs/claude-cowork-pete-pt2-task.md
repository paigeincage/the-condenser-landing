# Claude-Cowork Runbook — The Condenser / BuildCore Launch

**You are the executor.** This doc is written for you, not for Paige. Read it in full before taking any action.

---

## 0. Context you inherit

- **Project:** The Condenser (app) + BuildCore (marketing site). A residential-construction punch-list tool built by Paige Beltran, a Construction Manager in Austin. Launch date is 2026-04-29.
- **Two repos, both local-only on branch `launch-prep`:**
  - `C:\Users\Admin\the-condenser-landing` — marketing site (Vite 8 + React 19 + Tailwind v4, anchor-scroll, no router)
  - `C:\Users\Admin\the-condenser-experimental` — the app (Vite 7 + React 19 + react-router-dom 7 + PWA; server is Express 5 + Prisma 6 + Postgres, JWT auth)
- **Branch state:** both repos on `launch-prep`, clean working tree, 7 waves of work committed. `master` is untouched. Nothing has been pushed.
- **Deploy:** Railway auto-deploys on push to GitHub `main`. The landing repo pushes from `master` → remote `master`; the app repo pushes from local `master` → remote `paigeincage/New-Condenser-App` branch `main`.
- **Current commits on landing launch-prep (most recent first):** `126e36a`, `a353572`, `37b5ef4`, `395a71b`, `65f2068`, `1b6b3d3`.
- **Current commits on app launch-prep:** `86efdb0`, `bcca9cb`, `97a385c`, `1a7028e`.
- **Full memory trail:** see `C:\Users\Admin\.claude\projects\C--Users-Admin\memory\project_condenser.md` and `MEMORY.md`. Load these on cold start.
- **Parallel human-facing doc:** `docs/launch-todo.md` in this same repo. This runbook is the machine-executable version.

## 1. Non-negotiables (read twice)

1. **Never push to `master` without running `npm run build` and `tsc -b` successfully first on the branch being merged.**
2. **Never force-push anywhere.** Never `git reset --hard` on a branch that has been pushed. Never `rm -rf`. Never `git push --force-with-lease` without explicit Paige approval.
3. **Never run `npx prisma migrate reset` or any destructive Prisma command against the Railway DB.** Migrations are handled via `npx prisma db push` (nullable columns only).
4. **Never commit `.env` files. Never echo secret values back to Paige in chat. Never log JWT_SECRET, Beehiiv API keys, or Anthropic API keys to any file.** `.env.example` is fine; `.env` is gitignored and must stay that way.
5. **Never post to social channels on Paige's behalf.** Content creation is OK, posting is not.
6. **Railway deploys trigger on push to `master` / `main`.** Treat every push as a production action. If you must rollback, do it via a forward-commit `git revert`, not a history rewrite.
7. **If a command or step is ambiguous, escalate to Paige with a one-sentence question and your recommended default. Do not guess on irreversible actions.**
8. **When blocked, stop and say so.** Do not invent fake completion.

## 2. Paige-owned handoff gates

These are the only things only Paige can do. Do not proceed past each gate until Paige confirms.

| Gate | What Paige does | How you confirm |
|---|---|---|
| **G1** | Adds `JWT_SECRET=<value>` line to `the-condenser-experimental/server/.env` | Run `grep ^JWT_SECRET= C:/Users/Admin/the-condenser-experimental/server/.env` and expect a non-empty match. Do NOT print the value. |
| **G2** | Approves `prisma db push` target (Railway prod DB) | Paige says "yes push" or equivalent in chat. Default target is whatever `DATABASE_URL` currently resolves to in `server/.env`. |
| **G3** | Supplies Beehiiv Publication ID (`pub_…`) + API Key | Paige pastes both to chat. Immediately place them into Railway env (see Task 11), never into repo files. |
| **G4** | Supplies Plausible domain (a string like `buildcorecm.com`) | Paige confirms the domain she registered on plausible.io. |
| **G5** | Drops hero video into `the-condenser-landing/public/` and names the file | Verify via `ls C:/Users/Admin/the-condenser-landing/public/ \| grep -iE '\.(mp4\|webm)$'`. |
| **G6** | Drops 4 screenshots into `the-condenser-landing/public/screenshots/` with these exact filenames: `walkthrough.png`, `send-modal.png`, `contacts.png`, `dashboard.png` | `ls C:/Users/Admin/the-condenser-landing/public/screenshots/` should show all four. |
| **G7** | Points `buildcorecm.com` DNS at Railway landing service | Paige reports DNS propagation. |
| **G8** | Sets Railway build-time env vars in the Railway dashboard (or confirms you should do it via `railway` CLI) | Paige confirms which path. |
| **G9** | Explicit "ship it" for the launch-prep → master merge + push | Do not merge without this. |

## 3. Task blocks

Tasks are grouped by phase. Each has: **Pre** (preconditions), **Do** (exact steps), **Verify** (pass criteria), **Rollback** (if it breaks).

---

### Task 1 — Apply Wave 5 schema to DB

**Phase:** Pre-launch
**Pre:** Gate G1 + G2 passed.
**Do:**
```bash
cd C:/Users/Admin/the-condenser-experimental/server
npx prisma generate --schema=prisma/schema.prisma
npx prisma db push --schema=prisma/schema.prisma
```
**Verify:**
- Output contains `Your database is now in sync with your Prisma schema.`
- Run `npx prisma studio --schema=prisma/schema.prisma` in the background, open `http://localhost:5555`, confirm `contacts` and `templates` tables each have a `user_id` column. Close studio when done.
- Alternative verify without studio: `npx prisma db execute --schema=prisma/schema.prisma --stdin <<< "SELECT column_name FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'user_id';"` — expect one row.
**Rollback:** If push fails or Paige wants to revert: edit `schema.prisma`, remove the `userId` columns + relations from `Contact` and `Template`, remove back-relations on `User`, run `npx prisma db push` again. This drops the columns. Commit the revert on `launch-prep`.

---

### Task 2 — Start dev servers

**Phase:** Pre-launch (local QA)
**Pre:** Task 1 passed.
**Do:** Open two terminals.
- Terminal A (server):
  ```bash
  cd C:/Users/Admin/the-condenser-experimental/server
  npm run dev
  ```
- Terminal B (frontend):
  ```bash
  cd C:/Users/Admin/the-condenser-experimental
  npm run dev
  ```
**Verify:**
- Terminal A logs `[Condenser API] Running on port 3001`.
- Terminal B logs `VITE v7.x.x ready in Nms` plus a `Local: http://localhost:5173/` URL.
- `curl http://localhost:3001/api/health` returns HTTP 200.
- `curl -X POST http://localhost:3001/api/auth/signup -H "Content-Type: application/json" -d '{}'` returns a 400 with `{"error":"Valid email required"}` — this proves requireAuth is bypassed on /api/auth, and validation is running.
- If it returns `{"error":"Server auth not configured (JWT_SECRET missing)"}`, G1 was not actually completed — escalate to Paige.
**Rollback:** Ctrl-C both terminals. Usually safe.

---

### Task 3 — Run the 5 QA flows with Paige

**Phase:** Pre-launch (local QA)
**Pre:** Task 2 running.
**Do:** Walk Paige through each flow ONE AT A TIME. Wait for her report back before moving on. Do not narrate; just tell her the exact clicks and ask her to confirm what she sees.

| Flow | Steps for Paige | Expected result |
|---|---|---|
| **F1 Signup + greeting** | Open http://localhost:5173 → redirects to `/login` → click "Sign up" → fill name/email/password (8+ chars) → Create account | Lands on `/` (Home). Top reads `Hey, <first name>`. Bottom nav visible. |
| **F2 Create project flow** | Click "Create your first project" → enter address + community → next → upload a PDF or skip to manual entry → review extracted items → commit | Project appears on Home with progress bar. |
| **F3 SendModal manual recipient** | Open a project with items → hit Send → pick a trade that has no matching contact → click "Send to someone else" → enter a fake email in the email field | "Email" button becomes enabled. "Text" stays disabled (phone empty). Clicking Email opens the default mail client with the recipient populated. |
| **F4 Logout / protected route** | Settings → Log out → URL redirects to `/login` → manually navigate to `/dashboard` → should redirect back to `/login` → log back in | Re-entry lands on `/` with greeting intact. |
| **F5 Founding User CTA** | Open landing at `http://localhost:5174` (if landing dev server is also running; if not, skip this flow and save for Task 13 on staging) → scroll to Founding Users section → enter email → submit | Button shows "Submitting" briefly, then "You're in". Since VITE_BEEHIIV_* aren't set yet, this will soft-success with "follow up manually" message — that is correct. |

If any flow fails, capture the exact error text, which file raised it, and propose a patch. Patch on `launch-prep`, `npx tsc -b` + `npx vite build`, commit with message `launch-prep QA fix: <flow> - <one-line summary>`. Re-run the flow.

**Verify:** Paige reports pass on all 5 (or 4 if F5 is deferred).

---

### Task 4 — Mount screenshots section

**Phase:** Pre-launch
**Pre:** Gate G6 passed (4 files present in `public/screenshots/`).
**Do:** Edit `C:/Users/Admin/the-condenser-landing/src/App.tsx`. Insert a new section between the Integrations section and the Support section. Use this template, matching surrounding tone:
```tsx
{/* ═══════════════════════════════════════════ */}
{/* N. SCREENSHOTS (light)                     */}
{/* ═══════════════════════════════════════════ */}
<section className="bg-light py-28">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <Reveal className="mb-12 text-center">
      <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Inside the App</p>
      <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">One tool, one tap per item</h2>
    </Reveal>
    <div className="grid gap-6 md:grid-cols-2">
      {[
        { src: "/screenshots/walkthrough.png", label: "Walkthrough view", desc: "Voice in. Trade out. Auto-grouped." },
        { src: "/screenshots/send-modal.png", label: "Send modal", desc: "Every sub, their channel, one tap." },
        { src: "/screenshots/contacts.png", label: "Contacts", desc: "Import once, route forever." },
        { src: "/screenshots/dashboard.png", label: "Dashboard", desc: "Live progress across every lot." },
      ].map(s => (
        <Reveal key={s.src}>
          <figure className="overflow-hidden rounded-2xl border border-light-border bg-light-card shadow-sm">
            <img src={s.src} alt={s.label} className="w-full" loading="lazy" />
            <figcaption className="border-t border-light-border p-5">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-copper">{s.label}</p>
              <p className="mt-1 text-sm text-text-on-light-2">{s.desc}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```
Find the Integrations section comment `/* 3. INTEGRATIONS` (or similar) and place the new section directly after the closing `</section>` of Integrations and before the Support section `/* 4. SUPPORT`. Renumber subsequent section comments if you want — not required.
**Verify:**
- `npm run build` completes successfully.
- No TS errors.
- Open the local dev landing site, scroll — the 4 screenshots render in a 2×2 grid on desktop, stacked on mobile.
**Rollback:** `git reset HEAD~1` before commit; or commit-revert if already committed.

---

### Task 5 — Wire hero video

**Phase:** Pre-launch
**Pre:** Gate G5 passed (video file present in `public/`).
**Do:** Edit `C:/Users/Admin/the-condenser-landing/src/App.tsx`. Find the line:
```ts
const HERO_VIDEO_SRC: string | null = null
```
Replace `null` with the public path (leading slash), e.g. `"/hero.mp4"`. Keep the type annotation.
**Verify:**
- `npm run build` succeeds.
- Load the local landing site, hero section plays the video behind the gradient overlays. Sound is muted, autoplay works on Chrome/Safari.
- If the video obstructs text readability, tune the gradient overlays around line 205 — increase `black/30` to `black/50`.
**Rollback:** Revert `HERO_VIDEO_SRC` to `null`.

---

### Task 6 — Add Plausible + Beehiiv env vars to Railway

**Phase:** Pre-launch
**Pre:** Gates G3 + G4 + G8 passed.
**Do:** Paige either pastes the values and asks you to inject them, or she does it in the Railway dashboard herself. If she asks you:
- Install Railway CLI if not present: `npm i -g @railway/cli`.
- `railway login` (opens browser, Paige authenticates).
- For the **landing** service:
  ```bash
  cd C:/Users/Admin/the-condenser-landing
  railway link  # Paige selects the landing service
  railway variables --set VITE_PLAUSIBLE_DOMAIN=<domain>
  railway variables --set VITE_BEEHIIV_PUB_ID=<pub_id>
  railway variables --set VITE_BEEHIIV_API_KEY=<api_key>
  ```
- For the **app** service:
  ```bash
  cd C:/Users/Admin/the-condenser-experimental
  railway link  # Paige selects the app service
  railway variables --set VITE_PLAUSIBLE_DOMAIN=<domain>
  railway variables --set JWT_SECRET=<value from Paige>
  ```
- Also ensure the app service has: `DATABASE_URL`, `ANTHROPIC_API_KEY`, `PORT`, `CORS_ORIGIN`. They already exist (Paige confirmed) — do not overwrite unless Paige asks.
**Verify:** `railway variables` on each service lists all expected keys (names only; values are masked by Railway in output).
**Rollback:** `railway variables --unset <key>` per variable.

---

### Task 7 — Pre-flight check before merge

**Phase:** Launch day (April 29), ~6 AM CT
**Pre:** All prior tasks complete. Both repos on `launch-prep`, working tree clean.
**Do:**
```bash
cd C:/Users/Admin/the-condenser-landing
git status
git fetch origin
git log --oneline launch-prep ^master
npm run build

cd C:/Users/Admin/the-condenser-experimental
git status
git fetch origin
git log --oneline launch-prep ^master
npx tsc -b
npx vite build
cd server && npx tsc
```
**Verify:**
- `git status` reports `nothing to commit, working tree clean` on both.
- Both builds exit 0 with no TS errors.
- `git log` shows the expected sequence of Wave commits (see §0 for SHAs).
- If anything has drifted (new untracked files, TS errors, build failure) — STOP. Report the drift. Do not proceed to Task 8.

---

### Task 8 — Merge launch-prep to master + push

**Phase:** Launch day
**Pre:** Task 7 clean. **Gate G9 must be confirmed by Paige.**
**Do:**
```bash
# Landing
cd C:/Users/Admin/the-condenser-landing
git checkout master
git merge --no-ff launch-prep -m "Launch-prep merge: Waves 1, 2, 6, 7"
git push origin master

# App
cd C:/Users/Admin/the-condenser-experimental
git checkout master
git merge --no-ff launch-prep -m "Launch-prep merge: Waves 3, 4, 5, 6"
git push origin master  # this pushes local master to remote main per repo config
```
**Verify:**
- `git push` outputs `Writing objects` and `remote: ` lines confirming receipt.
- Open Railway dashboard (Paige does this) — both services show a new deploy in progress.
**Rollback (if pushed broken code):**
- Do NOT force-push. Use `git revert -m 1 HEAD` on master to undo the merge commit, then push the revert. Railway will redeploy the reverted state.

---

### Task 9 — Monitor deploy + post-deploy smoke test

**Phase:** Launch day
**Pre:** Task 8 pushed.
**Do:**
- Poll Railway build logs every 30 seconds for up to 5 minutes per service. Watch for `✓ built in`, `PWA v1.2.0`, then `Running on port`.
- Once live, run:
  ```bash
  curl -s -o /dev/null -w "%{http_code}\n" https://the-condenser-landing-production.up.railway.app
  curl -s -o /dev/null -w "%{http_code}\n" https://condenser-app-production.up.railway.app/api/health
  curl -s -o /dev/null -w "%{http_code}\n" https://buildcorecm.com  # only after G7
  ```
- Expect `200` on all.
- Cache-bust check (PWA): the app is a PWA. After deploy, tell Paige to hard-refresh (Ctrl+Shift+R) if she was already signed in. This is a known issue flagged in memory `feedback_pwa_cache.md`.
**Verify:** All three curls return 200. If app health 401s or 500s, JWT_SECRET is missing from Railway env — see Emergency Runbook.

---

### Task 10 — Live-site smoke test

**Phase:** Launch day
**Pre:** Task 9 passed.
**Do:** This is Paige's job. Tell her the 3 checks:
1. `buildcorecm.com` loads, Founding User form accepts test email, Beehiiv receives it (she checks Beehiiv dashboard).
2. App URL loads, signup with a fresh email, Home greeting shows her name.
3. Landing pricing toggle switches between monthly/annual — Pro shows $39 then $32.

**Verify:** Paige reports all 3 passes.

---

### Task 11 — Verify analytics

**Phase:** Launch day, after Task 10
**Pre:** Paige has Plausible dashboard open.
**Do:** Open `https://buildcorecm.com` in an incognito browser window. Open devtools → Network tab → filter for `plausible`. Click the hero "Clock In" CTA.
**Verify:**
- Network shows a POST to `plausible.io/api/event` with event name `cta_click`.
- Plausible dashboard shows the event within ~60 seconds.
- If no events are firing, confirm `VITE_PLAUSIBLE_DOMAIN` was set BEFORE the Railway build (build-time env, not runtime). If missing at build, redeploy after setting.

---

### Task 12 — (Optional) Claim orphan contacts

**Phase:** Post-launch, after Paige signs up for real
**Pre:** Paige has signed up with her real email in production.
**Do:**
```bash
cd C:/Users/Admin/the-condenser-experimental/server
npx tsx src/scripts/claim-orphan-contacts.ts <paige-email>
```
**Verify:** Script prints `[claim] Assigned <N> orphan contact(s) to <email>`. Paige opens the app → Contacts page → sees those contacts.

---

## 4. Post-launch operational tasks

### Task 13 — Daily founding-user triage (days 1–7)

Each morning, query:
```bash
cd C:/Users/Admin/the-condenser-experimental/server
npx prisma studio --schema=prisma/schema.prisma
```
Or construct a read-only query via `prisma db execute` against the User + Project tables. Counts of interest:
- New users signed up in last 24h
- Users with zero projects (activation gap)
- Users with ≥1 project but zero punch items (workflow gap)

Surface the gap list to Paige. Draft personalized follow-up emails (NOT automated — she sends). Do NOT send emails on her behalf.

### Task 14 — Cold outreach drafting

When Paige asks for an outreach draft, use `launch-content/cold-outreach.md` Template 1–4 as base. She'll paste the recipient's name + the specific context. Output under 120 words, specific-not-generic, no "quick question" phrasing, no template-obvious wording.

### Task 15 — Content scheduling reminder

Staggering matters:
- Reddit posts: rotate subs, one per day, not same day
- LinkedIn + X + PH: launch day only
- Email sequence: Beehiiv auto-fires; do not touch unless Paige wants content edits

If Paige asks to post multiple Reddit posts at once, gently flag §3 of `launch-content/reddit-posts.md` and recommend staggering.

---

## 5. Emergency runbook

### E1. Auth returns 500 after deploy
- Symptom: `POST /api/auth/signup` returns `{"error":"Server auth not configured..."}` on live app.
- Cause: `JWT_SECRET` not set in Railway env on the app service.
- Fix: `railway variables --set JWT_SECRET=<value>` on the app service, trigger redeploy.
- Never hardcode the secret in repo. Never paste the value to Paige unless she explicitly asks to see it.

### E2. Deploy fails on Railway build
- Symptom: Railway shows build error.
- Fix: Pull the error text. Common causes:
  - TypeScript error that slipped past local check → fix on `launch-prep`, re-merge.
  - Missing dep → check `package.json` vs. lockfile, run `npm install`, commit lockfile.
  - Prisma generate failure → confirm `DATABASE_URL` is set in Railway env at build time.
- Do NOT hotfix on master. Always: revert master if already deployed, fix on launch-prep, re-merge.

### E3. DB push broke something
- Symptom: Paige reports errors interacting with contacts or templates after Task 1.
- Fix: In `server/prisma/schema.prisma`, revert the `userId` additions on Contact + Template + the back-relations on User. `npx prisma db push` again. This drops the new columns non-destructively. Commit the revert to `launch-prep`, then start a fresh migration plan.

### E4. Landing shows stale content after deploy
- Cause: PWA cache. Known. See `memory/feedback_pwa_cache.md`.
- Fix: Tell Paige to hard-refresh (Ctrl+Shift+R). Do NOT redeploy — that does not help.
- Verify bundle hash changed: `curl -s https://buildcorecm.com | grep -oE 'index-[A-Za-z0-9_-]+\.js'` — compare to `dist/assets/` filename from the last build.

### E5. Paige asks you to "just push"
- Response: "I'll push after `npm run build` + `npx tsc -b` pass locally. One sec." Then do it.
- Never push without a clean build. Never push with uncommitted changes.

### E6. Paige asks you to do something irreversible (force push, delete branch, reset DB)
- Response: state the action, state the blast radius in one sentence, ask for explicit confirmation. Wait for yes/no. No silent execution.

### E7. Claude-cowork (you) hits a task that requires Paige input
- Response: stop. Tell Paige in one message: what you were doing, what input you need, the default you'd pick if she doesn't answer.

---

## 6. Bonus hardening (only if time allows, confirm with Paige first)

These are not required for launch but raise polish. Each is independent — do one at a time, confirm with Paige before starting.

### B1. Favicon
`index.html` references `/favicon.svg` but the file doesn't exist in `public/`. Create a simple BuildCore "B" favicon at 32×32 SVG, add to `public/favicon.svg`. Rebuild.

### B2. Social meta tags (landing)
Add to `index.html`:
```html
<meta property="og:title" content="BuildCore — Built for the field, not the office" />
<meta property="og:description" content="Punch lists for residential CMs. Voice in, trade-grouped dispatch out. Offline-first." />
<meta property="og:image" content="https://buildcorecm.com/og.png" />
<meta property="og:url" content="https://buildcorecm.com" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@paige_cm" />
```
Requires `public/og.png` at 1200×630. Block on asset from Paige.

### B3. robots.txt + sitemap.xml (landing)
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://buildcorecm.com/sitemap.xml
```
Create `public/sitemap.xml` with the single landing URL + last-modified date.

### B4. 404 page (landing)
Anchor-scroll site → any deep path 404s. Add a simple `public/404.html` or configure Railway to serve `index.html` for all paths.

### B5. Chunked bundle (app)
Vite warning: 866 KB bundle. Add `build.rollupOptions.output.manualChunks` in `vite.config.ts` to split Recharts, Dexie, pdfjs-dist into their own chunks. Target <400 KB main bundle.

### B6. Plausible extensions
Enable `outbound-links` + `file-downloads` scripts from Plausible. Update `src/lib/analytics.ts` on both repos — change script src from `script.js` to `script.outbound-links.file-downloads.js`.

### B7. Accessibility smoke
Run axe DevTools on live landing + app signup flow. Fix any color-contrast or missing-label issues surfaced. Report, don't ship unilaterally.

### B8. Beehiiv welcome automation
Inside Beehiiv dashboard: set up an automation that adds every Founding User subscriber to an "early-access" tag. Triggered by the form submission. Paige configures this in the Beehiiv UI; you only advise.

### B9. Google Search Console
Verify the `buildcorecm.com` property in GSC. Submit sitemap. This is 100% Paige-owned (Google account access). You only remind her.

### B10. Package audit
`npm audit` on both repos. Report any HIGH/CRITICAL vulns. Do NOT auto-run `npm audit fix` — it can breaking-upgrade transitive deps. Show Paige the list, get consent per-fix.

---

## 7. Don't-do list (autonomy guardrails)

- Do not run `git push --force` or `--force-with-lease` without explicit Paige approval.
- Do not delete branches without Paige approval.
- Do not run destructive Prisma commands.
- Do not commit secrets. Do not echo secrets. Do not persist secrets in memory files.
- Do not post to X, LinkedIn, Reddit, Product Hunt, or any external channel on Paige's behalf.
- Do not send email from her inbox.
- Do not charge anything, sign up for any paid service, or provision paid infrastructure without approval.
- Do not claim a task is complete if it wasn't actually verified.
- Do not remove or edit this runbook without Paige approval.
- If in doubt, ask.

---

## 8. Success criteria for "launch complete"

Mark the launch done only when ALL of these are true:
1. `buildcorecm.com` returns 200, shows current design, Founding CTA accepts emails and they land in Beehiiv.
2. App URL returns 200, fresh signup works end-to-end, greeting reflects the new user's name, data isolation holds (second signup can't see first's projects).
3. Plausible dashboard shows live events from both landing and app.
4. Paige has confirmed via chat that she has posted on at least LinkedIn + one of (X, Reddit, PH).
5. No P0 bugs reported in the first 2 hours live.
6. `git log` on both repos `master` includes the launch-prep merge commit and Railway's latest deploy matches that SHA.

At that point: log a one-message summary in chat, suggest updating `project_condenser.md` memory to "launched 2026-04-29", and stand down.

---

**End of runbook.**
