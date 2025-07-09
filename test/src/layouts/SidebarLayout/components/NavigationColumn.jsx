import { useState, useMemo, useRef, useCallback } from "react";
import { MenuItemLv1, MenuItemLv2, MenuItemLv3 } from "@/config";
import { menuData } from "@/data/menuData";

/**
 * NavigationColumn Component
 * 
 * A three-level hierarchical menu with search functionality:
 * - Level 1 (Lv1): Main groups/sections
 * - Level 2 (Lv2): Expandable/collapsible subsections  
 * - Level 3 (Lv3): Individual menu items
 * 
 * Features:
 * - Real-time search with text highlighting
 * - Auto-expand matching sections during search
 * - Preserve manual expand/collapse state when search is cleared
 * - Performance optimized with useMemo and useCallback
 */
function NavigationColumn({ onMenuChange, searchQuery = "" }) {
  // State for tracking the currently active menu item
  const [activeItem, setActiveItem] = useState(null);
  
  // Persistent tracking of manually expanded items across renders and search states
  // Using useRef to maintain state without causing re-renders
  const manuallyExpandedItems = useRef(new Set());

  /**
   * Normalize text for search comparison
   * Handles Vietnamese diacritics and case-insensitive matching
   * @param {string} text - Text to normalize
   * @returns {string} Normalized text
   */
  const normalizeText = useCallback((text) => {
    // Handle null/undefined/empty input
    if (!text || typeof text !== 'string') return '';
    
    return text
      .toLowerCase()
      .normalize('NFD') // Decompose Unicode characters
      .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
  }, []);

  /**
   * Handle manual expansion/collapse of menu items
   * Updates the persistent tracking set
   * @param {string} itemId - ID of the item being expanded/collapsed
   * @param {boolean} isExpanded - New expansion state
   */
  const handleManualExpansion = useCallback((itemId, isExpanded) => {
    if (isExpanded) {
      manuallyExpandedItems.current.add(itemId);
    } else {
      manuallyExpandedItems.current.delete(itemId);
    }
  }, []);

  /**
   * Filter and process menu data based on search query
   * Implements intelligent filtering with the following logic:
   * 1. No search: Return original data with manual expansion states
   * 2. With search: Filter items and auto-expand matching sections
   * 3. Preserve manual expansion states across search operations
   */
  const filteredMenuData = useMemo(() => {
    // Handle empty/null search query
    if (!searchQuery || !searchQuery.trim()) {
      // Return original menu structure with manual expansion states preserved
      return menuData.map(section => ({
        ...section,
        children: section.children?.map(item => ({
          ...item,
          // Restore manual expansion state from persistent tracking
          isManuallyExpanded: manuallyExpandedItems.current.has(item.id),
          // Reset any search-related properties
          forceExpanded: undefined
        }))
      }));
    }

    // Normalize search query for comparison
    const normalizedQuery = normalizeText(searchQuery);
    
    // Early return if query is empty after normalization
    if (!normalizedQuery) {
      return menuData.map(section => ({
        ...section,
        children: section.children?.map(item => ({
          ...item,
          isManuallyExpanded: manuallyExpandedItems.current.has(item.id),
          forceExpanded: undefined
        }))
      }));
    }

    // Process each main section (Level 1)
    return menuData.map(section => {
      const filteredChildren = section.children?.filter(item => {
        // Check if Level 2 item title matches search query
        const itemMatches = normalizeText(item.title).includes(normalizedQuery);
        
        // Check if any Level 3 child matches search query (for expandable items)
        const childMatches = item.children?.some(child => 
          normalizeText(child.title).includes(normalizedQuery)
        );
        
        // Include item if either it matches or any of its children match
        return itemMatches || childMatches;
      }).map(item => {
        // Process expandable items (Level 2 with Level 3 children)
        if (item.type === 'expandable' && item.children) {
          // Filter Level 3 children that match the search query
          const filteredSubChildren = item.children.filter(child =>
            normalizeText(child.title).includes(normalizedQuery)
          );
          
          // Determine what children to show based on matching logic
          const itemMatches = normalizeText(item.title).includes(normalizedQuery);
          const hasMatchingChildren = filteredSubChildren.length > 0;
          
          return {
            ...item,
            // Show all children if parent matches, otherwise show only matching children
            children: itemMatches ? item.children : filteredSubChildren,
            // Auto-expand if there are matching children (Level 3 items found)
            forceExpanded: hasMatchingChildren,
            // Preserve manual expansion state for when search is cleared
            isManuallyExpanded: manuallyExpandedItems.current.has(item.id)
          };
        }
        
        // Handle non-expandable items (Level 2 only)
        return {
          ...item,
          // Preserve manual expansion state
          isManuallyExpanded: manuallyExpandedItems.current.has(item.id)
        };
      });

      // Only include sections that have matching children
      if (filteredChildren && filteredChildren.length > 0) {
        return {
          ...section,
          children: filteredChildren
        };
      }
      
      // Exclude sections with no matching children
      return null;
    }).filter(Boolean); // Remove null sections
  }, [searchQuery, normalizeText]); // Dependencies for memoization

  /**
   * Highlight matching text in search results
   * Wraps matching text with styled span for visual emphasis
   * @param {string} text - Original text to highlight
   * @param {string} query - Search query to highlight
   * @returns {JSX.Element|string} Text with highlighted matches or original text
   */
  const highlightText = useCallback((text, query) => {
    // Handle edge cases
    if (!text || !query || !query.trim()) {
      return text;
    }
    
    const normalizedText = normalizeText(text);
    const normalizedQuery = normalizeText(query.trim());
    const index = normalizedText.indexOf(normalizedQuery);
    
    // No match found
    if (index === -1) {
      return text;
    }
    
    // Split text and wrap matching part
    const beforeMatch = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const afterMatch = text.substring(index + query.length);
    
    return (
      <>
        {beforeMatch}
        <span className="bg-yellow-200 text-yellow-800 rounded px-0.5 font-medium">
          {match}
        </span>
        {afterMatch}
      </>
    );
  }, [normalizeText]);

  /**
   * Find menu item by ID across the entire menu hierarchy
   * Searches through all levels to locate item and gather context
   * @param {string} id - Item ID to find
   * @param {Array} data - Menu data to search (defaults to menuData)
   * @returns {Object|null} Found item with context or null
   */
  const findMenuItemById = useCallback((id, data = menuData) => {
    // Input validation
    if (!id || !data) return null;
    
    for (const section of data) {
      if (section.children) {
        for (const item of section.children) {
          // Check Level 2 items
          if (item.id === id) {
            return { 
              ...item, 
              section: section.title 
            };
          }
          
          // Check Level 3 items
          if (item.children) {
            for (const child of item.children) {
              if (child.id === id) {
                return { 
                  ...child, 
                  parent: { id: item.id, label: item.title },
                  section: section.title 
                };
              }
            }
          }
        }
      }
    }
    return null;
  }, []);

  /**
   * Handle menu item click events
   * Updates active state and notifies parent component
   * @param {string} itemId - ID of clicked item
   */
  const handleItemClick = useCallback((itemId) => {
    // Update active item state
    setActiveItem(itemId);
    
    // Find the complete menu item data
    const menuItem = findMenuItemById(itemId);
    if (menuItem && onMenuChange) {
      // Transform to the format expected by HeaderContainer
      const headerMenu = {
        id: menuItem.id,
        label: menuItem.title,
        iconName: menuItem.iconName,
        parent: menuItem.parent ? {
          ...menuItem.parent,
          iconName: findMenuItemById(menuItem.parent.id)?.iconName
        } : null,
        children: menuItem.children || null,
        type: menuItem.type
      };
      onMenuChange(headerMenu);
    }
    
    // Debug logging (can be removed in production)
    console.log('Menu item clicked:', itemId);
  }, [findMenuItemById, onMenuChange]);

  /**
   * Render individual menu items based on their type
   * Handles both regular items and expandable sections
   * @param {Object} item - Menu item to render
   * @returns {JSX.Element} Rendered menu item component
   */
  const renderMenuItem = useCallback((item) => {
    // Input validation
    if (!item || !item.type) return null;

    switch (item.type) {
      case 'item':
        // Level 2 non-expandable items
        return (
          <MenuItemLv2
            key={item.id}
            title={highlightText(item.title, searchQuery)}
            iconName={item.iconName}
            onClick={() => handleItemClick(item.id)}
            isActive={activeItem === item.id}
          />
        );
      
      case 'expandable':
        // Level 2 expandable items with Level 3 children
        return (
          <MenuItemLv2
            key={item.id}
            title={highlightText(item.title, searchQuery)}
            iconName={item.iconName}
            // Force expansion during search if children match
            forceExpanded={searchQuery.trim() ? (item.forceExpanded || false) : undefined}
            // Restore manual expansion state when not searching
            isManuallyExpanded={item.isManuallyExpanded}
            // Handle manual expansion/collapse events
            onManualExpansion={(isExpanded) => handleManualExpansion(item.id, isExpanded)}
          >
            {/* Render Level 3 children */}
            {item.children?.map(child => (
              <MenuItemLv3
                key={child.id}
                title={highlightText(child.title, searchQuery)}
                onClick={() => handleItemClick(child.id)}
                isActive={activeItem === child.id}
              />
            ))}
          </MenuItemLv2>
        );
      
      default:
        // Unknown item type
        console.warn(`Unknown menu item type: ${item.type}`);
        return null;
    }
  }, [searchQuery, activeItem, highlightText, handleItemClick, handleManualExpansion]);

  // Main render
  return (
    <div className="scrollbar-hover flex flex-col items-start gap-2.5 w-full max-w-2xs h-full bg-white">
      {/* Handle empty search results */}
      {searchQuery.trim() && filteredMenuData.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-8 text-gray-500">
          <div className="text-sm font-medium">Không tìm thấy kết quả</div>
          <div className="px-4 mt-1 text-xs text-center">
            Thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả
          </div>
        </div>
      ) : (
        /* Render filtered menu sections */
        filteredMenuData.map(section => (
          <MenuItemLv1 key={section.id} title={section.title}>
            {section.children?.map(renderMenuItem)}
          </MenuItemLv1>
        ))
      )}
    </div>
  );
}

export default NavigationColumn;
