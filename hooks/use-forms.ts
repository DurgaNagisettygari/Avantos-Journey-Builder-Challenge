"use client"

import { useState, useEffect } from "react"
import type { Form } from "../types/form"

// Mock API service - replace with actual API call
const mockForms: Form[] = [
  {
    id: "form-a",
    name: "Form A",
    fields: [
      { id: "email", name: "email", type: "email", label: "Email Address" },
      { id: "name", name: "name", type: "text", label: "Full Name" },
    ],
    dependencies: [],
  },
  {
    id: "form-b",
    name: "Form B",
    fields: [
      { id: "company", name: "company", type: "text", label: "Company Name" },
      { id: "phone", name: "phone", type: "text", label: "Phone Number" },
    ],
    dependencies: ["form-a"],
  },
  {
    id: "form-c",
    name: "Form C",
    fields: [{ id: "address", name: "address", type: "text", label: "Address" }],
    dependencies: ["form-a"],
  },
  {
    id: "form-d",
    name: "Form D",
    fields: [
      {
        id: "dynamic_checkbox_group",
        name: "dynamic_checkbox_group",
        type: "dynamic_checkbox_group",
        label: "Dynamic Checkbox Group",
      },
      { id: "dynamic_object", name: "dynamic_object", type: "dynamic_object", label: "Dynamic Object" },
      { id: "email", name: "email", type: "email", label: "Email" },
    ],
    dependencies: ["form-b", "form-c"],
  },
]

export function useForms() {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchForms = async () => {
      try {
        setLoading(true)
        // In real implementation, replace with:
        // const response = await fetch('/api/action-blueprint-graph-get')
        // const data = await response.json()

        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        setForms(mockForms)
      } catch (err) {
        setError("Failed to fetch forms")
      } finally {
        setLoading(false)
      }
    }

    fetchForms()
  }, [])

  return { forms, loading, error }
}
