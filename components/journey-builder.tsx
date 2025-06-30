"use client"

import { useState } from "react"
import { useForms } from "../hooks/use-forms"
import { FormDAG } from "../utils/form-dag"
import type { FormPrefillConfig, PrefillMapping } from "../types/form"
import FormList from "@/components/form-list"
import PrefillConfigPanel from "@/components/prefill-config-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function JourneyBuilder() {
  const { forms, loading, error } = useForms()
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const [prefillConfigs, setPrefillConfigs] = useState<Map<string, FormPrefillConfig>>(new Map())

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading forms...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  const formDAG = new FormDAG(forms)
  const selectedForm = forms.find((f) => f.id === selectedFormId)

  const updatePrefillConfig = (formId: string, mappings: PrefillMapping[]) => {
    const newConfigs = new Map(prefillConfigs)
    newConfigs.set(formId, { formId, mappings })
    setPrefillConfigs(newConfigs)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <FormList
            forms={forms}
            selectedFormId={selectedFormId}
            onSelectForm={setSelectedFormId}
            prefillConfigs={prefillConfigs}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prefill Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedForm ? (
            <PrefillConfigPanel
              form={selectedForm}
              formDAG={formDAG}
              prefillConfig={prefillConfigs.get(selectedFormId!) || { formId: selectedFormId!, mappings: [] }}
              onUpdateConfig={(mappings) => updatePrefillConfig(selectedFormId!, mappings)}
            />
          ) : (
            <p className="text-gray-500">Select a form to configure prefill settings</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
