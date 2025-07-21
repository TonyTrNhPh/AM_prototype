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
      className="px-4 py-3 cursor-pointer transition-colors duration-200"
      style={{
        borderBottom: '1px solid var(--border)',
        backgroundColor: !notification.isRead ? 'var(--brand-accent-light)' : 'transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--background-secondary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = !notification.isRead ? 'var(--brand-accent-light)' : 'transparent';
      }}
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
            <p 
              className="text-sm font-medium"
              style={{ 
                color: !notification.isRead ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}
            >
              {notification.title}
            </p>
          </div>
          
          {/* Message aligned with title */}
          <p 
            className="mb-1 text-sm line-clamp-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {notification.message}
          </p>
          
          {/* Timestamp aligned with title */}
          <p 
            className="text-xs"
            style={{ color: 'var(--text-disabled)' }}
          >
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>

        {/* Right side: Unread indicator */}
        <div className="flex-shrink-0 mt-0.5">
          {!notification.isRead && (
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--brand-accent)' }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
