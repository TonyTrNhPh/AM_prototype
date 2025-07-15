import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  IconHolder,
  NotificationTabs,
  NotificationItem,
  notificationCategories,
  sampleNotifications,
  getNotificationsByCategory,
  getUnreadCount,
  getUnreadCountByCategory,
  markAsRead,
  markAllAsRead
} from "@/config";

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

  // Inline NotificationEmptyState component
  const NotificationEmptyState = ({ category, showUnreadOnly }) => {
    const getEmptyMessage = () => {
      if (showUnreadOnly) {
        return {
          title: "Không có thông báo chưa đọc",
          message: "Tất cả thông báo đã được đọc"
        };
      }

      switch (category) {
        case 'posts':
          return {
            title: "Không có tin đăng mới",
            message: "Bạn sẽ nhận được thông báo khi có tin đăng mới"
          };
        case 'finance':
          return {
            title: "Không có thông báo tài chính",
            message: "Bạn sẽ nhận được thông báo về thanh toán và hóa đơn"
          };
        case 'promotions':
          return {
            title: "Không có khuyến mãi mới",
            message: "Bạn sẽ nhận được thông báo về các chương trình khuyến mãi"
          };
        case 'more':
          return {
            title: "Không có thông báo khác",
            message: "Bạn sẽ nhận được các thông báo hệ thống và cập nhật"
          };
        default:
          return {
            title: "Hiện tại bạn không có thông báo nào",
            message: "Bạn sẽ nhận được thông báo khi có hoạt động mới"
          };
      }
    };

    const { title, message } = getEmptyMessage();

    return (
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
          <IconHolder 
            name="bell" 
            size={24} 
            className="text-gray-400"
          />
        </div>
        
        <h4 className="mb-2 text-sm font-medium text-center text-gray-900">
          {title}
        </h4>
        
        <p className="max-w-xs text-sm text-center text-gray-500">
          {message}
        </p>
      </div>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative w-10 h-10"
        >
          <IconHolder 
            name="bell" 
            size={20} 
            className="text-gray-500" 
          />
          {totalUnreadCount > 0 && (
            <Badge 
              variant="default" 
              className="absolute flex items-center justify-center w-4 h-4 p-0 text-xs -top-1 -right-1"
            >
              {totalUnreadCount > 9 ? '9+' : totalUnreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-96" align="end">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <IconHolder 
              name="bell"
              size={20}
              className="text-gray-900"
            />
            <h3 className="text-sm font-semibold text-gray-900">Thông báo</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Unread toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={showUnreadOnly}
                onCheckedChange={setShowUnreadOnly}
                className="data-[state=checked]:bg-[#B71D21]"
              />
              <span className="text-sm text-gray-600">Chưa đọc</span>
            </div>

            {/* Action buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMarkAllRead}
              className="w-8 h-8"
              title="Đánh dấu tất cả đã đọc"
            >
              <IconHolder name="check" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSettings}
              className="w-8 h-8"
              title="Cài đặt thông báo"
            >
              <IconHolder name="settings" size={16} />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Tabs */}
        <NotificationTabs
          categories={notificationCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          getUnreadCount={getUnreadCountForCategory}
        />

        <Separator />

        {/* Notification List */}
        <ScrollArea className="h-96">
          <div className="p-2">
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
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationBell;
