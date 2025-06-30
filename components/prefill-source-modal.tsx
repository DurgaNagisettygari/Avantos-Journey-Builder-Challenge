"use client"

import type { Form, FormField, GlobalDataSource, PrefillMapping } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface PrefillSourceModalProps {
  isOpen: boolean
  onClose: () => void
  targetField: FormField
  availableSources: { direct: Form[]; transitive: Form[] }
  globalData: GlobalDataSource[]
  onSave: (mapping: Omit<PrefillMapping, "targetFieldId">) => void
}

export default function PrefillSourceModal({
  isOpen,
  onClose,
  targetField,
  availableSources,
  globalData,
  onSave,
}: PrefillSourceModalProps) {
  const handleSelectFormField = (sourceFormId: string, sourceFieldId: string) => {
    onSave({
      sourceType: "form_field",
      sourceFormId,
      sourceFieldId,
    })
  }

  const handleSelectGlobalData = (key: string, label: string) => {
    onSave({
      sourceType: "global_data",
      globalDataKey: key,
      globalDataLabel: label,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Prefill Source for "{targetField.label}"</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="direct">
              <AccordionTrigger>Direct Dependencies</AccordionTrigger>
              <AccordionContent>
                {availableSources.direct.length > 0 ? (
                  availableSources.direct.map((form) => (
                    <div key={form.id} className="ml-4">
                      <h4 className="font-semibold mt-2">{form.name}</h4>
                      {form.fields.map((field) => (
                        <Button
                          key={field.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleSelectFormField(form.id, field.id)}
                        >
                          {field.label}
                        </Button>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 px-4">No direct dependencies.</p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="transitive">
              <AccordionTrigger>Transitive Dependencies</AccordionTrigger>
              <AccordionContent>
                {availableSources.transitive.length > 0 ? (
                  availableSources.transitive.map((form) => (
                    <div key={form.id} className="ml-4">
                      <h4 className="font-semibold mt-2">{form.name}</h4>
                      {form.fields.map((field) => (
                        <Button
                          key={field.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleSelectFormField(form.id, field.id)}
                        >
                          {field.label}
                        </Button>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 px-4">No transitive dependencies.</p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="global">
              <AccordionTrigger>Global Data</AccordionTrigger>
              <AccordionContent>
                {globalData.map((item) => (
                  <Button
                    key={item.key}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleSelectGlobalData(item.key, item.label)}
                  >
                    {item.label}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
