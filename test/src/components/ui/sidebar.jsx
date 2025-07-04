import { Card } from "./card";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { cn } from "../../lib/utils";

function Sidebar({ 
  children, 
  className,
  showDividers = true,
  ...props 
}) {
  return (
    <Card 
      className={cn(
        "flex flex-col items-start w-full h-full p-6 bg-white max-w-2xs rounded-2xl gap-6",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

function SidebarHeader({ children, className, ...props }) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  );
}

function SidebarContent({ children, className, ...props }) {
  return (
    <ScrollArea className={cn("w-full flex-1 overflow-y-hidden scrollbar-hover", className)} {...props}>
      {children}
    </ScrollArea>
  );
}

function SidebarSection({ children, className, showSeparator = true, ...props }) {
  return (
    <>
      {showSeparator && <Separator className="w-full" />}
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Section = SidebarSection;

export { Sidebar, SidebarHeader, SidebarContent, SidebarSection };
export default Sidebar;
