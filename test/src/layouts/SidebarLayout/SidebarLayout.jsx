import { useState, useCallback } from "react";
import { LogoFrame, NavigationColumn, SearchBar } from "../../config";
import { Sidebar } from "../../components/ui/sidebar";
import { ScrollArea } from "../../components/ui/scroll-area";

/**
 * SidebarLayout Component
 * 
 * Main layout component for the sidebar containing:
 * - Logo header
 * - Search functionality 
 * - Scrollable navigation menu
 * 
 * Features:
 * - Controlled search state management
 * - Performance optimized with useCallback
 * - Proper error handling
 */
function SidebarLayout({ onMenuChange }) {
  // Search state management
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Handle search input changes
   * @param {string} query - New search query
   */
  const handleSearchChange = useCallback((query) => {
    // Input validation
    if (typeof query === 'string') {
      setSearchQuery(query);
    }
  }, []);

  /**
   * Handle search clear action
   * Resets search query to empty state
   */
  const handleSearchClear = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <Sidebar>
      {/* Header Section with Logo */}
      <Sidebar.Header>
        <LogoFrame />
      </Sidebar.Header>
      
      {/* Search Section */}
      <Sidebar.Section>
        <SearchBar 
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          placeholder="Tìm kiếm menu..."
          maxLength={50} // Reasonable limit for search queries
        />
      </Sidebar.Section>
      
      {/* Navigation Section with Scroll */}
      <Sidebar.Section className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <Sidebar.Content className="p-2">
            <NavigationColumn 
              onMenuChange={onMenuChange} 
              searchQuery={searchQuery}
            />
          </Sidebar.Content>
        </ScrollArea>
      </Sidebar.Section>
    </Sidebar>
  );
}

export default SidebarLayout;