import { Button } from "@/components/ui/button";
import { useState, useEffect, cloneElement, isValidElement } from "react";

function PopupLayout({
  trigger,
  children,
  open,
  onOpenChange,
  className = "",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isControlled = open !== undefined;
  const popoverOpen = isControlled ? open : isOpen;
  const handleOpenChange = isControlled ? onOpenChange : setIsOpen;

  useEffect(() => {
    if (popoverOpen) {
      setIsAnimating(true);
    }
  }, [popoverOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      handleOpenChange(false);
    }, 300);
  };

  return (
    <>
      {/* Trigger element */}
      <div onClick={() => handleOpenChange(true)}>
        {trigger || <Button variant="outline">Open Popup</Button>}
      </div>

      {/* Gradient Overlay */}
      {popoverOpen && (
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: "linear-gradient(to top, rgba(0,0,0, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%)"
          }}
          onClick={handleClose}
        />
      )}

      {/* Centered Popup Content */}
      {popoverOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out animate-in slide-in-from-bottom-8 fade-in ${
            isAnimating 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-24'
          }`}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {isValidElement(children) 
            ? cloneElement(children, { 
                onCancel: handleClose,
                ...children.props 
              })
            : children || (
                <div className="p-4 rounded-lg shadow-lg bg-background-primary border-main">
                  <h3 className="mb-2 text-lg font-semibold text-primary">
                    Popup Content
                  </h3>
                  <p className="text-secondary">
                    This is a blank popup layout. Add your content here.
                  </p>
                </div>
              )
          }
        </div>
      )}
    </>
  );
}

export default PopupLayout;
