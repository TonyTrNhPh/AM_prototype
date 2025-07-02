import React, { useState } from "react";
import SidebarContainer from "../components/SidebarContainer";
import HeaderContainer from "../components/HeaderContainer";

function Base() {
  const [currentMenu, setCurrentMenu] = useState(null);

  return (
    <div className="flex h-screen gap-6 p-6 bg-gray-100">
      <div>
        <SidebarContainer onMenuChange={setCurrentMenu} />
      </div>
      <div className="flex flex-col w-full">
        <HeaderContainer currentMenu={currentMenu} />
      </div>      
    </div>
  )
}

export default Base;