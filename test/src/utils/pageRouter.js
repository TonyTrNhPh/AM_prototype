/**
 * Page Router Utility
 * 
 * Centralized routing configuration for mapping menu IDs to page components
 * This makes it easy to add new pages and maintain the routing logic
 */

// Import all your pages here
import UnKnownPage from "../pages/unknown/page";
import DashboardPage from "../pages/dashboard/page";
import UserManagementPage from "../pages/user-management/page";
// TODO: Import other pages as you create them
// import NewsPage from "../pages/news/page";
// import CompanyManagementPage from "../pages/company-management/page";

/**
 * Page routing configuration
 * Maps menu item IDs to their corresponding page components
 */
export const pageRoutes = {
  // Tổng quan section
  '11': DashboardPage, // Bảng điều khiển
  '12': UnKnownPage,   // Tin tức - TODO: Replace with NewsPage
  
  // Quản lý dữ liệu section - Dữ liệu cơ bản
  '211': UnKnownPage,         // Quản lý công ty - TODO: Replace with CompanyManagementPage
  '212': UserManagementPage,  // Quản lý người dùng
  '213': UnKnownPage,         // Quản lý khách hàng - TODO: Replace with CustomerManagementPage
  '214': UnKnownPage,         // Quản lý ngân hàng - TODO: Replace with BankManagementPage
  '215': UnKnownPage,         // Quản lý tài khoản - TODO: Replace with AccountManagementPage
  '216': UnKnownPage,         // Quản lý tồn kho - TODO: Replace with InventoryManagementPage
  '217': UnKnownPage,         // Quản lý hợp đồng - TODO: Replace with ContractManagementPage
  
  // Add more routes as needed...
  // You can also use nested objects for better organization:
  // section1: {
  //   subsection1: {
  //     '211': CompanyManagementPage,
  //     '212': UserManagementPage,
  //   }
  // }
};

/**
 * Get page component for a given menu item
 * @param {Object} menuItem - The selected menu item
 * @returns {React.Component} Page component to render
 */
export const getPageComponent = (menuItem) => {
  if (!menuItem || !menuItem.id) {
    return UnKnownPage;
  }

  // Get the page component from the routes
  const PageComponent = pageRoutes[menuItem.id];
  
  // Return the component or fallback to UnKnownPage
  return PageComponent || UnKnownPage;
};

/**
 * Check if a page exists for a given menu ID
 * @param {string} menuId - Menu item ID
 * @returns {boolean} Whether a page exists
 */
export const hasPage = (menuId) => {
  return menuId && pageRoutes[menuId] && pageRoutes[menuId] !== UnKnownPage;
};

/**
 * Get all available page routes
 * Useful for debugging or administrative purposes
 * @returns {Object} All available routes
 */
export const getAllRoutes = () => {
  return { ...pageRoutes };
};
