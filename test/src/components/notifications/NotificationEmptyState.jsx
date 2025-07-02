import { IconHolder } from "../icons";

function NotificationEmptyState({ category, showUnreadOnly }) {
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
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <IconHolder 
          name="bell" 
          size={24} 
          className="text-gray-400"
        />
      </div>
      
      <h4 className="text-sm font-medium text-gray-900 text-center mb-2">
        {title}
      </h4>
      
      <p className="text-sm text-gray-500 text-center max-w-xs">
        {message}
      </p>
    </div>
  );
}

export default NotificationEmptyState;
