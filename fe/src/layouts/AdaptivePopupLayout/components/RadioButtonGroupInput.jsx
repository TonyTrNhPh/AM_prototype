import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";
import { useState } from "react";

function RadioButtonGroupInput({ 
  accessorKey, 
  label, 
  value, 
  onChange, 
  variant = "optional", // "optional" or "compulsory"
  options = [], // Array of { value, label, description } objects
  className = "",
  direction = "vertical" // "vertical" or "horizontal"
}) {
  const handleOptionChange = (optionValue) => {
    onChange(accessorKey, optionValue);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="flex items-center gap-1 text-sm font-medium text-primary">
        {label}
        {variant === "compulsory" && (
          <Sparkle className="w-3 h-3 text-red-500" />
        )}
      </Label>
      
      <div className={`space-y-3 ${direction === "horizontal" ? "flex flex-wrap gap-4 space-y-0" : ""}`}>
        {options.map((option, index) => (
          <div key={option.value || index} className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                id={`${accessorKey}-${option.value || index}`}
                name={accessorKey}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={() => handleOptionChange(option.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label 
                htmlFor={`${accessorKey}-${option.value || index}`}
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                {option.label || option.value}
              </label>
              {option.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioButtonGroupInput;
