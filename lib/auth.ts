import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import sgMail from "@sendgrid/mail";
import { prisma } from "./prisma";

/*
SendGrid Setup
*/

if (!process.env.SENDGRID_API_KEY) {
  console.warn("[NextAuth] SENDGRID_API_KEY missing");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/*
NextAuth checks
*/

if (!process.env.NEXTAUTH_SECRET) {
  console.warn("[NextAuth] NEXTAUTH_SECRET missing");
}

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === "production") {
  console.warn("[NextAuth] NEXTAUTH_URL missing");
}

/*
Allowed Emails
*/

function getAllowedEmails(): string[] {
  const list = process.env.ALLOWED_EMAILS;
  if (!list) return [];

  return list
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/*
Sender
*/

const fromEmail = process.env.EMAIL_FROM ?? "no-reply@example.com";
const fromName = process.env.EMAIL_FROM_NAME ?? "Customer Checklist";

const from = {
  email: fromEmail,
  name: fromName,
};

/*
Magic link storage (dev)
*/

const lastMagicLinkByEmail = new Map<string, { url: string; at: number }>();
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

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

/*
Send email using SendGrid API
*/

async function sendMagicLinkEmail(identifier: string, url: string) {

  const key = identifier.toLowerCase();

  lastMagicLinkByEmail.set(key, { url, at: Date.now() });

  console.log("[NextAuth] Magic link:", url);

  const msg = {
    to: identifier,
    from,
    subject: "Sign in to Customer Checklist",
    text: `Sign in to Customer Checklist\n\n${url}`,
    html: `
      <h2>Sign in to Customer Checklist</h2>
      <p>Click the link below to sign in.</p>

      <p>
        <a href="${url}"
           style="background:#2563eb;color:white;padding:12px 24px;
           text-decoration:none;border-radius:8px;">
           Sign in
        </a>
      </p>

      <p>If the button doesn't work, copy this link:</p>
      <p>${url}</p>
    `,
  };

  try {

    await sgMail.send(msg);

    console.log("[SendGrid] Email sent:", identifier);

  } catch (error) {

    console.error("[SendGrid] Email failed:", error);

    throw error;

  }
}

/*
NextAuth Configuration
*/

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({

      from: fromEmail,

      sendVerificationRequest: async ({ identifier, url }) => {
        await sendMagicLinkEmail(identifier, url);
      },

    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

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
        console.warn("[NextAuth] Sign-in denied:", email);
      }

      return ok;
    },

    redirect: async ({ url, baseUrl }) => {
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