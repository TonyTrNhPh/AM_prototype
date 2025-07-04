import { useState } from 'react';
import { IconHolder } from '../../../config';
import { Button } from "../../../components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../components/ui/collapsible";
import { cn } from "../../../lib/utils";

function MenuItemLv2({ title, iconName, children, isActive = false, onClick, className, ...props }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = children && (Array.isArray(children) ? children.length > 0 : true);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {hasChildren ? (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 rounded-lg group transition-colors duration-200 text-sm h-auto",
                "text-gray-700 hover:bg-gray-100 font-normal"
              )}
            >
              <div className="flex items-center">
                <IconHolder 
                  name={iconName} 
                  size={20} 
                  className="mr-3 text-gray-500 transition-colors duration-200" 
                />
                <span className='font-bold'>{title}</span>
              </div>
              <IconHolder 
                name="chevron-right" 
                size={16} 
                className={cn(
                  "text-gray-400 transition-transform duration-300 ease-in-out",
                  isExpanded && "rotate-90"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="transition-all duration-300 ease-in-out">
            <div className="pt-1 space-y-1">
              {children}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Button
          variant="ghost"
          onClick={handleClick}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2 rounded-lg group transition-colors duration-200 text-sm h-auto font-normal",
            !hasChildren && isActive 
              ? 'bg-[#FFE4E4] text-[#B71D21] hover:bg-[#FFE4E4] hover:text-[#B71D21]' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700'
          )}
        >
          <div className="flex items-center">
            <IconHolder 
              name={iconName} 
              size={20} 
              className={cn(
                "mr-3 transition-colors duration-200",
                !hasChildren && isActive 
                  ? 'text-[#B71D21]' 
                  : 'text-gray-500'
              )} 
            />
            <span className='font-bold'>{title}</span>
          </div>
        </Button>
      )}
    </div>
  );
}

export default MenuItemLv2;