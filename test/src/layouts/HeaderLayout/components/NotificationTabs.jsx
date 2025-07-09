import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

function NotificationTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  getUnreadCount 
}) {
  return (
    <div className="border-b border-gray-200">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex px-4 space-x-1">
          {Object.values(categories).map((category) => {
            const unreadCount = getUnreadCount(category.id);
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex-shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  isActive
                    ? 'border-[#B71D21] text-[#B71D21]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="whitespace-nowrap">{category.label}</span>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="bg-[#B71D21] text-white text-xs px-1.5 py-0.5 h-5 min-w-5">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default NotificationTabs;
