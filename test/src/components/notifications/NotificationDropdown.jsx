import { Icon } from "lucide-react";
import { IconHolder } from "../icons";

function NotificationDropdown({ 
  children, 
  showUnreadOnly, 
  onToggleUnreadOnly, 
  onMarkAllRead,
  onSettings 
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex justify-between gap-4"><IconHolder 
          name="bell"
            size={20}
            className="text-black"
        />
        <h3 className="text-sm font-semibold text-gray-900">Thông báo</h3></div>
        
        <div className="flex items-center space-x-2">
          {/* Unread toggle */}
          <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => onToggleUnreadOnly(e.target.checked)}
              className="sr-only"
            />
            <div className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-200 ${
              showUnreadOnly ? 'bg-[#B71D21]' : 'bg-gray-300'
            }`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                showUnreadOnly ? 'translate-x-4' : 'translate-x-0.5'
              } mt-0.5`} />
            </div>
            <span>Chưa đọc</span>
          </label>

          {/* Mark all as read */}
          <button
            onClick={onMarkAllRead}
            className="p-1 text-gray-400 transition-colors duration-200 hover:text-gray-600"
            title="Đánh dấu tất cả đã đọc"
          >
            <IconHolder name="check" size={16} />
          </button>

          {/* Settings */}
          <button
            onClick={onSettings}
            className="p-1 text-gray-400 transition-colors duration-200 hover:text-gray-600"
            title="Cài đặt thông báo"
          >
            <IconHolder name="settings" size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

export default NotificationDropdown;
