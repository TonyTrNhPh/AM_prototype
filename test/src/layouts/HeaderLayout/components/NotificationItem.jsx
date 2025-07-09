import { IconHolder, formatTimeAgo, getNotificationType } from "@/config";

function NotificationItem({ notification, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(notification);
    }
  };

  // Get notification type info for icon and styling
  const notificationType = getNotificationType(notification.type || 'info');

  return (
    <div
      onClick={handleClick}
      className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
        !notification.isRead ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex justify-between">
        {/* Left side: Icon + Content */}
        <div className="flex-1 min-w-0">
          {/* Title with icon */}
          <div className="flex items-center mb-1 space-x-2">
            <IconHolder 
              name={notificationType.icon}
              size={16} 
              style={{ color: notificationType.color }}
            />
            <p className={`text-sm font-medium ${
              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
            }`}>
              {notification.title}
            </p>
          </div>
          
          {/* Message aligned with title */}
          <p className="mb-1 text-sm text-gray-600 line-clamp-2">
            {notification.message}
          </p>
          
          {/* Timestamp aligned with title */}
          <p className="text-xs text-gray-400">
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>

        {/* Right side: Unread indicator */}
        <div className="flex-shrink-0 mt-0.5">
          {!notification.isRead && (
            <div className="w-2 h-2 bg-[#B71D21] rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
