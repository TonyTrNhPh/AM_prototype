// Export all notification components and utilities
export { default as NotificationDropdown } from './NotificationDropdown';
export { default as NotificationTabs } from './NotificationTabs';
export { default as NotificationItem } from './NotificationItem';
export { default as NotificationEmptyState } from './NotificationEmptyState';

export { 
  default as notificationCategories,
  sampleNotifications,
  getNotificationsByCategory,
  getUnreadCount,
  getUnreadCountByCategory,
  markAsRead,
  markAllAsRead,
  formatTimeAgo
} from './NotificationRegistry';

// Re-export for easier imports
export * from './NotificationRegistry';
