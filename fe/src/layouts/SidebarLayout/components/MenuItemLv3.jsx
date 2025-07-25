import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function MenuItemLv3({
  title,
  onClick,
  isActive = false,
  className,
  ...props
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={onClick}
            className={cn(
              "flex items-center w-full px-4.5 py-2 text-sm rounded-lg group transition-colors duration-200 h-auto justify-start",
              isActive
                ? "bg-[#FFE4E4] text-[#B71D21] hover:bg-[#FFE4E4] hover:text-[#B71D21]"
                : "hover:bg-gray-100 hover:text-gray-900 text-gray-500",
              className
            )}
            {...props}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full mr-3 transition-colors duration-200",
                isActive ? "bg-[#B71D21]" : "bg-gray-300"
              )}
            ></div>
            <div className="flex items-center w-34">
              <span className="overflow-hidden font-bold text-ellipsis whitespace-nowrap">
                {title}
              </span>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default MenuItemLv3;
