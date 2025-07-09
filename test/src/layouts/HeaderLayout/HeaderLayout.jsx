import { useState, useEffect } from "react";
import { IconHolder } from "@/config";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import UserProfileDropdown from "./components/UserProfileMenu";
import LanguageSelector from "./components/LanguageSelector";
import NotificationBell from "./components/NotificationBell";

function HeaderLayout({ currentMenu = null }) {
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

  // Function to render breadcrumb navigation based on current menu
  const renderBreadcrumb = () => {
    if (!displayMenu) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-bold text-gray-800">
                Bảng điều khiển
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    // If menu has no parent (MenuLv2) or no children, show as single item
    if (!displayMenu.parent && (!displayMenu.children || displayMenu.children.length === 0)) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-bold text-gray-800">
                {displayMenu.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    // If menu has parent (MenuLv3), show breadcrumb: Parent > Current
    if (displayMenu.parent) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-sm font-bold text-gray-500 hover:text-gray-700">
                {displayMenu.parent.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center space-x-2">
                <span className="text-sm font-bold text-gray-800">{displayMenu.label}</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    // If menu has children but one is selected (MenuLv2 with active child)
    if (displayMenu.children && displayMenu.activeChild) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-sm text-gray-500 hover:text-gray-700">
                {displayMenu.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-bold text-gray-800">
                {displayMenu.activeChild.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    // Default: show as single item
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-bold text-gray-800">
              {displayMenu.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
            {renderBreadcrumb()}
          </div>
        </div>

        {/* Right Section - Notifications, Language, User */}
        <div className="flex items-center gap-6">
          <NotificationBell />
          <LanguageSelector />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}

export default HeaderLayout;
