import type { Form } from "../types/form"

export class FormDAG {
  private forms: Map<string, Form>
  private dependencyGraph: Map<string, Set<string>>
  private reverseDependencyGraph: Map<string, Set<string>>

  constructor(forms: Form[]) {
    this.forms = new Map(forms.map((form) => [form.id, form]))
    this.dependencyGraph = new Map()
    this.reverseDependencyGraph = new Map()

    this.buildGraph(forms)
  }

  private buildGraph(forms: Form[]) {
    // Initialize graphs
    forms.forEach((form) => {
      this.dependencyGraph.set(form.id, new Set(form.dependencies))
      this.reverseDependencyGraph.set(form.id, new Set())
    })

    // Build reverse dependency graph
    forms.forEach((form) => {
      form.dependencies.forEach((depId) => {
        const reverseDeps = this.reverseDependencyGraph.get(depId) || new Set()
        reverseDeps.add(form.id)
        this.reverseDependencyGraph.set(depId, reverseDeps)
      })
    })
  }

  // Get all forms that the given form directly depends on
  getDirectDependencies(formId: string): Form[] {
    const deps = this.dependencyGraph.get(formId) || new Set()
    return Array.from(deps)
      .map((id) => this.forms.get(id))
      .filter(Boolean) as Form[]
  }

  // Get all forms that the given form transitively depends on
  getTransitiveDependencies(formId: string): Form[] {
    const visited = new Set<string>()
    const result: Form[] = []

    const dfs = (currentFormId: string) => {
      if (visited.has(currentFormId)) return
      visited.add(currentFormId)

      const deps = this.dependencyGraph.get(currentFormId) || new Set()
      deps.forEach((depId) => {
        const form = this.forms.get(depId)
        if (form) {
          result.push(form)
          dfs(depId)
        }
      })
    }

    dfs(formId)
    return result
  }

  // Get all available source forms for prefilling a target form
  getAvailableSourceForms(targetFormId: string): { direct: Form[]; transitive: Form[] } {
    const directDeps = this.getDirectDependencies(targetFormId)
    const allTransitiveDeps = this.getTransitiveDependencies(targetFormId)

    // Remove direct dependencies from transitive to avoid duplicates
    const directDepIds = new Set(directDeps.map((f) => f.id))
    const transitiveDeps = allTransitiveDeps.filter((f) => !directDepIds.has(f.id))

    return {
      direct: directDeps,
      transitive: transitiveDeps,
    }
  }
}
