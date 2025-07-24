import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import IconHolder from "@/components/ui/iconholder";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import TextareaInput from "./TextareaInput";
import BooleanInput from "./BooleanInput";
import RadioButtonGroupInput from "./RadioButtonGroupInput";
import MultipleCheckboxGroupInput from "./MultipleCheckboxGroupInput";

function AdaptiveLayout({ 
  title = "Form",
  columns = [],
  initialData = {},
  onSave,
  onCancel,
  className = "",
  minWidth = "40vw",
  maxHeight = "80vh"
}) {
  const [formData, setFormData] = useState(initialData);

  // Filter out non-input columns (like select, actions, etc.)
  const inputColumns = columns.filter(col => 
    col.meta && 
    col.accessorKey && 
    !['select', 'actions'].includes(col.id) &&
    col.meta.variant !== 'display'
  );

  // Update form data
  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Generate input component based on column meta
  const renderInput = (column) => {
    const { accessorKey, meta = {}, header } = column;
    const { variant, options, unit, inputVariant = "optional", enableSearch = false, searchOptions = [] } = meta;
    const value = formData[accessorKey] || '';

    const label = meta.label || header || accessorKey;

    // Common props for all inputs
    const commonProps = {
      accessorKey,
      label,
      value,
      onChange: handleInputChange,
      variant: inputVariant // "optional" or "compulsory"
    };

    switch (variant) {
      case 'text':
        return <TextInput 
          key={accessorKey}
          {...commonProps} 
          enableSearch={enableSearch}
          searchOptions={searchOptions}
        />;

      case 'select':
        return <SelectInput 
          key={accessorKey}
          {...commonProps} 
          options={options} 
        />;

      case 'number':
        return <NumberInput 
          key={accessorKey}
          {...commonProps} 
          unit={unit} 
        />;

      case 'date':
        return <DateInput 
          key={accessorKey}
          {...commonProps} 
        />;

      case 'textarea':
        return <TextareaInput 
          key={accessorKey}
          {...commonProps} 
        />;

      case 'boolean':
        return <BooleanInput 
          key={accessorKey}
          {...commonProps} 
        />;

      case 'radio':
      case 'radioGroup':
        return <RadioButtonGroupInput 
          key={accessorKey}
          {...commonProps} 
          options={options}
          direction={meta.direction || "vertical"}
        />;

      case 'checkbox':
      case 'checkboxGroup':
      case 'multipleCheckbox':
        return <MultipleCheckboxGroupInput 
          key={accessorKey}
          {...commonProps} 
          options={options}
          direction={meta.direction || "vertical"}
          maxSelections={meta.maxSelections}
        />;

      default:
        // Default to text input for unknown variants
        return <TextInput 
          key={accessorKey}
          {...commonProps} 
          enableSearch={enableSearch}
          searchOptions={searchOptions}
        />;
    }
  };

  // Calculate dynamic height based on number of inputs
  const calculateHeight = () => {
    const baseHeight = 200; // Header + footer + padding
    const inputHeight = 80; // Approximate height per input
    const totalInputHeight = inputColumns.length * inputHeight;
    const calculatedHeight = Math.min(totalInputHeight + baseHeight, window.innerHeight * 0.8);
    return `${calculatedHeight}px`;
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
      // Show success toast notification
      toast.success("Data saved successfully!", {
        description: "Your changes have been saved.",
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div 
      className={`bg-background-primary border-main rounded-lg shadow-lg overflow-hidden ${className}`}
      style={{ 
        minWidth,
        maxHeight,
        width: '100%',
        height: calculateHeight()
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-main">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCancel}
          className="w-6 h-6 p-0 hover:bg-accent"
        >
          <IconHolder name="x" size={16} />
        </Button>
      </div>

      {/* Body - Scrollable */}
      <ScrollArea className="flex-1" style={{ height: `calc(${calculateHeight()} - 140px)` }}>
        <div className="p-4 space-y-4">
          {inputColumns.map(column => renderInput(column))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 p-4 border-t border-main bg-background-secondary/50">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default">
              Save
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Save</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to save these changes? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSave}>
                Save Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default AdaptiveLayout;
