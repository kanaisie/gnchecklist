"use client";

import { useRouter } from "next/navigation";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFirebaseAuth } from "@/components/FirebaseAuthProvider";

export default function Header() {
  const { user } = useFirebaseAuth();
  const router = useRouter();

  return (
    <header className="p-4 sm:p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-bold">
        Customer Checklist
      </h1>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 truncate max-w-[180px]">
            {user.email}
          </span>
          <button
            type="button"
            onClick={async () => {
              await firebaseSignOut(auth);
              router.push("/login");
            }}
            className="rounded-lg bg-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-600 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
}
