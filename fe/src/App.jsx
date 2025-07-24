import React, { useState, useMemo, useEffect } from "react";
import SidebarContainer from "./layouts/SidebarLayout/SidebarLayout";
import HeaderContainer from "./layouts/HeaderLayout/HeaderLayout";
import LoaderLayout from "./layouts/LoaderLayout/LoaderLayout";
import { Toaster } from "@/components/ui/sonner";
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
      {isLoading && (
        <LoaderLayout onComplete={handleLoaderComplete} duration={LOADER_DURATION} />
      )}
      <div className="flex h-screen gap-6 p-6 app-background">
        {/* Sidebar: fixed width */}
        <div className="shrink-0 basis-[220px]">
          <SidebarContainer onMenuChange={setCurrentMenu} />
        </div>

        {/* Right content: flexible */}
        <div className="flex flex-col min-w-0 gap-6 grow">
          <HeaderContainer currentMenu={currentMenu} />

          <main className="flex-1 overflow-hidden rounded-lg shadow-sm main-background">
            <CurrentPageComponent menuItem={currentMenu} />
          </main>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
