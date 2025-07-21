# Page Template Files

Use these templates when creating new pages in your application.

## Component Template

**File: `src/pages/[page-name]/components/[PageName]Page.jsx`**

```jsx
import React from 'react';

/**
 * [PageName] Page Component
 * 
 * [Description of what this page does]
 */
function [PageName]Page({ menuItem }) {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          [Page Title]
        </h1>
        <p className="text-gray-600">
          [Page description]
        </p>
      </div>

      {/* Page Content */}
      <div className="space-y-6">
        {/* Add your content sections here */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p>Page content goes here...</p>
        </div>
      </div>

      {/* Debug Info - Remove in production */}
      {menuItem && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Debug - Menu Item Data:
          </h3>
          <pre className="text-xs text-gray-600">
            {JSON.stringify(menuItem, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default [PageName]Page;
```

## Page Export Template

**File: `src/pages/[page-name]/page.jsx`**

```jsx
import [PageName]Page from "./components/[PageName]Page";

export default function [PageName]() {
    return <[PageName]Page />;
}
```

## Usage Instructions

1. **Replace `[page-name]`** with your page folder name (kebab-case)
2. **Replace `[PageName]`** with your component name (PascalCase)
3. **Replace `[Page Title]`** with the display title
4. **Replace `[Description]`** with component description
5. **Add your content** in the "Page Content" section

## Example

For a "Company Management" page:

- Folder: `company-management`
- Component: `CompanyManagementPage`
- Title: "Quản lý công ty"

**Component file:** `src/pages/company-management/components/CompanyManagementPage.jsx`
**Export file:** `src/pages/company-management/page.jsx`
