import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkle, Search } from "lucide-react";
import { useState } from "react";

function TextInput({ 
  accessorKey, 
  label, 
  value, 
  onChange, 
  placeholder,
  variant = "optional", // "optional" or "compulsory"
  enableSearch = false, // Boolean to enable search functionality
  searchOptions = [], // Array of options for search
  onSearchSelect, // Callback when search option is selected
  className = "" 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Filter search options based on query
  const filteredOptions = searchOptions.filter(option =>
    option.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.value?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (option) => {
    if (onSearchSelect) {
      onSearchSelect(accessorKey, option);
    } else {
      onChange(accessorKey, option.value || option.label || option);
    }
    setIsPopoverOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={accessorKey} className="flex items-center gap-1 text-sm font-medium text-primary">
        {label}
        {variant === "compulsory" && (
          <Sparkle className="w-3 h-3 text-red-500" />
        )}
      </Label>
      
      <div className="relative flex items-center">
        <Input
          id={accessorKey}
          value={value}
          onChange={(e) => onChange(accessorKey, e.target.value)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          className={`w-full ${enableSearch ? 'pr-10' : ''}`}
        />
        
        {enableSearch && (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 h-7 w-7 hover:bg-accent"
              >
                <Search className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3">
                <Input
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-3"
                />
                
                <div className="max-h-60 overflow-auto">
                  {filteredOptions.length > 0 ? (
                    <div className="space-y-1">
                      {filteredOptions.map((option, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start h-auto p-2 text-left"
                          onClick={() => handleSearchSelect(option)}
                        >
                          <div>
                            <div className="font-medium">
                              {option.label || option.value || option}
                            </div>
                            {option.description && (
                              <div className="text-xs text-muted-foreground">
                                {option.description}
                              </div>
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground py-4">
                      {searchQuery ? "No options found" : "No options available"}
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default TextInput;
