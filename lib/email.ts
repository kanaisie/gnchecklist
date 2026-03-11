import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

// export async function sendMagicLinkEmail(email: string, url: string) {

//   await resend.emails.send({
//     from: process.env.EMAIL_FROM!,
//     to: email,
//     const key = identifier.toLowerCase();

//     lastMagicLinkByEmail.set(key, { url, at: Date.now() });
  
//     console.log("[NextAuth] Magic link:", url);
//     subject: "Sign in to Customer Checklist",
//     text: `Sign in to Customer Checklist\n\n${url}`,
//     html: `
//       <h2>Sign in to Customer Checklist</h2>
//       <p>Click the link below to sign in.</p>

//       <p>
//         <a href="${url}"
//            style="background:#2563eb;color:white;padding:12px 24px;
//            text-decoration:none;border-radius:8px;">
//            Sign in
//         </a>
//       </p>

//       <p>If the button doesn't work, copy this link:</p>
//       <p>${url}</p>
//     `,
//   })

// }












// async function sendMagicLinkEmail(identifier: string, url: string) {

//   const key = identifier.toLowerCase();

//   lastMagicLinkByEmail.set(key, { url, at: Date.now() });

//   console.log("[NextAuth] Magic link:", url);

//   const msg = {
//     to: identifier,
//     from,
//     subject: "Sign in to Customer Checklist",
//     text: `Sign in to Customer Checklist\n\n${url}`,
//     html: `
//       <h2>Sign in to Customer Checklist</h2>
//       <p>Click the link below to sign in.</p>

//       <p>
//         <a href="${url}"
//            style="background:#2563eb;color:white;padding:12px 24px;
//            text-decoration:none;border-radius:8px;">
//            Sign in
//         </a>
//       </p>

//       <p>If the button doesn't work, copy this link:</p>
//       <p>${url}</p>
//     `,
//   };

//   try {

//     await sgMail.send(msg);

//     console.log("[SendGrid] Email sent:", identifier);

//   } catch (error) {

//     console.error("[SendGrid] Email failed:", error);

//     throw error;

//   }
// }