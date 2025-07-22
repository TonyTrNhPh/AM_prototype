import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconHolder, MenuItem, getMenuItemsByRole} from "@/config";

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center h-auto px-3 py-2 text-sm transition-colors duration-200 bg-transparent hover-bg-secondary"
        >
          {/* Avatar */}
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-sm font-semibold text-white bg-brand-accent">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          
          {/* User Info - Hidden on small screens */}
          <div className="hidden mr-2 text-left md:block">
            <div className="font-semibold text-primary">
              {user.name}
            </div>
            <div className="text-xs text-secondary">
              {user.role}
            </div>
          </div>
          
          {/* Dropdown Arrow - Hidden on small screens */}
          <IconHolder 
            name="chevron-down" 
            size={16} 
            className={`transition-transform duration-200 hidden md:block text-disabled ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64 p-0" align="end">
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-main">
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback className="text-sm font-semibold text-white bg-brand-accent">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-primary">
                {user.name}
              </div>
              <div className="text-sm text-secondary">
                {user.role}
              </div>
              <div className="text-xs text-disabled">
                {user.email}
              </div>
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
      </PopoverContent>
    </Popover>
  );
}

export default UserProfileDropdown;
