"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import CustomerQueue from "@/components/CustomerQueue"
import ChecklistPanel from "@/components/ChecklistPanel"
import { useCustomers } from "@/hooks/useCustomers"
import { useFirebaseAuth } from "@/components/FirebaseAuthProvider"

export default function Home(){
  const { user, loading } = useFirebaseAuth()
  const router = useRouter()

  const {customers,addCustomer,toggleItem} = useCustomers()

  const [selected,setSelected] = useState<number>()
  const [search,setSearch] = useState("")

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  // Show only first 10 by default; when searching, show all matches
  const visibleCustomers = search
    ? filteredCustomers
    : filteredCustomers.slice(0, 10)

  const selectedCustomer = customers.find(c=>c.id===selected)

  // Redirect unauthenticated users to /login once auth state is known
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading…</p>
      </div>
    )
  }

  if (!user) {
    // While redirecting, render nothing
    return null
  }

  return(
    <div className="min-h-screen bg-slate-50">

      <Header/>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">

        {/* Search + actions bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full sm:max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
            onClick={()=>addCustomer("John Smith","Checking")}
          >
            + Add Customers
          </button>
        </div>

        {/* Main layout */}
        <div className="flex flex-col md:flex-row md:items-start bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          <CustomerQueue
            customers={visibleCustomers}
            onSelect={setSelected}
          />

          <ChecklistPanel
            customer={selectedCustomer}
            toggleItem={toggleItem}
            signedInUserEmail={user?.email ?? undefined}
          />

        </div>

      </main>

    </div>
  )
}