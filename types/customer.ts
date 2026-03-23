export interface ChecklistItem {
    id: string
    label: string
    category: string
    done: boolean
  }
  
  export interface Customer {
    id: number
    givenName: string
    lastName: string
    accountType: string[]
    assignee?: string
    status: "pending" | "in-progress" | "completed"
    completedAt?: string
    checklist: ChecklistItem[]
  }