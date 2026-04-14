# AI Coding Instructions for WMS Master

## 1. Component First & Proactive Extraction Policy
- **ALWAYS** check `src/components/shared/` before creating a new UI element.
- **PROACTIVE EXTRACTION:** If you find yourself writing a UI pattern or logic that is likely to be reused (e.g., a specific status badge, a custom filter bar, or a specialized data formatter), you **MUST** extract it to `src/components/shared/` immediately, even if not explicitly asked.
- If a shared component exists (e.g., `KpiCard`, `DraggableModal`, `CsvUpload`), you **MUST** use it instead of writing custom code.
- If you need a new reusable pattern, create it in `src/components/shared/` first, then use it in the page.

## 2. Self-Audit Step
- Before completing any task, perform a "Shared Component Audit":
  - Did I create any UI elements that could be useful in other pages?
  - If yes, move them to `src/components/shared/` and update the current page to use the shared version.

## 2. File Structure & Modularity
- **NEVER** create a single file larger than 300 lines for a page.
- **ALWAYS** extract sub-components into a `components/` folder relative to the page (e.g., `src/pages/Home/components/`).
- Use functional components and TypeScript interfaces for all props.

## 3. Standardized Features
- **Modals:** Use `DraggableModal`.
- **Data Tables:** Integrate with `CsvExport`.
- **Forms:** Use `sweetalert2` for success/error notifications.
- **Security:** Always include eye-toggle for sensitive fields.

## 4. Performance
- Use `React.memo` for expensive components in lists.
- Use `motion` for all transitions to ensure a premium feel.
