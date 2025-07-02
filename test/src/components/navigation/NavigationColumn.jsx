import { useState } from "react";
import MenuItemLv1 from "./MenuItemLv1";
import MenuItemLv2 from "./MenuItemLv2";
import MenuItemLv3 from "./MenuItemLv3";
import { menuData } from "../data/menuData";

function NavigationColumn({ onMenuChange }) {
  const [activeItem, setActiveItem] = useState(null);

  // Helper function to find menu item by ID
  const findMenuItemById = (id, data = menuData) => {
    for (const section of data) {
      if (section.children) {
        for (const item of section.children) {
          if (item.id === id) {
            return { ...item, section: section.title };
          }
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
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    
    // Find the menu item and send it to parent
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
    
    console.log(itemId);
  };

  const renderMenuItem = (item) => {
    switch (item.type) {
      case 'item':
        return (
          <MenuItemLv2
            key={item.id}
            title={item.title}
            iconName={item.iconName}
            onClick={() => handleItemClick(item.id)}
            isActive={activeItem === item.id}
          />
        );
      
      case 'expandable':
        return (
          <MenuItemLv2
            key={item.id}
            title={item.title}
            iconName={item.iconName}
          >
            {item.children?.map(child => (
              <MenuItemLv3
                key={child.id}
                title={child.title}
                onClick={() => handleItemClick(child.id)}
                isActive={activeItem === child.id}
              />
            ))}
          </MenuItemLv2>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="scrollbar-hover flex flex-col items-start gap-2.5 w-full max-w-2xs h-full bg-white">
      {menuData.map(section => (
        <MenuItemLv1 key={section.id} title={section.title}>
          {section.children?.map(renderMenuItem)}
        </MenuItemLv1>
      ))}
    </div>
  );
}

export default NavigationColumn;
