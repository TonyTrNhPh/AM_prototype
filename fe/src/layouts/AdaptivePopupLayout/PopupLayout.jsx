import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function PopupLayout({ 
  trigger, 
  children, 
  open, 
  onOpenChange, 
  align = "center",
  side = "bottom",
  className = "",
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isControlled = open !== undefined;
  const popoverOpen = isControlled ? open : isOpen;
  const handleOpenChange = isControlled ? onOpenChange : setIsOpen;

  return (
    <>
      {/* Gradient Overlay - only shown when popover is open */}
      {popoverOpen && (
        <div 
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(128, 128, 128, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)'
          }}
        />
      )}

      <Popover open={popoverOpen} onOpenChange={handleOpenChange} {...props}>
        <PopoverTrigger asChild>
          {trigger || (
            <Button variant="outline">Open Popup</Button>
          )}
        </PopoverTrigger>
        
        <PopoverContent 
          className={`z-50 bg-background-primary border-main shadow-lg ${className}`}
          align={align}
          side={side}
        >
          {children || (
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Popup Content
              </h3>
              <p className="text-secondary">
                This is a blank popup layout. Add your content here.
              </p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default PopupLayout;