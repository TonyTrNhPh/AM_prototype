import { IconHolder } from "@/config";
import React from "react";

function UnknownPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-6 py-3 bg-white border-b border-gray-200 rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
        <IconHolder
          name="wrench"
          size={40}
          className="text-gray-500"
        />
      </div>
      <h4 className="mb-2 text-sm font-medium text-center text-gray-900">
        Tính năng đang được phát triển
      </h4>
      <p className="max-w-xs text-sm text-center text-gray-500">
        Chúng tôi đang nỗ lực hoàn thiện tính năng này. Vui lòng quay lại sau để
        trải nghiệm.
      </p>
    </div>
  );
}

export default UnknownPage;
