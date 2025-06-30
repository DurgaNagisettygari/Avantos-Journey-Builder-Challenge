"use client"

import { useState } from "react"
import type { GlobalDataSource } from "@/types/form"

const mockGlobalData: GlobalDataSource[] = [
  { key: "user_name", label: "Current User Name", type: "custom" },
  { key: "user_email", label: "Current User Email", type: "custom" },
  { key: "org_name", label: "Client Organization Name", type: "client_org_property" },
]

export function useGlobalData() {
  const [globalData] = useState<GlobalDataSource[]>(mockGlobalData)
  return { globalData }
}
