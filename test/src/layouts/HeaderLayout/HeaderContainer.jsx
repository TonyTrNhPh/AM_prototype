import { useState, useEffect } from "react";
import { IconHolder } from "../../config";
import UserProfileDropdown from "./components/UserProfileDropdown";
import LanguageSelector from "./components/LanguageSelector";
import NotificationBell from "./components/NotificationBell";

function HeaderContainer({ currentMenu = null }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(currentMenu);

  // Handle menu changes with animation
  useEffect(() => {
    if (currentMenu !== displayMenu) {
      setIsAnimating(true);
      
      // After fade out, update content and fade in
      setTimeout(() => {
        setDisplayMenu(currentMenu);
        setIsAnimating(false);
      }, 150); // Half of the transition duration
    }
  }, [currentMenu, displayMenu]);

  // Function to get the appropriate icon for current menu
  const getMenuIcon = () => {
    if (!displayMenu) {
      return "layout-dashboard";
    }

    // If menu has parent (MenuLv3), use parent's icon
    if (displayMenu.parent && displayMenu.parent.iconName) {
      return displayMenu.parent.iconName;
    }

    // If menu has its own icon, use it
    if (displayMenu.iconName) {
      return displayMenu.iconName;
    }

    // Default fallback
    return "layout-dashboard";
  };

  // Function to render breadcrumb title based on current menu
  const renderMenuTitle = () => {
    if (!displayMenu) {
      return (
        <h1 className="text-sm font-bold text-gray-800">
          Bảng điều khiển
        </h1>
      );
    }

    // If menu has no parent (MenuLv2) or no children, show as bold black
    if (!displayMenu.parent && (!displayMenu.children || displayMenu.children.length === 0)) {
      return (
        <h1 className="text-sm font-bold text-gray-800">
          {displayMenu.label}
        </h1>
      );
    }

    // If menu has parent (MenuLv3), show breadcrumb: Parent / Current
    if (displayMenu.parent) {
      return (
        <h1 className="text-sm">
          <span className="font-bold text-gray-800">{displayMenu.parent.label}</span>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">{displayMenu.label}</span>
        </h1>
      );
    }

    // If menu has children but one is selected (MenuLv2 with active child)
    if (displayMenu.children && displayMenu.activeChild) {
      return (
        <h1 className="text-sm">
          <span className="font-bold text-gray-800">{displayMenu.label}</span>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">{displayMenu.activeChild.label}</span>
        </h1>
      );
    }

    // Default: show as bold black
    return (
      <h1 className="text-sm font-bold text-gray-800">
        {displayMenu.label}
      </h1>
    );
  };

  return (
    <header className="px-6 py-3 bg-white border-b border-gray-200 rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="flex items-center justify-between w-full">
        {/* Left Section - Logo/Title with Animation */}
        <div className="flex items-center">
          <div className={`transition-all duration-300 ease-in-out ${
            isAnimating ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}>
            <IconHolder 
              name={getMenuIcon()} 
              size={24} 
              className="mr-3 text-gray-600" 
            />
          </div>
          <div className={`transition-all duration-300 ease-in-out ${
            isAnimating ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}>
            {renderMenuTitle()}
          </div>
        </div>

        {/* Right Section - Notifications, Language, User */}
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <LanguageSelector />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}

export default HeaderContainer;
