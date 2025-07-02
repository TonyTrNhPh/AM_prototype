import LogoFrame from "../LogoFrame";
import NavigationColumn from "../NavigationColumn";
import SearchBar from "../SearchBar";

function SidebarContainer({ onMenuChange }) {
  return (
    <div className="flex flex-col items-start w-full h-full pt-10 pb-10 pl-5 pr-5 bg-white border border-gray-200 divide-y divide-gray-200 shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.1)]  p max-w-2xs rounded-2xl">
      <div className="w-full pb-5">
        <LogoFrame /> 
      </div>
      <div className="w-full py-5">
        <SearchBar />
      </div>
      <div className="w-full pt-5 overflow-auto">
        <NavigationColumn onMenuChange={onMenuChange} />
      </div>
    </div>
  );
}

export default SidebarContainer;
