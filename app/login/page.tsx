// "use client"

// import { useState } from "react"
// import { signIn } from "next-auth/react"

// export default function LoginPage() {

//   const [email,setEmail] = useState("")
//   const [loading,setLoading] = useState(false)
//   const [message,setMessage] = useState("")
//   const [error,setError] = useState("")

//   async function handleSubmit(e: React.FormEvent) {

//     e.preventDefault()

//     if(!email) return

//     setLoading(true)
//     setError("")
//     setMessage("")

//     const res = await signIn("email",{
//       email,
//       redirect:false,
//       callbackUrl:"/"
//     })

//     setLoading(false)

//     if(res?.error){
//       setError(res.error)
//       return
//     }

//     if(res?.ok){
//       setMessage("Check your email for the sign-in link.")
//     }

//   }

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-slate-50">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow w-full max-w-sm space-y-4"
//       >

//         <h1 className="text-xl font-semibold">
//           GN Checklist Login
//         </h1>

//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//           placeholder="you@company.com"
//           className="w-full border rounded px-3 py-2"
//         />

//         {message && (
//           <p className="text-green-600 text-sm">{message}</p>
//         )}

//         {error && (
//           <p className="text-red-600 text-sm">{error}</p>
//         )}

//         <button
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded"
//         >
//           {loading ? "Sending..." : "Send magic link"}
//         </button>

//       </form>

//     </div>

//   )
// }




// "use client"

// import { useState } from "react"
// import { signIn } from "next-auth/react"

// export default function LoginPage(){

//   const [email,setEmail] = useState("")
//   const [loading,setLoading] = useState(false)
//   const [message,setMessage] = useState("")
//   const [error,setError] = useState("")

//   async function handleSubmit(e:any){

//     e.preventDefault()

//     setLoading(true)

//     const res = await signIn("email",{
//       email,
//       redirect:false
//     })

//     setLoading(false)

//     if(res?.error){
//       setError(res.error)
//       return
//     }

//     setMessage("Check your email for the login link.")

//   }

//   return(

//     <div className="min-h-screen flex items-center justify-center">

//       <form onSubmit={handleSubmit} className="p-6 border rounded w-96 space-y-4">

//         <h1 className="text-xl font-semibold">
//           GN Checklist Login
//         </h1>

//         <input
//           type="email"
//           placeholder="you@email.com"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />

//         {message && (
//           <p className="text-green-600">{message}</p>
//         )}

//         {error && (
//           <p className="text-red-600">{error}</p>
//         )}

//         <button
//           className="w-full bg-blue-600 text-white py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Sending..." : "Send Login Link"}
//         </button>

//       </form>

//     </div>

//   )

// }

"use client";

import { useEffect, useState } from "react";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useFirebaseAuth } from "@/components/FirebaseAuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useFirebaseAuth();

  // If already logged in, go home
  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  // Complete sign-in when coming back from email link
  useEffect(() => {
    if (typeof window === "undefined") return;
    const href = window.location.href;
    if (!isSignInWithEmailLink(auth, href)) return;

    let emailToUse =
      window.localStorage.getItem("passwordlessEmail") || email;

    // If we don't have the email stored (e.g. opened on another device),
    // ask the user once – this matches Firebase's recommended pattern.
    if (!emailToUse) {
      emailToUse = window.prompt("Confirm your email for login") || "";
    }

    if (!emailToUse) return;

    (async () => {
      try {
        await signInWithEmailLink(auth, emailToUse, href);
        window.localStorage.removeItem("passwordlessEmail");
        router.replace("/");
      } catch (e: any) {
        setStatus("error");
        setError(e.message ?? "Could not complete sign-in.");
      }
    })();
  }, [email, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("sending");
    setError("");

    try {
      const actionCodeSettings = {
        url: window.location.origin + "/login",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("passwordlessEmail", email);
      setStatus("sent");
    } catch (e: any) {
      setStatus("error");
      setError(e.message ?? "Failed to send sign-in link.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold">Customer Checklist Login</h1>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full border rounded px-3 py-2"
        />

        {status === "sent" && (
          <p className="text-green-600 text-sm">
            Check your email for the sign-in link.
          </p>
        )}

        {status === "error" && error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {status === "sending" ? "Sending..." : "Send magic link"}
        </button>
      </form>
    </div>
  );
}