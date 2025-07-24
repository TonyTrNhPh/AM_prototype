import { useState } from "react";
import { CalendarIcon, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function formatDate(date) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

function DateInput({ 
  accessorKey, 
  label, 
  value, 
  onChange, 
  placeholder,
  variant = "optional", // "optional" or "compulsory"
  className = "" 
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : undefined);
  const [month, setMonth] = useState(date);
  const [displayValue, setDisplayValue] = useState(value ? formatDate(new Date(value)) : "");

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setMonth(selectedDate);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      setDisplayValue(formatDate(selectedDate));
      onChange(accessorKey, formattedDate);
    } else {
      setDisplayValue("");
      onChange(accessorKey, "");
    }
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);
    
    const parsedDate = new Date(inputValue);
    if (isValidDate(parsedDate)) {
      setDate(parsedDate);
      setMonth(parsedDate);
      onChange(accessorKey, parsedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={accessorKey} className="flex items-center gap-1 text-sm font-medium text-primary">
        {label}
        {variant === "compulsory" && (
          <Sparkle className="w-3 h-3 text-red-500" />
        )}
      </Label>
      
      <div className="relative">
        <Input
          id={accessorKey}
          value={displayValue}
          placeholder={placeholder || "Select date"}
          className="pr-10 w-full"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute -translate-y-1/2 top-1/2 right-2 h-6 w-6 p-0"
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          
          <PopoverContent
            className="w-auto p-0 overflow-hidden"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default DateInput;