"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [devMagicLink, setDevMagicLink] = useState<string | null>(null);

  // In dev (no SMTP), poll for the magic link so we can show "Click here to sign in"
  useEffect(() => {
    if (status !== "sent" || !email.trim()) {
      setDevMagicLink(null);
      return;
    }
    let cancelled = false;
    const emailParam = encodeURIComponent(email.trim());
    const check = async () => {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/auth/dev-magic-link?email=${emailParam}`);
        if (!res.ok) return;

        const text = await res.text();
        if (!text.trim()) return;

        let data: unknown;
        try {
          data = JSON.parse(text);
        } catch {
          return;
        }

        if (!cancelled && typeof data === "object" && data && (data as any).url) {
          setDevMagicLink((data as any).url as string);
        }
      } catch {
        // ignore
      }
    };
    // Poll a few times (server may still be writing the link after signIn)
    const t = setTimeout(check, 300);
    const t2 = setTimeout(check, 1200);
    const t3 = setTimeout(check, 2500);
    return () => {
      cancelled = true;
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [status, email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMessage("");
    setDevMagicLink(null);
    try {
      const res = await signIn("email", {
        email: email.trim(),
        redirect: false,
        callbackUrl: "/",
      });
      if (res?.error) {
        setStatus("error");
        const msg =
          res.error === "AccessDenied"
            ? "Your email is not in ALLOWED_EMAILS. Add it in .env.local (comma-separated list)."
            : res.error === "Configuration"
              ? "Server auth misconfigured. Check NEXTAUTH_SECRET and NEXTAUTH_URL in .env.local."
              : res.error;
        setErrorMessage(msg);
        return;
      }
      if (res?.ok) {
        setStatus("sent");
        return;
      }
      setStatus("error");
      setErrorMessage(res?.error ? String(res.error) : "Something went wrong. Check the terminal for errors.");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          GN Checklist
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Sign in with your work email (magic link).
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            disabled={status === "loading" || status === "sent"}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60"
          />
          {status === "sent" && (
            <div className="space-y-2">
              <p className="text-sm text-emerald-600">
                Check your inbox for a sign-in link.
              </p>
              {devMagicLink ? (
                <p className="text-xs text-slate-600">
                  No email configured:{" "}
                  <a
                    href={devMagicLink}
                    className="text-blue-600 font-medium underline hover:no-underline"
                  >
                    Click here to sign in
                  </a>
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Loading sign-in link…
                </p>
              )}
            </div>
          )}
          {status === "error" && errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={status === "loading" || status === "sent"}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {status === "loading"
              ? "Sending…"
              : status === "sent"
                ? "Check your email"
                : "Send magic link"}
          </button>
        </form>
      </div>
    </div>
  );
}
