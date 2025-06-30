"use client"

import type { Form, FormField, PrefillMapping } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XIcon, PlusCircleIcon } from "lucide-react"

interface PrefillFieldRowProps {
  field: FormField
  mapping?: PrefillMapping
  forms: Form[]
  onSelectField: () => void
  onClearPrefill: () => void
}

export default function PrefillFieldRow({
  field,
  mapping,
  forms,
  onSelectField,
  onClearPrefill,
}: PrefillFieldRowProps) {
  const getSourceLabel = () => {
    if (!mapping) return null
    if (mapping.sourceType === "global_data") {
      return `Global: ${mapping.globalDataLabel}`
    }
    if (mapping.sourceType === "form_field") {
      const sourceForm = forms.find((f) => f.id === mapping.sourceFormId)
      const sourceField = sourceForm?.fields.find((f) => f.id === mapping.sourceFieldId)
      if (sourceForm && sourceField) {
        return `${sourceForm.name} → ${sourceField.label}`
      }
    }
    return "Invalid configuration"
  }

  const sourceLabel = getSourceLabel()

  return (
    <Card>
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">{field.label}</span>
          <span className="text-xs text-gray-400">{field.name}</span>
        </div>
        {mapping ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-md">{sourceLabel}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClearPrefill}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="text-gray-500" onClick={onSelectField}>
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            Set Prefill
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
