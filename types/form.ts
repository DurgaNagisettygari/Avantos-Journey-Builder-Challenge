export interface FormField {
  id: string
  name: string
  type: "text" | "email" | "checkbox" | "select" | "dynamic_checkbox_group" | "dynamic_object"
  label: string
  required?: boolean
}

export interface Form {
  id: string
  name: string
  fields: FormField[]
  dependencies: string[] // IDs of forms this form depends on
}

export interface PrefillMapping {
  targetFieldId: string
  sourceType: "form_field" | "global_data"
  sourceFormId?: string
  sourceFieldId?: string
  globalDataKey?: string
  globalDataLabel?: string
}

export interface FormPrefillConfig {
  formId: string
  mappings: PrefillMapping[]
}

export interface GlobalDataSource {
  key: string
  label: string
  type: "action_property" | "client_org_property" | "custom"
}
