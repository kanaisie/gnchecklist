"use client"

import { useState } from "react"
import { CHECKLIST } from "@/data/checklist"
import { Customer } from "@/types/customer"
import { RAW_CUSTOMERS } from "@/data/customers"

function initChecklist() {
  return CHECKLIST.map(item => ({
    ...item,
    done: false
  }))
}
console.log(RAW_CUSTOMERS)
export function useCustomers() {

  const [customers, setCustomers] = useState<Customer[]>(() =>
    RAW_CUSTOMERS.map((c: any, index: number) => ({
      id: index + 1,
      name: `${c.first} ${c.last}`,
      accountType: ["Checking"],
      status: "pending",
      checklist: initChecklist()
    }))
  )

  function addCustomer(name: string, accountType: string) {

    const newCustomer: Customer = {
      id: Date.now(),
      name,
      accountType: [accountType],
      status: "pending",
      checklist: initChecklist()
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
            }
          : customer
      )
    )
  }

  return { customers, addCustomer, toggleItem, updateAccountType }
}