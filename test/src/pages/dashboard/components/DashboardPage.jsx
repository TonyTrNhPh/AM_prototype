import React from 'react';

/**
 * Dashboard Page Component
 * 
 * Example page showing how to structure your page components
 * Replace this with your actual dashboard implementation
 */
function DashboardPage({ menuItem }) {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bảng điều khiển
        </h1>
        <p className="text-gray-600">
          Tổng quan về hệ thống và các thông tin quan trọng
        </p>
      </div>

      {/* Page Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Tổng số người dùng
          </h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-500 mt-1">+12% so với tháng trước</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Doanh thu
          </h3>
          <p className="text-3xl font-bold text-green-600">₫45,678,900</p>
          <p className="text-sm text-gray-500 mt-1">+8% so với tháng trước</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Đơn hàng mới
          </h3>
          <p className="text-3xl font-bold text-purple-600">89</p>
          <p className="text-sm text-gray-500 mt-1">+3% so với tháng trước</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Hoạt động gần đây
        </h2>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-600">10:30 AM - Người dùng mới đăng ký</p>
          </div>
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-600">09:15 AM - Đơn hàng #12345 được tạo</p>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600">08:45 AM - Cập nhật hệ thống thành công</p>
          </div>
        </div>
      </div>

      {/* Debug Info - Remove in production */}
      {menuItem && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Debug - Menu Item Data:
          </h3>
          <pre className="text-xs text-gray-600">
            {JSON.stringify(menuItem, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
