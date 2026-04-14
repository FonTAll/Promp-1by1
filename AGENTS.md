# Project Standards & Guidelines

## 1. Modularity & Performance
- **Sub-component Extraction:** Every major page or complex component must be broken down into smaller, manageable sub-files. This prevents UI lag, improves maintainability, and facilitates easier debugging.
- **Lazy Loading:** Use dynamic imports for large components or routes where applicable to keep the initial bundle size small.

## 2. Shared Components (Centralized System)
All reusable logic and UI patterns must be moved to `src/components/shared/`.

### KPI Cards System
- Use a standardized `KpiCard` component for all dashboard metrics.
- Support for icons, trends, and dynamic color palettes.

### Drag & Drop System
- Implement `DraggableModal` using `react-draggable`.
- Ensure all modals and PDF previewers are movable by the user for better workspace flexibility.

### Bulk CSV Upload System
- **Performance:** Must handle large datasets efficiently using web workers or chunked processing.
- **User Guidance:** Provide clear instructions on required headers and data formats.
- **Preview:** Always show a data preview table before final confirmation.

### CSV Export System
- **Speed:** Fast generation of CSV files.
- **Depth:** Support exporting data from both the main table and associated modal details simultaneously.

### PDF Printing System
- Standardized header format (Logo, Company Name, Document Title).
- Consistent layout and styling for all printable reports.

## 3. UI/UX Standards
- **Security:** Sensitive fields (like ID Card numbers) must include a visibility toggle (eye icon).
- **Feedback:** Use `sweetalert2` for confirmations and error reporting.
- **Animations:** Use `motion` (framer-motion) for smooth transitions and interactions.
