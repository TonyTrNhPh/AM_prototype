import { useState } from 'react';
import IconHolder from '../icons/IconHolder';

function MenuItemLv2({ title, iconName, children, isActive = false, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = children && (Array.isArray(children) ? children.length > 0 : true);

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (onClick) {
      // Handle click for items without children
      onClick();
    }
  };

  return (
    <div>
      <button
        onClick={toggleExpand}
        className={`flex items-center justify-between w-full px-3 py-2  font-bold rounded-lg group transition-colors duration-200 text-sm ${
          !hasChildren && isActive 
            ? 'bg-[#FFE4E4] text-[#B71D21]' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center">
          <IconHolder 
            name={iconName} 
            size={20} 
            className={`mr-3 transition-colors duration-200 ${
              !hasChildren && isActive 
                ? 'text-[#B71D21]' 
                : 'text-gray-500'
            }`} 
          />
          <span>{title}</span>
        </div>
        {hasChildren && (
          <IconHolder 
            name="chevron-right" 
            size={16} 
            className={`text-gray-400 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-90' : ''}`}
          />
        )}
      </button>
      
      {hasChildren && (
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-1 space-y-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuItemLv2;