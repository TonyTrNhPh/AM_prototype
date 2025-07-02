import { useState } from "react";
import { 
  IconHolder,
  NotificationDropdown,
  NotificationTabs,
  NotificationItem,
  NotificationEmptyState,
  notificationCategories,
  sampleNotifications,
  getNotificationsByCategory,
  getUnreadCount,
  getUnreadCountByCategory,
  markAsRead,
  markAllAsRead
} from "../config";

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Get notifications for current category and filter
  const getFilteredNotifications = () => {
    let filtered = getNotificationsByCategory(activeCategory, notifications);
    if (showUnreadOnly) {
      filtered = filtered.filter(notification => !notification.isRead);
    }
    return filtered;
  };

  const handleNotificationClick = (notification) => {
    // Mark as read when clicked
    if (!notification.isRead) {
      setNotifications(markAsRead(notification.id, notifications));
    }
    
    // Handle navigation or action
    console.log('Notification clicked:', notification);
    
    // You can add navigation logic here
    if (notification.actionUrl) {
      // window.location.href = notification.actionUrl;
      console.log('Navigate to:', notification.actionUrl);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(markAllAsRead(notifications));
  };

  const handleSettings = () => {
    console.log('Open notification settings');
    setIsOpen(false);
  };

  const getUnreadCountForCategory = (categoryId) => {
    return getUnreadCountByCategory(categoryId, notifications);
  };

  const totalUnreadCount = getUnreadCount(notifications);
  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 transition-colors duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100"
      >
        <IconHolder 
          name="bell" 
          size={20} 
          className="text-current" 
        />
        {totalUnreadCount > 0 && (
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute right-0 z-20 mt-2 top-14">
            <NotificationDropdown
              showUnreadOnly={showUnreadOnly}
              onToggleUnreadOnly={setShowUnreadOnly}
              onMarkAllRead={handleMarkAllRead}
              onSettings={handleSettings}
            >
              {/* Tabs */}
              <NotificationTabs
                categories={notificationCategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                getUnreadCount={getUnreadCountForCategory}
              />

              {/* Notification List */}
              <div className="p-2 overflow-y-auto max-h-96 scrollbar-hide">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClick={handleNotificationClick}
                    />
                  ))
                ) : (
                  <NotificationEmptyState 
                    category={activeCategory}
                    showUnreadOnly={showUnreadOnly}
                  />
                )}
              </div>
            </NotificationDropdown>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationBell;
