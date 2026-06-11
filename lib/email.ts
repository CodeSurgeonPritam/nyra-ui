/**
 * Resend wrapper — uses the REST API directly so we don't pull the
 * `resend` SDK as a runtime dependency. Every function is a no-op when
 * `RESEND_API_KEY` is missing; the route handlers degrade gracefully.
 */

import "server-only";
import { env, isResendConfigured } from "@/lib/env";

const API_BASE = "https://api.resend.com";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  /** Used for the Resend "list-unsubscribe" header — pass `audience:<id>` to opt in. */
  unsubscribe?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
  unsubscribe,
}: SendArgs): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isResendConfigured()) {
    return { ok: false, error: "resend-not-configured" };
  }
  try {
    const response = await fetch(`${API_BASE}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to,
        subject,
        html,
        text,
        ...(unsubscribe ? { list_unsubscribe: unsubscribe } : {}),
      }),
    });
    if (!response.ok) {
      const body = await response.text();
      return { ok: false, error: `resend-http-${response.status}: ${body}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "resend-unknown",
    };
  }
}

/**
 * Adds an email to the configured Resend Audience. Silently no-ops if no
 * audience ID is set — useful for keeping just the welcome flow without
 * managing a long-running list yet.
 */
export async function addToAudience(
  email: string,
): Promise<{ ok: boolean }> {
  if (!isResendConfigured() || !env.RESEND_AUDIENCE_ID) {
    return { ok: false };
  }
  try {
    const response = await fetch(
      `${API_BASE}/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      },
    );
    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}
