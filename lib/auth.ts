import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { Resend } from "resend"
import { prisma } from "./prisma"

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmail = process.env.EMAIL_FROM ?? "onboarding@resend.dev"

// Store last magic link in dev so the /api/auth/dev-magic-link helper can surface it
const lastMagicLinkByEmail = new Map<string, { url: string; at: number }>()
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000

export function getLastMagicLinkForDev(email: string): string | null {
  if (process.env.NODE_ENV !== "development") return null

  const entry = lastMagicLinkByEmail.get(email.toLowerCase())
  if (!entry) return null

  if (Date.now() - entry.at > MAGIC_LINK_TTL_MS) {
    lastMagicLinkByEmail.delete(email.toLowerCase())
    return null
  }

  return entry.url
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: fromEmail,
      async sendVerificationRequest({ identifier, url }) {
        const key = identifier.toLowerCase()
        lastMagicLinkByEmail.set(key, { url, at: Date.now() })

        console.log("[NextAuth] Sending login email to:", identifier)
        console.log("[NextAuth] Magic link:", url)

        const html = `
          <h2>GN Checklist Login</h2>
          <p>Click below to sign in:</p>
          <a href="${url}"
             style="
               display:inline-block;
               padding:12px 24px;
               background:#2563eb;
               color:white;
               text-decoration:none;
               border-radius:6px;">
             Sign in
          </a>
          <p>${url}</p>
        `

        await resend.emails.send({
          from: fromEmail,
          to: identifier,
          subject: "Sign in to GN Checklist",
          html,
        })
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  // No signIn callback: allow any email to complete login
  secret: process.env.NEXTAUTH_SECRET,
}