# Avantos - Journey Builder React Coding Challenge

This project is a solution for the Avantos coding challenge, which involves reimplementing a node-based form journey builder with prefill capabilities.

**Submitted by:** Durga Dheeraj Nagisettygari (dheerajgandla3@gmail.com)

## Links

-   **GitHub Repository:** [Link to your repo]
-   **Screen Recording:** [Link to your video]

---

## How to Run Locally

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repo-link>
    cd <repo-name>
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    \`\`\`

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## How to Extend with New Data Sources

The application is designed to be easily extensible for new data sources.

1.  **Define the Data Source Type:**
    Add your new data source to the `GlobalDataSource` type in `types/form.ts`.

2.  **Create a Custom Hook:**
    Create a new hook (e.g., `hooks/use-new-data.ts`) to fetch or provide the data for your new source.

3.  **Integrate into the UI:**
    In `components/prefill-source-modal.tsx`, import your new hook and add a new `<AccordionItem>` to display the data, following the pattern used for "Global Data". The component will handle the rest.

---

## Architectural Patterns

-   **Component-Based Architecture:** The UI is broken down into reusable React components (`FormList`, `PrefillConfigPanel`, etc.) located in the `components` directory.
-   **Custom Hooks:** Logic for data fetching (`useForms`, `useGlobalData`) is encapsulated in custom hooks for reusability and separation of concerns.
-   **Type-Safety:** TypeScript is used throughout the project (`types/form.ts`) to ensure type safety and clear data contracts between components.
-   **DAG Traversal:** A `FormDAG` utility class (`utils/form-dag.ts`) handles the complex logic of traversing the form dependency graph, keeping this logic separate from the UI components.
-   **API Routes as Proxies:** Next.js API routes are used to proxy requests to the external challenge server, avoiding CORS issues and hiding sensitive tokens from the client-side code.
