import { IconHolder } from "../icons";

function NotificationTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  getUnreadCount 
}) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex justify-between px-4 space-x-4 overflow-x-scroll w-xl scrollbar-hide">
        {Object.values(categories).map((category) => {
          const unreadCount = getUnreadCount(category.id);
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                isActive
                  ? 'border-[#B71D21] text-[#B71D21]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{category.label}</span>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#B71D21] rounded-full">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationTabs;
