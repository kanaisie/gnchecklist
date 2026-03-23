"use client"

import { useState, useEffect } from "react"
import { CHECKLIST } from "@/data/checklist"
import { Customer } from "@/types/customer"
import { RAW_CUSTOMERS } from "@/data/customers"

function hasBusinessAccountType(accountTypes: string[]) {
  return accountTypes.some(type => type.toLowerCase().includes("business"))
}

function buildChecklist(accountTypes: string[], existingChecklist?: Customer["checklist"]) {
  const includeBusiness = hasBusinessAccountType(accountTypes)
  const baseItems = CHECKLIST.filter(
    item => includeBusiness || item.category !== "Business Accounts"
  )

  return baseItems.map(item => ({
    ...item,
    done: existingChecklist?.find(existing => existing.id === item.id)?.done ?? false,
  }))
}

















export function useCustomers() {

  const [customers, setCustomers] = useState<Customer[]>(() =>
    RAW_CUSTOMERS.map((c: any, index: number) => ({
      id: index + 1,
      givenName: c.first ?? "",
      lastName: c.last ?? "",
      accountType: ["Checking"],
      status: "pending",
      checklist: buildChecklist(["Checking"])
    }))
  )

  async function getClients() {
    const res = await fetch("/api/clients")
    if (!res.ok) {
      const text = await res.text()
      console.error("Get /api/clients error:", res.status, text)
      return null
    }

    return res.json()
  }
  
   useEffect(() => {
    getClients().then(data => {
      const apiClients = Array.isArray(data?.data) ? data.data : []
      if (apiClients.length === 0) return

      setCustomers(
        apiClients.map((c: any, index: number) => ({
          id: Number(c.id) || index + 1,
          givenName: c.givenName ?? "",
          lastName: c.lastName ?? "",
          accountType: ["Checking"],
          status: "pending",
          checklist: buildChecklist(["Checking"]),
        }))
      )
    })
   }, [])
  

 

  function addCustomer(name: string, accountType: string) {
    const [first = "", ...rest] = name.trim().split(/\s+/)
    const last = rest.join(" ")

    const newCustomer: Customer = {
      id: Date.now(),
      givenName: first,
      lastName: last,
      accountType: [accountType],
      status: "pending",
      checklist: buildChecklist([accountType])
    }

    setCustomers(prev => [...prev, newCustomer])
  }

  function toggleItem(customerId: number, itemId: string) {

    setCustomers(prev =>
      prev.map(customer => {

        if (customer.id !== customerId) return customer

        const checklist = customer.checklist.map(item =>
          item.id === itemId
            ? { ...item, done: !item.done }
            : item
        )

        const done = checklist.filter(i => i.done).length

        let status: Customer["status"] = "pending"
        let completedAt = customer.completedAt

        if (done === checklist.length) {
          status = "completed"
          // Only set completion time the first time it becomes completed
          if (!completedAt) {
            completedAt = new Date().toISOString()
          }
        } else if (done > 0) {
          status = "in-progress"
        }

        return { ...customer, checklist, status, completedAt }

      })
    )
  }

  function updateAccountType(customerId: number, accountType: string) {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === customerId
          ? {
              ...customer,
              accountType: customer.accountType.includes(accountType)
                ? customer.accountType.filter(t => t !== accountType)
                : [...customer.accountType, accountType],
              checklist: buildChecklist(
                customer.accountType.includes(accountType)
                  ? customer.accountType.filter(t => t !== accountType)
                  : [...customer.accountType, accountType],
                customer.checklist
              ),
            }
          : customer
      )
    )
  }

  return { customers, addCustomer, toggleItem, updateAccountType }
}