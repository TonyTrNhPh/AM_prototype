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
          className="flex items-center h-auto px-3 py-2 text-sm transition-colors duration-200"
          style={{
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--background-secondary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          {/* Avatar */}
          <Avatar className="w-8 h-8">
            <AvatarFallback 
              className="text-white text-sm font-semibold"
              style={{ backgroundColor: 'var(--brand-accent)' }}
            >
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          
          {/* User Info */}
          <div className="mr-2 text-left">
            <div 
              className="font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {user.name}
            </div>
            <div 
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              {user.role}
            </div>
          </div>
          
          {/* Dropdown Arrow */}
          <IconHolder 
            name="chevron-down" 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--text-disabled)' }}
          />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64 p-0" align="end">
        {/* User Info Header */}
        <div 
          className="px-4 py-3 border-b"
          style={{ borderBottomColor: 'var(--border)' }}
        >
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarFallback 
                className="text-white text-sm font-semibold"
                style={{ backgroundColor: 'var(--brand-accent)' }}
              >
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div 
                className="font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {user.name}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {user.role}
              </div>
              <div 
                className="text-xs"
                style={{ color: 'var(--text-disabled)' }}
              >
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
