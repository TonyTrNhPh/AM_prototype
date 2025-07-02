import { useState } from "react";
import { IconHolder } from "./icons";
import { MenuItem, getMenuItemsByRole } from "./menuItems";

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  
  const user = {
    name: "Nguyễn Thị Lan",
    role: "Kế toán trưởng",
    avatar: "NL", // Initials for avatar
    email: "lan.nguyen@company.com",
    userRole: "accountant" // Role for menu items registry
  };

  // Get menu items based on user role
  const menuItems = getMenuItemsByRole(user.userRole);

  const handleMenuClick = (itemId) => {
    console.log('Menu clicked:', itemId);
    setIsOpen(false);
    
    if (itemId === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm transition-colors duration-200 rounded-lg hover:bg-gray-100"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-[#B71D21] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
          {user.avatar}
        </div>
        
        {/* User Info */}
        <div className="mr-2 text-left">
          <div className="font-semibold text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-500">{user.role}</div>
        </div>
        
        {/* Dropdown Arrow */}
        <IconHolder 
          name="chevron-left" 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-270'}`}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 z-20 w-64 bg-white border border-gray-200 rounded-lg shadow-lg top-18">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#B71D21] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.role}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onClick={handleMenuClick}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfileDropdown;
