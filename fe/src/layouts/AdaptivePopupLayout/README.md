# AdaptiveLayout Component

A flexible, auto-generating form layout component that dynamically creates input fields based on table column metadata. Perfect for creating forms, modals, and dialogs without manually defining each input.

## 🚀 Features

- **Auto-Generation**: Automatically creates form inputs based on column metadata
- **Multiple Input Types**: Supports text, number, select, date, textarea, and boolean inputs
- **Field Variants**: Optional vs Compulsory fields with visual indicators
- **Required Field Indicators**: Red spark icon (⚡) for compulsory fields
- **Search Functionality**: Text inputs can include searchable dropdown lists
- **Search Options**: Support for predefined option lists with labels and descriptions
- **Responsive Design**: Adapts to content with dynamic height calculation
- **Scrollable Content**: Built-in scroll area for forms with many inputs
- **Modular Components**: Each input type is a separate, reusable component
- **Easy Customization**: Simple to modify individual input components

## 📁 File Structure

```
AdaptivePopupLayout/
├── components/
│   ├── AdaptiveLayout.jsx          # Main layout component
│   ├── TextInput.jsx               # Text input component
│   ├── NumberInput.jsx             # Number input component
│   ├── SelectInput.jsx             # Select dropdown component
│   ├── DateInput.jsx               # Date picker component
│   ├── TextareaInput.jsx           # Textarea component
│   └── BooleanInput.jsx            # Switch/boolean component
```

## 🔧 Usage

### Basic Example

```jsx
import AdaptiveLayout from './components/AdaptiveLayout';

// Define your columns with metadata
const columns = [
  {
    accessorKey: 'name',
    header: 'Company Name',
    meta: {
      variant: 'text',
      label: 'Company Name'
    }
  },
  {
    accessorKey: 'employees',
    header: 'Employee Count',
    meta: {
      variant: 'number',
      label: 'Number of Employees',
      unit: 'people'
    }
  },
  {
    accessorKey: 'industry',
    header: 'Industry',
    meta: {
      variant: 'select',
      label: 'Industry Type',
      options: [
        { value: 'tech', label: 'Technology' },
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' }
      ]
    }
  }
];

function MyForm() {
  const handleSave = (formData) => {
    console.log('Form data:', formData);
    // Handle save logic
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Handle cancel logic
  };

  return (
    <AdaptiveLayout
      title="Create New Company"
      columns={columns}
      initialData={{ name: '', employees: '', industry: '' }}
      onSave={handleSave}
      onCancel={handleCancel}
      maxWidth="500px"
      maxHeight="80vh"
    />
  );
}
```

## 📊 Column Configuration

The `columns` prop is an array of column objects. Each column object must have:

### Required Properties

```javascript
{
  accessorKey: 'fieldName',    // Unique identifier for the field
  header: 'Display Name',      // Fallback label if meta.label not provided
  meta: {                      // Metadata object defining input behavior
    variant: 'text',           // Input type (required)
    inputVariant: 'optional'   // Field requirement: "optional" or "compulsory" (optional, defaults to "optional")
  }
}
```

### Field Variants

All input components support two field variants:

- **`inputVariant: "optional"`** (default) - Normal field without visual indicators
- **`inputVariant: "compulsory"`** - Required field with red spark icon (⚡) next to the label

### Input Types (variant)

#### 1. Text Input (`variant: 'text'`)
```javascript
{
  accessorKey: 'firstName',
  header: 'First Name',
  meta: {
    variant: 'text',
    label: 'First Name',       // Optional: Custom label
    inputVariant: 'compulsory', // Optional: Makes field required with red spark icon
    enableSearch: true,        // Optional: Enables search button
    searchOptions: [           // Optional: Array of search options
      { label: 'John Doe', value: 'john.doe' },
      { label: 'Jane Smith', value: 'jane.smith', description: 'Manager' },
      'Simple String Option'
    ]
  }
}
```

#### 2. Number Input (`variant: 'number'`)
```javascript
{
  accessorKey: 'price',
  header: 'Price',
  meta: {
    variant: 'number',
    label: 'Product Price',
    unit: '$',                 // Optional: Display unit
    inputVariant: 'optional'   // Optional: Field requirement variant
  }
}
```

