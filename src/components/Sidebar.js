import React from "react";
import { HomeIcon, UserIcon, DocumentTextIcon, ChartBarIcon, ShoppingBagIcon, ClipboardListIcon, CogIcon } from "@heroicons/react/outline";

const Sidebar = ({ onViewChange }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen py-4">
      <h2 className="text-2xl mb-6 text-center">Quản Lý</h2>
      <ul>
        <li>
          <button
            onClick={() => onViewChange("home")}
            className="flex items-center py-3 px-4 hover:bg-gray-700 rounded"
          >
            <HomeIcon className="h-5 w-5 mr-3" />
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => onViewChange("employee")}
            className="flex items-center py-3 px-4 hover:bg-gray-700 rounded"
          >
            <UserIcon className="h-5 w-5 mr-3" />
            Nhân Viên
          </button>
        </li>
        <li>
          <button
            onClick={() => onViewChange("invoice")}
            className="flex items-center py-3 px-4 hover:bg-gray-700 rounded"
          >
            <DocumentTextIcon className="h-5 w-5 mr-3" />
            Hóa Đơn
          </button>
        </li>
        <li>
          <button
            onClick={() => onViewChange("revenue")}
            className="flex items-center py-3 px-4 hover:bg-gray-700 rounded"
          >
            <ChartBarIcon className="h-5 w-5 mr-3" />
            Doanh Thu
          </button>
        </li>
        <li>
          <button
            onClick={() => onViewChange("menuEditor")}
            className="flex items-center py-3 px-4 hover:bg-gray-700 rounded"
          >
            <ClipboardListIcon className="h-5 w-5 mr-3" />
            Chỉnh sửa menu
          </button>
        </li>
        <li>
          <button
            onClick={() => onViewChange("inventory")}
            className="flex items-center py-3 px-4 hover:bg-gray-700 rounded"
          >
            <ClipboardListIcon className="h-5 w-5 mr-3" />
            Kho hàng
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
