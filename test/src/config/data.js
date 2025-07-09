// Export Data/Registries
export { default as iconRegistry } from '@/data/iconData';

export { 
  default as languagesRegistry,
  availableLanguages,
  allLanguages,
  getLanguageByCode,
  getAvailableLanguages,
  getAllLanguages,
  isLanguageAvailable,
  getDefaultLanguage,
  validateLanguageCode
} from '@/data/languageData';

export { 
  default as menuItemsRegistry,
  userProfileMenuItems,
  getMenuItemsByRole,
  getMenuItemById
} from '@/data/utilityData';

export { 
  default as notificationCategories,
  sampleNotifications,
  getNotificationsByCategory,
  getUnreadCount,
  getUnreadCountByCategory,
  markAsRead,
  markAllAsRead,
  formatTimeAgo,
  getNotificationType
} from '@/data/notificationData';

export { default as menuData } from '@/data/menuData';
