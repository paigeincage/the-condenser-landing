/**
 * Beehiiv subscribe helper. Graceful degradation when env vars unset.
 *
 * Required env (set at build time in Vite):
 *   VITE_BEEHIIV_PUB_ID  — publication id, e.g. "pub_xxxxxxxx"
 *   VITE_BEEHIIV_API_KEY — publication API key
 *
 * Exposing the API key in frontend JS is acceptable for publication-scoped
 * subscribe calls (low blast radius). For anything beyond subscribe, move to
 * a server proxy.
 */

const PUB_ID: string | undefined = import.meta.env.VITE_BEEHIIV_PUB_ID;
const API_KEY: string | undefined = import.meta.env.VITE_BEEHIIV_API_KEY;

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'invalid-email' | 'server-error'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  email: string,
  opts?: { utmSource?: string; utmCampaign?: string },
): Promise<SubscribeResult> {
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, reason: 'invalid-email', message: 'Enter a valid email' };
  }
  if (!PUB_ID || !API_KEY) {
    console.warn('[beehiiv] Not configured — set VITE_BEEHIIV_PUB_ID and VITE_BEEHIIV_API_KEY');
    return {
      ok: false,
      reason: 'not-configured',
      message: "You're in — we'll follow up manually while we finish setup.",
    };
  }
  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: opts?.utmSource ?? 'buildcore-landing',
        utm_campaign: opts?.utmCampaign ?? 'founding-user',
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        ok: false,
        reason: 'server-error',
        message: body.errors?.[0]?.message || `Subscribe failed (${res.status})`,
      };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: 'server-error',
      message: err instanceof Error ? err.message : 'Subscribe failed',
    };
  }
}

export function isBeehiivConfigured(): boolean {
  return !!PUB_ID && !!API_KEY;
}
