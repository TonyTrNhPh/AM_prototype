import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import IconHolder from "@/components/ui/iconholder";

function AdaptiveLayout({ 
  title = "Form",
  columns = [],
  initialData = {},
  onSave,
  onCancel,
  className = "",
  maxWidth = "400px",
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
    const { variant, options, unit } = meta;
    const value = formData[accessorKey] || '';

    const label = meta.label || header || accessorKey;

    switch (variant) {
      case 'text':
        return (
          <div key={accessorKey} className="space-y-2">
            <Label htmlFor={accessorKey} className="text-sm font-medium text-primary">
              {label}
            </Label>
            <Input
              id={accessorKey}
              value={value}
              onChange={(e) => handleInputChange(accessorKey, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full"
            />
          </div>
        );

      case 'select':
        return (
          <div key={accessorKey} className="space-y-2">
            <Label htmlFor={accessorKey} className="text-sm font-medium text-primary">
              {label}
            </Label>
            <Select value={value} onValueChange={(val) => handleInputChange(accessorKey, val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'number':
        return (
          <div key={accessorKey} className="space-y-2">
            <Label htmlFor={accessorKey} className="text-sm font-medium text-primary">
              {label} {unit && <span className="text-xs text-secondary">({unit})</span>}
            </Label>
            <Input
              id={accessorKey}
              type="number"
              value={value}
              onChange={(e) => handleInputChange(accessorKey, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full"
            />
          </div>
        );

      case 'date':
        return (
          <div key={accessorKey} className="space-y-2">
            <Label htmlFor={accessorKey} className="text-sm font-medium text-primary">
              {label}
            </Label>
            <Input
              id={accessorKey}
              type="date"
              value={value}
              onChange={(e) => handleInputChange(accessorKey, e.target.value)}
              className="w-full"
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={accessorKey} className="space-y-2">
            <Label htmlFor={accessorKey} className="text-sm font-medium text-primary">
              {label}
            </Label>
            <Textarea
              id={accessorKey}
              value={value}
              onChange={(e) => handleInputChange(accessorKey, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full min-h-[80px]"
              rows={3}
            />
          </div>
        );

      case 'boolean':
        return (
          <div key={accessorKey} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id={accessorKey}
                checked={value === true || value === 'true'}
                onCheckedChange={(checked) => handleInputChange(accessorKey, checked)}
              />
              <Label htmlFor={accessorKey} className="text-sm font-medium text-primary">
                {label}
              </Label>
            </div>
          </div>
        );

      default:
        // Default to text input for unknown variants
        return (
          <div key={accessorKey} className="space-y-2">
            <Label htmlFor={accessorKey} className="text-sm font-medium text-primary">
              {label}
            </Label>
            <Input
              id={accessorKey}
              value={value}
              onChange={(e) => handleInputChange(accessorKey, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full"
            />
          </div>
        );
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
        maxWidth,
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
          <IconHolder name="x" size="sm" />
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
        <Button variant="default" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default AdaptiveLayout;
