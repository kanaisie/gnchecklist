import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMagicLinkEmail(email: string, url: string) {

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Sign in to Customer Checklist",
    html: `
      <h2>Sign in</h2>
      <p>Click the link below to sign in:</p>

      <a href="${url}"
         style="
           background:#2563eb;
           color:white;
           padding:12px 20px;
           text-decoration:none;
           border-radius:6px;
         ">
         Sign In
      </a>

      <p>If the button doesn't work copy this link:</p>
      <p>${url}</p>
    `
  })

}