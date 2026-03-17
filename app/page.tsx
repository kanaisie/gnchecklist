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

  const {customers,addCustomer,toggleItem,updateAccountType} = useCustomers()

  const [selected,setSelected] = useState<number>()
  const [search,setSearch] = useState("")
  const [newCustomerName, setNewCustomerName] = useState("")
  const [newAccountType, setNewAccountType] = useState("Checking")

  const accountTypes = [
    "Checking",
    "Savings",
    "DDA",
    "CD",
    "Money Market",
    "Loan",
    "Credit Card",
    "Other",
  ] as const

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
        <div className="flex flex-col gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full sm:max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                value={newCustomerName}
                onChange={e => setNewCustomerName(e.target.value)}
                placeholder="Customer name"
                className="w-full sm:w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={newAccountType}
                onChange={e => setNewAccountType(e.target.value)}
                className="w-full sm:w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {accountTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => {
                  const name = newCustomerName.trim() || "New Customer"
                  addCustomer(name, newAccountType)
                  setNewCustomerName("")
                  setNewAccountType("Checking")
                }}
              >
                + Add Customer
              </button>
            </div>
          </div>
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
            updateAccountType={updateAccountType}
            signedInUserEmail={user?.email ?? undefined}
          />

        </div>

      </main>

    </div>
  )
}