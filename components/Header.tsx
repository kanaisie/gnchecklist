"use client";

import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="p-4 sm:p-6 border-b border-slate-200 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-bold">
        Customer Checklist
      </h1>
      {status === "authenticated" && session?.user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 truncate max-w-[180px]">
            {session.user.email}
          </span>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-lg bg-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-600 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
}