#### 3. Select Dropdown (`variant: 'select'`)
```javascript
{
  accessorKey: 'status',
  header: 'Status',
  meta: {
    variant: 'select',
    label: 'Order Status',
    inputVariant: 'compulsory', // Makes this field required
    options: [                  // Required: Array of options
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' }
    ]
  }
}
```

#### 4. Date Input (`variant: 'date'`)
```javascript
{
  accessorKey: 'startDate',
  header: 'Start Date',
  meta: {
    variant: 'date',
    label: 'Project Start Date',
    inputVariant: 'compulsory'
  }
}
```

#### 5. Textarea (`variant: 'textarea'`)
```javascript
{
  accessorKey: 'description',
  header: 'Description',
  meta: {
    variant: 'textarea',
    label: 'Product Description',
    inputVariant: 'optional'
  }
}
```

#### 6. Boolean/Switch (`variant: 'boolean'`)
```javascript
{
  accessorKey: 'isActive',
  header: 'Active Status',
  meta: {
    variant: 'boolean',
    label: 'Is Active',
    inputVariant: 'optional'
  }
}
```
#### 7. Radio Button Group  (`variant: 'radio'`)
```javascript
{
  accessorKey: "preference",
  header: "User Preference",
  meta: {
    variant: "radio",
    inputVariant: "compulsory",
    direction: "vertical", // or "horizontal"
    options: [
      {
        value: "email",
        label: "Email Notifications",
        description: "Receive updates via email"
      },
      {
        value: "sms",
        label: "SMS Notifications", 
        description: "Receive updates via text message"
      },
      {
        value: "none",
        label: "No Notifications",
        description: "Don't receive any notifications"
      }
    ]
  }
}
```

#### 7. Multiple Checkbox Group  (`variant: 'checkbox'`)
```javascript
{
  accessorKey: "interests",
  header: "Areas of Interest",
  meta: {
    variant: "checkboxGroup",
    inputVariant: "optional",
    direction: "vertical",
    maxSelections: 3, // Optional limit
    options: [
      {
        value: "tech",
        label: "Technology",
        description: "Latest tech trends and updates"
      },
      {
        value: "sports",
        label: "Sports",
        description: "Sports news and events"
      },
      {
        value: "music",
        label: "Music",
        description: "Music releases and concerts"
      }
    ]
  }
}
```

## 🎛️ Props

### AdaptiveLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `"Form"` | Header title of the form |
| `columns` | array | `[]` | Array of column objects defining inputs |
| `initialData` | object | `{}` | Initial form data values |
| `onSave` | function | - | Callback when save button is clicked |
| `onCancel` | function | - | Callback when cancel button is clicked |
| `className` | string | `""` | Additional CSS classes |
| `maxWidth` | string | `"400px"` | Maximum width of the form |
| `maxHeight` | string | `"80vh"` | Maximum height of the form |

### Input Component Props

All input components share these common props:

| Prop | Type | Description |
|------|------|-------------|
| `accessorKey` | string | Unique field identifier |
| `label` | string | Display label for the input |
| `value` | any | Current value of the input |
| `onChange` | function | Change handler function |
| `variant` | string | Field requirement: "optional" or "compulsory" |
| `className` | string | Additional CSS classes |

#### Specific Props

- **NumberInput**: `unit` (string) - Display unit
- **SelectInput**: `options` (array) - Array of {value, label} objects
- **TextareaInput**: `rows` (number), `minHeight` (string)
- **TextInput**: `enableSearch` (boolean), `searchOptions` (array) - Enable search functionality with options list

## 🔄 Data Flow

1. **Column Definition**: Define columns with metadata
2. **Auto-Generation**: AdaptiveLayout reads column metadata
3. **Component Selection**: Chooses appropriate input component based on `variant`
4. **Rendering**: Renders input with proper props
5. **State Management**: Handles form state internally
6. **Callbacks**: Calls `onSave`/`onCancel` with form data

## 🎨 Customization

### Adding New Input Types

1. Create a new component in the components folder:

```jsx
// CustomInput.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";

function CustomInput({ 
  accessorKey, 
  label, 
  value, 
  onChange, 
  variant = "optional",
  customProp 
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={accessorKey} className="text-sm font-medium text-primary flex items-center gap-1">
        {label}
        {variant === "compulsory" && (
          <Sparkle className="w-3 h-3 text-red-500" />
        )}
      </Label>
      <Input
        id={accessorKey}
        value={value}
        onChange={(e) => onChange(accessorKey, e.target.value)}
        // Custom logic here
      />
    </div>
  );
}

export default CustomInput;
```

