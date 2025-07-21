import { useState, useEffect } from "react";
import { IconHolder } from "@/config";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb";
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
              <BreadcrumbPage className="text-sm font-bold text-primary">
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
              <BreadcrumbPage className="text-sm font-bold text-primary">
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
              <BreadcrumbLink className="text-sm font-bold transition-colors text-secondary hover:text-primary">
                {displayMenu.parent.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center space-x-2">
                <span className="text-sm font-bold text-primary">{displayMenu.label}</span>
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
              <BreadcrumbLink className="text-sm transition-colors text-secondary hover:text-primary">
                {displayMenu.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-bold text-primary">
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
            <BreadcrumbPage className="text-sm font-bold text-primary">
              {displayMenu.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <header 
      className="px-6 py-3 transition-colors duration-300 border-b rounded-2xl"
      style={{ 
        backgroundColor: 'var(--header-background)',
        borderColor: 'var(--header-border)',
        boxShadow: '0px 2px 8px 0px var(--header-shadow)'
      }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className={`transition-all duration-300 ease-in-out ${
            isAnimating ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}>
            <IconHolder 
              name={getMenuIcon()} 
              size={24} 
              className="mr-3"
              style={{ color: 'var(--text-secondary)' }}
            />
          </div>
          <div className={`transition-all duration-300 ease-in-out ${
            isAnimating ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}>
            {renderBreadcrumb()}
          </div>
        </div>
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
