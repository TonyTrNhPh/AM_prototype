import { cn } from "../../../lib/utils";

function MenuItemLv1({ title, children, className, ...props }) {
  return (
    <div className={cn("w-full mb-3", className)} {...props}>
      <h3 className="px-2 mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

export default MenuItemLv1;