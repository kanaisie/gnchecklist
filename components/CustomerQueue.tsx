"use client"

import { Customer } from "@/types/customer"
import { useEffect, useState } from "react"

interface Props {
  customers: Customer[]
  onSelect: (id:number)=>void
}




export default function CustomerQueue({customers,onSelect}:Props){

const [test,setTest] = useState<any[]>([])
useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setTest(data))
      .catch((err) => console.error(err));
  }, []);  
  
  console.log(test)
  return (
    <div className="w-full md:w-80 border-r border-slate-200 bg-white/80 backdrop-blur p-4">

      <h2 className="font-semibold text-slate-900 mb-3">
        Customer Queue
      </h2>

      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
        {customers.map(customer=>(
          <div
            key={customer.id}
            className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer shadow-xs transition"
            onClick={()=>onSelect(customer.id)}
          >
            <div className="font-medium text-slate-900 truncate">
              {customer.name}
            </div>

            <div className="mt-0.5 text-xs text-slate-500">
              {customer.accountType}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}