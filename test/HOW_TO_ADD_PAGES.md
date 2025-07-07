# How to Add New Pages to Your App

## Overview
Your app now uses a centralized page routing system that makes it easy to add new pages and connect them to your sidebar menu. Here's how to add new pages:

## Step-by-Step Guide

### 1. Create a New Page Component

Create your page in the `src/pages/` directory following this structure:

```
src/pages/
├── your-page-name/
│   ├── page.jsx (simple export)
│   └── components/
│       └── YourPageComponent.jsx (actual component)
```

**Example: Creating a News Page**

**Step 1: Create the component file**
```jsx
// src/pages/news/components/NewsPage.jsx
import React from 'react';

function NewsPage({ menuItem }) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Tin tức
        </h1>
        <p className="text-gray-600">
          Cập nhật tin tức và thông báo mới nhất
        </p>
      </div>
      
      {/* Your page content here */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p>Nội dung trang tin tức...</p>
      </div>
    </div>
  );
}

export default NewsPage;
```

**Step 2: Create the page export file**
```jsx
// src/pages/news/page.jsx
import NewsPage from "./components/NewsPage";

export default function News() {
    return <NewsPage />;
}
```

### 2. Import the Page in pageRouter.js

Add your new page import at the top of `src/utils/pageRouter.js`:

```jsx
// Add this import
import NewsPage from "../pages/news/page";
```

### 3. Add Route Mapping

Add your page to the `pageRoutes` object with the corresponding menu ID:

```jsx
export const pageRoutes = {
  // ... existing routes
  '12': NewsPage,   // Tin tức (menu ID 12)
  // ... other routes
};
```

### 4. Find Your Menu ID

To find the correct menu ID for your page:

1. Look in `src/data/menuData.js` 
2. Find your menu item
3. Use the `id` field for the routing

**Example from menuData.js:**
```javascript
{
  id: '12',           // This is the ID you use in pageRouter.js
  title: 'Tin tức',   // This is what shows in the menu
  iconName: 'bell',
  type: 'item',
}
```

## Page Component Best Practices

### 1. Standard Page Structure
```jsx
function YourPage({ menuItem }) {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page Title
        </h1>
        <p className="text-gray-600">
          Page description
        </p>
      </div>

      {/* Page Content */}
      <div className="space-y-6">
        {/* Your content sections */}
      </div>
    </div>
  );
}
```

### 2. Using the menuItem Prop
Your page receives a `menuItem` prop with information about the selected menu:

```jsx
function YourPage({ menuItem }) {
  // menuItem contains:
  // - id: Menu item ID
  // - label: Menu item title
  // - iconName: Icon name
  // - parent: Parent menu info (if applicable)
  // - type: Menu type

  console.log('Current menu:', menuItem);
  
  return (
    <div className="p-6">
      <h1>Welcome to {menuItem?.label}</h1>
      {/* Rest of your page */}
    </div>
  );
}
```

### 3. Common Page Patterns

**Data Management Page:**
```jsx
function DataManagementPage({ menuItem }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data, handle CRUD operations, etc.
  
  return (
    <div className="p-6">
      {/* Search and filters */}
      {/* Data table or cards */}
      {/* Pagination */}
    </div>
  );
}
```

**Form Page:**
```jsx
function FormPage({ menuItem }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </div>
  );
}
```

## Example: Complete Page Addition

Let's say you want to add a "Company Management" page:

### 1. Create the component file:
`src/pages/company-management/components/CompanyManagementPage.jsx`
```jsx
import React from 'react';

function CompanyManagementPage({ menuItem }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Quản lý công ty
      </h1>
      {/* Your component content */}
    </div>
  );
}

export default CompanyManagementPage;
```

### 2. Create the page export file:
`src/pages/company-management/page.jsx`
```jsx
import CompanyManagementPage from "./components/CompanyManagementPage";

export default function CompanyManagement() {
    return <CompanyManagementPage />;
}
```

### 3. Import in pageRouter.js:
```jsx
import CompanyManagementPage from "../pages/company-management/page";
```

### 4. Add to routes:
```jsx
export const pageRoutes = {
  // ...
  '211': CompanyManagementPage, // Quản lý công ty
  // ...
};
```
When users click "Quản lý công ty" in the sidebar, your new page will load.

## Testing Your Pages

1. **Start the dev server**: `npm run dev`
2. **Click menu items** in the sidebar to test navigation
3. **Check the browser console** for any errors
4. **Verify the breadcrumb** in the header updates correctly

## Debugging

If your page doesn't show:

1. **Check the menu ID** matches exactly between `menuData.js` and `pageRouter.js`
2. **Verify the import path** is correct
3. **Look for console errors** in browser dev tools
4. **Check the component export** is using `export default`

## Advanced Features

### Nested Routes
For complex pages with sub-routes, you can create nested routing within your page component.

### Page Guards
Add authentication or permission checks in your page components.

### Loading States
Implement loading states for pages that fetch data.

### Error Boundaries
Add error boundaries for better error handling.

This system makes it very easy to expand your application with new pages while maintaining clean, organized code!
