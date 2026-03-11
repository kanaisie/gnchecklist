import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

if (!process.env.NEXTAUTH_SECRET) {
  console.warn(
    "[NextAuth] NEXTAUTH_SECRET is not set. Set it in .env.local (e.g. run: openssl rand -base64 32)"
  );
}
if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === "production") {
  console.warn("[NextAuth] NEXTAUTH_URL should be set in production.");
}

function getAllowedEmails(): string[] {
  const list = process.env.ALLOWED_EMAILS;
  if (!list) return [];
  return list.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

// Only use real SMTP when host, port, and at least one credential are set (avoids .env.example placeholders)
const hasEmailConfig =
  !!process.env.EMAIL_SERVER_HOST &&
  !!process.env.EMAIL_SERVER_PORT &&
  (!!process.env.EMAIL_SERVER_USER || !!process.env.EMAIL_SERVER_PASSWORD);

// Dev: store last magic link so login page can show "Click here to sign in" when not using real SMTP
const lastMagicLinkByEmail = new Map<string, { url: string; at: number }>();
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000; // 15 min

export function getLastMagicLinkForDev(email: string): string | null {
  if (process.env.NODE_ENV !== "development") return null;
  const entry = lastMagicLinkByEmail.get(email.toLowerCase());
  if (!entry) return null;
  if (Date.now() - entry.at > MAGIC_LINK_TTL_MS) {
    lastMagicLinkByEmail.delete(email.toLowerCase());
    return null;
  }
  return entry.url;
}

const from = process.env.EMAIL_FROM ?? "noreply@example.com";

async function sendMagicLinkEmail(identifier: string, url: string) {
  const key = identifier.toLowerCase();
  lastMagicLinkByEmail.set(key, { url, at: Date.now() });
  console.log("[NextAuth] Magic link for", identifier, "->", url);

  if (!hasEmailConfig) return;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_PORT === "465",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #1e293b;">Sign in to Customer Checklist</h2>
  <p style="color: #475569;">Click the link below to sign in. This link expires in 24 hours.</p>
  <p style="margin: 24px 0;">
    <a href="${url}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">Sign in</a>
  </p>
  <p style="color: #94a3b8; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
  <p style="word-break: break-all; font-size: 14px;"><a href="${url}">${url}</a></p>
</body>
</html>
  `.trim();

  await transport.sendMail({
    from,
    to: identifier,
    subject: "Sign in to Customer Checklist",
    text: `Sign in to Customer Checklist\n\nClick this link to sign in (expires in 24 hours):\n${url}`,
    html,
  });
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: hasEmailConfig
        ? {
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD,
            },
          }
        : undefined,
      from,
      sendVerificationRequest: async ({ identifier, url }) => {
        await sendMagicLinkEmail(identifier, url);
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    signIn: async ({ user }) => {
      const email = user?.email?.toLowerCase();
      if (!email) return false;
      const allowed = getAllowedEmails();
      if (allowed.length === 0) return true;
      const ok = allowed.includes(email);
      if (!ok) {
        console.warn("[NextAuth] Sign-in denied for email (not in ALLOWED_EMAILS):", email, "Allowed:", allowed);
      }
      return ok;
    },
    redirect: async ({ url, baseUrl }) => {
      // After sign in, always send to dashboard (home page)
      if (url.startsWith("/")) return url;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/";
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};
