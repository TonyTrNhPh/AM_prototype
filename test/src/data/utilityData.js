// User Profile Menu Items Registry
export const userProfileMenuItems = [
  { 
    id: 'profile', 
    label: 'Hồ sơ cá nhân', 
    icon: 'user-round',
    type: 'default'
  },
  { 
    id: 'settings', 
    label: 'Cài đặt', 
    icon: 'settings',
    type: 'default'
  },
  { 
    id: 'help', 
    label: 'Trợ giúp', 
    icon: 'circle-question-mark',
    type: 'default'
  },
  { 
    id: 'logout', 
    label: 'Đăng xuất', 
    icon: 'log-out',
    type: 'danger'
  },
];

// Menu Items Registry - maps user roles to their menu items
export const menuItemsRegistry = {
  'user': userProfileMenuItems,
  'accountant': userProfileMenuItems // Adding the accountant role explicitly
};

// Helper function to get menu items by user role
export const getMenuItemsByRole = (role = 'user') => {
  return menuItemsRegistry[role] || userProfileMenuItems;
};

// Helper function to get menu item by id
export const getMenuItemById = (id, role = 'user') => {
  const menuItems = getMenuItemsByRole(role);
  return menuItems.find(item => item.id === id);
};

export default menuItemsRegistry;
