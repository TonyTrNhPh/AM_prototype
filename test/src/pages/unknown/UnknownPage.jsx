import React from "react";

function UnKnownPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-6 py-3 bg-white border-b border-gray-200 rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h4 className="mb-2 text-sm font-medium text-center text-gray-900">
        Trang không tồn tại
      </h4>
      <p className="max-w-xs text-sm text-center text-gray-500">
        Trang bạn đang tìm kiếm không có hoặc đã bị xóa.
      </p>
    </div>
  );
}

export default UnKnownPage;
