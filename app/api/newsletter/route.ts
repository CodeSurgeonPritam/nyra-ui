import { NextResponse, type NextRequest } from "next/server";

import { env, isResendConfigured } from "@/lib/env";
import { addToAudience, sendEmail } from "@/lib/email";
import { welcomeEmail } from "@/lib/email-templates";

/**
 * Newsletter signup endpoint.
 *
 * Accepts `{ email: string }`. Sends the welcome email immediately and
 * (if RESEND_AUDIENCE_ID is set) adds the address to the configured
 * audience for the follow-up sequence. Returns 200 even when Resend
 * isn't configured — we'd rather quietly succeed in dev than 500.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const email = parseEmail(body);
  if (!email) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  if (!isResendConfigured()) {
    // Dev / pre-launch: log and return success so the form still feels alive.
    console.info(`[newsletter] (no Resend) ${email}`);
    return NextResponse.json({ ok: true, queued: false });
  }

  const baseUrl = env.NEXT_PUBLIC_APP_URL;
  const welcome = welcomeEmail(baseUrl);

  const [audienceResult, sendResult] = await Promise.all([
    addToAudience(email),
    sendEmail({
      to: email,
      subject: welcome.subject,
      html: welcome.html,
      text: welcome.text,
    }),
  ]);

  if (!sendResult.ok) {
    return NextResponse.json(
      { error: "send-failed", detail: sendResult.error },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    queued: true,
    audienceAdded: audienceResult.ok,
  });
}

function parseEmail(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { email?: unknown }).email;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  if (trimmed.length > 254) return null;
  return trimmed;
}
