import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";

function TextareaInput({ 
  accessorKey, 
  label, 
  value, 
  onChange, 
  placeholder,
  rows = 3,
  minHeight = "80px",
  variant = "optional", // "optional" or "compulsory"
  className = "" 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={accessorKey} className="text-sm font-medium text-primary flex items-center gap-1">
        {label}
        {variant === "compulsory" && (
          <Sparkle className="w-3 h-3 text-red-500" />
        )}
      </Label>
      <Textarea
        id={accessorKey}
        value={value}
        onChange={(e) => onChange(accessorKey, e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={`w-full min-h-[${minHeight}]`}
        rows={rows}
      />
    </div>
  );
}

export default TextareaInput;
