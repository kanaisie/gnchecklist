"use client"

import { Customer } from "@/types/customer"

interface Props{
  customer?:Customer
  toggleItem:(cid:number,iid:string)=>void
  updateAccountType:(cid:number, accountType:string)=>void
  /** Email of the signed-in user; used as assignee in markdown export */
  signedInUserEmail?: string | null
}

const ACCOUNT_TYPES = [
  "Personal Checking",
  "Personal Savings",
  "CD",
  "Business Checking",
  "Business Savings",
  "Statement Savings",
  "Money Market",
  "Loan",
  "Credit Card",
  "Other",
] as const

export default function ChecklistPanel({customer,toggleItem,updateAccountType,signedInUserEmail}:Props){
  if(!customer){
    return (
      <div className="flex-1 p-10 flex items-center justify-center text-slate-500">
        Select a customer to view checklist
      </div>
    )
  }

  function exportChecklist(c: Customer) {
    const fullName = `${c.givenName} ${c.lastName}`.trim()
    const completedLine = c.completedAt
      ? `- Completed at: ${new Date(c.completedAt).toLocaleString()}`
      : "- Completed at: Not completed yet"
    const assignee = signedInUserEmail ?? c.assignee ?? "Unassigned"




    const lines = [
      `## Checklist Report`,
      ``,
      `> **CONFIDENTIAL** – Internal use only`,
      ``,
      `## Customer`,
      `- Name: ${fullName}`,
      `- Account type: ${c.accountType.join(", ")}`,
      `- Status: ${c.status}`,
      `- By: ${assignee}`,
      completedLine,
      "",
      `## Checklist`,
      ...c.checklist.map(item => {
        const mark = item.done ? "x" : " ";
        return `- [${mark}] ${item.label}`;
      })
    ];

    const content = lines.join("\n");
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = fullName.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

    link.href = url;
    link.download = `${safeName}-checklist.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return(
    <div className="flex-1 p-6 bg-slate-50">

      <div className="max-w-xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-5">

        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          {customer.givenName} {customer.lastName}
        </h2>

        <div className="text-sm text-slate-600 mb-4 space-y-1">
          <div>
            <div className="mb-1">Account types:</div>
            <div className="flex flex-wrap gap-2">
              {ACCOUNT_TYPES.map(type => (
                <label
                  key={type}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-xs"
                >
                  <input
                    type="checkbox"
                    className="h-3 w-3 accent-emerald-600"
                    checked={customer.accountType.includes(type)}
                    onChange={() => updateAccountType(customer.id, type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            Status:{" "}
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
              bg-slate-100 text-slate-700">
              {customer.status}
            </span>
          </div>
          <div>
            By:{" "}
            <span className="font-medium text-slate-900">
              {signedInUserEmail ?? customer.assignee ?? "Unassigned"}
            </span>
          </div>
          <div>
            Completed at:{" "}
            <span className="font-medium text-slate-900">
              {customer.completedAt
                ? new Date(customer.completedAt).toLocaleString()
                : "Not completed yet"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {customer.checklist.map(item=>(
            <div
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition
                ${item.done
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              onClick={()=>toggleItem(customer.id,item.id)}
            >
              <input
                type="checkbox"
                checked={item.done}
                readOnly
                className="h-4 w-4 accent-emerald-600"
              />

              <span className={item.done ? "line-through text-slate-400" : "text-slate-800"}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <button
          className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          onClick={()=>exportChecklist(customer)}
        >
          Download checklist (Markdown)
        </button>

      </div>

    </div>
  )
}