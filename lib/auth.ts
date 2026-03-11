import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

/*
ENV VARIABLES EXPECTED

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourgmail@gmail.com
SMTP_PASSWORD=your_app_password

EMAIL_FROM=yourgmail@gmail.com
NEXTAUTH_SECRET=xxxxxxxx
NEXTAUTH_URL=http://localhost:3000
*/

if (!process.env.NEXTAUTH_SECRET) {
  console.warn("[NextAuth] NEXTAUTH_SECRET missing");
}

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === "production") {
  console.warn("[NextAuth] NEXTAUTH_URL missing");
}

function getAllowedEmails(): string[] {
  const list = process.env.ALLOWED_EMAILS;
  if (!list) return [];
  return list
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/* SMTP CONFIG */

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD;

const hasEmailConfig = !!smtpHost && !!smtpUser && !!smtpPass;

/* FROM EMAIL */

const fromEmail = process.env.EMAIL_FROM ?? "no-reply@example.com";
const fromName = process.env.EMAIL_FROM_NAME ?? "";
const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

/* MAGIC LINK STORAGE (DEV ONLY) */

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

/* EMAIL SENDER */

async function sendMagicLinkEmail(identifier: string, url: string) {
  const key = identifier.toLowerCase();

  lastMagicLinkByEmail.set(key, { url, at: Date.now() });

  console.log("[NextAuth] Magic link:", url);

  if (!hasEmailConfig) {
    console.warn("[NextAuth] SMTP not configured — email not sent.");
    return;
  }

  const transport = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transport.verify();
    console.log("[SMTP] Connection verified");
  } catch (error) {
    console.error("[SMTP] Connection failed:", error);
    throw error;
  }

  const html = `
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
  `;

  try {
    await transport.sendMail({
      from,
      to: identifier,
      subject: "Sign in to Customer Checklist",
      text: `Sign in: ${url}`,
      html,
    });

    console.log("[SMTP] Email sent to", identifier);
  } catch (error) {
    console.error("[SMTP] Failed to send email:", error);
    throw error;
  }
}

/* NEXTAUTH CONFIG */

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: hasEmailConfig
        ? {
            host: smtpHost,
            port: smtpPort,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : undefined,

      from,

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