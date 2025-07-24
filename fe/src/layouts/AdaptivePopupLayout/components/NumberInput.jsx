import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";

function NumberInput({ 
  accessorKey, 
  label, 
  value, 
  onChange, 
  placeholder,
  unit,
  variant = "optional", // "optional" or "compulsory"
  className = "" 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={accessorKey} className="text-sm font-medium text-primary flex items-center gap-1">
        {label} {unit && <span className="text-xs text-secondary">({unit})</span>}
        {variant === "compulsory" && (
          <Sparkle className="w-3 h-3 text-red-500" />
        )}
      </Label>
      <Input
        id={accessorKey}
        type="number"
        value={value}
        onChange={(e) => onChange(accessorKey, e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className="w-full"
      />
    </div>
  );
}

export default NumberInput;
