import React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

function ModalBoxLayout({ 
  isOpen = false, 
  onClose, 
  children, 
  title,
  className,
  ...props 
}) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  // Handle escape key press
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    if (isOpen || isAnimating) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (!isOpen && !isAnimating) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, isAnimating, onClose]);

  // Handle modal state changes
  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimating(true);
    } else if (shouldRender) {
      setIsAnimating(true);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimating(false);
        document.body.style.overflow = "unset";
      }, 500); // Match the duration-500 class
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        data-state={isOpen ? "open" : "closed"} 
        data-slot="sheet-overlay" 
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-in-out",
          "data-[state=closed]:animate-out data-[state=open]:animate-in",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        data-aria-hidden="true" 
        aria-hidden="true" 
        style={{ pointerEvents: "auto" }}
        onClick={onClose}
      />
      
      {/* Modal box */}
      <div 
        role="dialog" 
        data-state={isOpen ? "open" : "closed"} 
        data-slot="sheet-content" 
        className={cn(
          "fixed z-50 bg-background shadow-lg transition-transform ease-in-out",
          "data-[state=closed]:animate-out data-[state=open]:animate-in",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500", 
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          "inset-y-0 right-0 h-full w-3/4 border-l flex flex-col gap-6 sm:max-w-md",
          "rounded-lg",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
        tabIndex="-1" 
        style={{ pointerEvents: "auto" }}
        {...props}
      >
        {/* Header */}
        {title && (
          <div data-slot="sheet-header" className="flex flex-col gap-1.5 p-4 text-left">
            <h2 data-slot="sheet-title" className="font-semibold text-foreground">
              {title}
            </h2>
          </div>
        )}
        
        {/* Content area */}
        <div className="flex-1 px-4 overflow-auto">
          {children}
        </div>
        
        {/* Close button */}
        <button 
          type="button" 
          className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          onClick={onClose}
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
}

export default ModalBoxLayout;
