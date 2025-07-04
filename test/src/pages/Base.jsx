import React, { useState } from "react";
import SidebarContainer from "../components/SidebarContainer";
import HeaderContainer from "../components/HeaderContainer";
import UnKnownPage from "../content/UnknownPage";

function Base() {
  const [currentMenu, setCurrentMenu] = useState(null);

  return (
    <div className="flex h-screen gap-6 p-6 bg-gray-100">
      <div className="w-full max-w-2xs">
        <SidebarContainer onMenuChange={setCurrentMenu} />
      </div>
      <div className="flex flex-col w-full gap-6">
        <HeaderContainer currentMenu={currentMenu} />
        <UnKnownPage/>
      </div>      
    </div>
  )
}

export default Base;