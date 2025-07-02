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

// Admin Menu Items (example for different user roles)
export const adminMenuItems = [
  { 
    id: 'profile', 
    label: 'Hồ sơ cá nhân', 
    icon: 'user',
    type: 'default'
  },
  { 
    id: 'admin', 
    label: 'Quản trị hệ thống', 
    icon: 'shield',
    type: 'default'
  },
  { 
    id: 'users', 
    label: 'Quản lý người dùng', 
    icon: 'users',
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
    icon: 'help-circle',
    type: 'default'
  },
  { 
    id: 'logout', 
    label: 'Đăng xuất', 
    icon: 'log-out',
    type: 'danger'
  },
];

// Manager Menu Items (example for different user roles)
export const managerMenuItems = [
  { 
    id: 'profile', 
    label: 'Hồ sơ cá nhân', 
    icon: 'user',
    type: 'default'
  },
  { 
    id: 'dashboard', 
    label: 'Bảng điều khiển', 
    icon: 'layout-dashboard',
    type: 'default'
  },
  { 
    id: 'reports', 
    label: 'Báo cáo', 
    icon: 'file-text',
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
    icon: 'help-circle',
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
  'admin': adminMenuItems,
  'manager': managerMenuItems,
  'accountant': userProfileMenuItems, // Kế toán trưởng uses default user menu
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
