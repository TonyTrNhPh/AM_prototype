import React, { useState, useMemo } from "react";
import SidebarContainer from "./layouts/SidebarLayout/SidebarLayout";
import HeaderContainer from "./layouts/HeaderLayout/HeaderLayout";

// Import the page router utility
import { getPageComponent } from "./utils/pageRouter";

/**
 * Main App Component
 * 
 * Handles the overall layout and page routing based on menu selection
 * - Sidebar for navigation
 * - Header showing current breadcrumb
 * - Main content area with dynamic page rendering
 */
function App() {
  const [currentMenu, setCurrentMenu] = useState(null);

  /**
   * Get the current page component based on selected menu
   * Uses the page router utility for clean separation of concerns
   */
  const CurrentPageComponent = useMemo(() => {
    return getPageComponent(currentMenu);
  }, [currentMenu]);

  return (
    <div className="flex h-screen gap-6 p-6 bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-full max-w-2xs">
        <SidebarContainer onMenuChange={setCurrentMenu} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-col w-full gap-6">
        {/* Header with Breadcrumb */}
        <HeaderContainer currentMenu={currentMenu} />
        
        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-auto bg-white rounded-lg shadow-sm">
          <CurrentPageComponent 
            menuItem={currentMenu} // Pass menu context to page if needed
          />
        </main>
      </div>      
    </div>
  )
}

export default App;