import { LogoFrame, NavigationColumn, SearchBar } from "../config";
import { Sidebar } from "./ui/sidebar";

function SidebarContainer({ onMenuChange }) {
  return (
    <Sidebar>
      <Sidebar.Header>
        <LogoFrame />
      </Sidebar.Header>
      <Sidebar.Section>
        <SearchBar />
      </Sidebar.Section>
      <Sidebar.Section className="overflow-auto scrollbar-hover">
        <Sidebar.Content>
          <NavigationColumn onMenuChange={onMenuChange} />
        </Sidebar.Content>
      </Sidebar.Section>
    </Sidebar>
  );
}

export default SidebarContainer;