2. Import and use in `AdaptiveLayout.jsx`:

```javascript
import CustomInput from "./CustomInput";

// In renderInput function
case 'custom':
  return <CustomInput {...commonProps} customProp={meta.customProp} />;
```

### Modifying Existing Components

Each input component is self-contained in the components folder. Simply edit the component file to customize:

- Styling
- Validation
- Additional props
- Custom behavior
- Required field indicators (red spark icon)

## 📝 Examples

### Search Functionality Example

```javascript
const employeeColumns = [
  {
    accessorKey: 'assignee',
    header: 'Assignee',
    meta: {
      variant: 'text',
      label: 'Task Assignee',
      inputVariant: 'compulsory',
      enableSearch: true,
      searchOptions: [
        { 
          label: 'John Doe', 
          value: 'john.doe@company.com',
          description: 'Senior Developer'
        },
        { 
          label: 'Jane Smith', 
          value: 'jane.smith@company.com',
          description: 'Project Manager'
        },
        { 
          label: 'Mike Johnson', 
          value: 'mike.johnson@company.com',
          description: 'UI/UX Designer'
        }
      ]
    }
  },
  {
    accessorKey: 'department',
    header: 'Department',
    meta: {
      variant: 'text',
      label: 'Department',
      enableSearch: true,
      searchOptions: [
        'Engineering',
        'Marketing', 
        'Sales',
        'Human Resources',
        'Finance'
      ]
    }
  }
];
```

### Complete Form Example

```javascript
const companyColumns = [
  {
    accessorKey: 'name',
    header: 'Company Name',
    meta: { 
      variant: 'text', 
      label: 'Company Name',
      inputVariant: 'compulsory' // Required field with red spark
    }
  },
  {
    accessorKey: 'website',
    header: 'Website',
    meta: { 
      variant: 'text', 
      label: 'Website URL',
      inputVariant: 'optional' // Optional field (default)
    }
  },
  {
    accessorKey: 'employees',
    header: 'Employees',
    meta: { 
      variant: 'number', 
      label: 'Number of Employees', 
      unit: 'people',
      inputVariant: 'compulsory'
    }
  },
  {
    accessorKey: 'industry',
    header: 'Industry',
    meta: {
      variant: 'select',
      label: 'Industry',
      inputVariant: 'compulsory',
      options: [
        { value: 'tech', label: 'Technology' },
        { value: 'finance', label: 'Finance' },
        { value: 'retail', label: 'Retail' }
      ]
    }
  },
  {
    accessorKey: 'founded',
    header: 'Founded Date',
    meta: { 
      variant: 'date', 
      label: 'Founded Date',
      inputVariant: 'optional'
    }
  },
  {
    accessorKey: 'description',
    header: 'Description',
    meta: { 
      variant: 'textarea', 
      label: 'Company Description',
      inputVariant: 'optional'
    }
  },
  {
    accessorKey: 'isPublic',
    header: 'Public Company',
    meta: { 
      variant: 'boolean', 
      label: 'Is Public Company',
      inputVariant: 'optional'
    }
  }
];

const initialData = {
  name: '',
  website: '',
  employees: '',
  industry: '',
  founded: '',
  description: '',
  isPublic: false
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Input not showing**: Check that `accessorKey` and `meta.variant` are defined
2. **Select options not showing**: Ensure `meta.options` is an array with `value` and `label` properties
3. **Form not saving**: Verify `onSave` callback is defined and `accessorKey` matches your data structure

### Filtering Logic

The component automatically filters out:
- Columns without `meta` property
- Columns without `accessorKey`
- Columns with `id` of 'select' or 'actions'
- Columns with `meta.variant` of 'display'

## 🤝 Contributing

To add new features or modify existing ones:

1. Individual input components are in `inputs/` folder
2. Main logic is in `AdaptiveLayout.jsx`
3. Export new components in `inputs/index.js`
4. Update this README with new usage examples

---

*This component provides a flexible foundation for auto-generating forms. Customize individual input components as needed for your specific use case.*
