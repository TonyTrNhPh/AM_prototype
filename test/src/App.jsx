import React, { useState, useMemo, useEffect } from "react";
import SidebarContainer from "./layouts/SidebarLayout/SidebarLayout";
import HeaderContainer from "./layouts/HeaderLayout/HeaderLayout";
import LoaderLayout from "./layouts/LoaderLayout/LoaderLayout";
import { getPageComponent } from "./utils/pageRouter";

function App() {
  const [currentMenu, setCurrentMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const LOADER_DURATION = 3000; 

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const CurrentPageComponent = useMemo(() => {
    return getPageComponent(currentMenu);
  }, [currentMenu]);

  return (
    <>
      <LoaderLayout 
        isVisible={isLoading}
        duration={LOADER_DURATION}
        onComplete={handleLoaderComplete}
        message="Cố lên, cố lên, sắp tới rồi sắp tới rồi..."
      />

      <div className="flex h-screen gap-6 p-6 bg-gray-100">
        <div className="w-full max-w-2xs">
          <SidebarContainer onMenuChange={setCurrentMenu} />
        </div>
        <div className="flex flex-col w-full gap-6">
          <HeaderContainer currentMenu={currentMenu} />
          <main className="flex-1 overflow-hidden bg-white rounded-lg shadow-sm">
            <CurrentPageComponent 
              menuItem={currentMenu}
            />
          </main>
        </div>      
      </div>
    </>
  );
}

export default App;