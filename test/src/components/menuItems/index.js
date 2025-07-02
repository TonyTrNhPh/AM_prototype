// Export all menu item components and utilities
export { default as MenuItem } from './MenuItem';
export { 
  default as menuItemsRegistry,
  userProfileMenuItems,
  adminMenuItems,
  managerMenuItems,
  getMenuItemsByRole,
  getMenuItemById
} from './MenuItemsRegistry';

// Re-export for easier imports
export * from './MenuItemsRegistry';
