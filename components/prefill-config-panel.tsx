"use client"

import { useState } from "react"
import type { Form, FormField, PrefillMapping } from "@/types/form"
import type { FormDAG } from "@/utils/form-dag"
import { useGlobalData } from "@/hooks/use-global-data"
import PrefillFieldRow from "./prefill-field-row"
import PrefillSourceModal from "./prefill-source-modal"

interface PrefillConfigPanelProps {
  form: Form
  formDAG: FormDAG
  prefillConfig: { formId: string; mappings: PrefillMapping[] }
  onUpdateConfig: (mappings: PrefillMapping[]) => void
}

export default function PrefillConfigPanel({ form, formDAG, prefillConfig, onUpdateConfig }: PrefillConfigPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const { globalData } = useGlobalData()

  const handleSelectField = (field: FormField) => {
    setSelectedField(field)
    setIsModalOpen(true)
  }

  const handleClearPrefill = (fieldId: string) => {
    const newMappings = prefillConfig.mappings.filter((m) => m.targetFieldId !== fieldId)
    onUpdateConfig(newMappings)
  }

  const handleSavePrefill = (mapping: Omit<PrefillMapping, "targetFieldId">) => {
    if (!selectedField) return

    const newMapping: PrefillMapping = { ...mapping, targetFieldId: selectedField.id }
    const otherMappings = prefillConfig.mappings.filter((m) => m.targetFieldId !== selectedField.id)
    onUpdateConfig([...otherMappings, newMapping])
    setIsModalOpen(false)
    setSelectedField(null)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr,auto] gap-x-4 text-sm font-medium text-gray-500 px-2">
        <span>Field Name</span>
        <span>Prefill Source</span>
      </div>
      {form.fields.map((field) => {
        const mapping = prefillConfig.mappings.find((m) => m.targetFieldId === field.id)
        return (
          <PrefillFieldRow
            key={field.id}
            field={field}
            mapping={mapping}
            forms={formDAG
              .getAvailableSourceForms(form.id)
              .direct.concat(formDAG.getAvailableSourceForms(form.id).transitive)}
            onSelectField={() => handleSelectField(field)}
            onClearPrefill={() => handleClearPrefill(field.id)}
          />
        )
      })}
      {selectedField && (
        <PrefillSourceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          targetField={selectedField}
          availableSources={formDAG.getAvailableSourceForms(form.id)}
          globalData={globalData}
          onSave={handleSavePrefill}
        />
      )}
    </div>
  )
}
