"use client"

import type { Form, FormPrefillConfig } from "@/types/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FormListProps {
  forms: Form[]
  selectedFormId: string | null
  onSelectForm: (id: string) => void
  prefillConfigs: Map<string, FormPrefillConfig>
}

export default function FormList({ forms, selectedFormId, onSelectForm, prefillConfigs }: FormListProps) {
  return (
    <div className="space-y-2">
      {forms.map((form) => {
        const config = prefillConfigs.get(form.id)
        const prefilledFieldsCount = config?.mappings.filter((m) => m.sourceType).length || 0

        return (
          <Button
            key={form.id}
            variant={selectedFormId === form.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-left h-auto py-2",
              selectedFormId === form.id && "bg-gray-100 dark:bg-gray-800",
            )}
            onClick={() => onSelectForm(form.id)}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{form.name}</span>
              <span className="text-xs text-gray-500">
                {prefilledFieldsCount} / {form.fields.length} fields prefilled
              </span>
            </div>
          </Button>
        )
      })}
    </div>
  )
}
