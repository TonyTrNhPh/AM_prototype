import UnknownPage from "../pages/unknown/page";
import CompanyManagementPage from "../pages/company-management/page";

export const pageRoutes = {
  '11': UnknownPage, 
  '12': UnknownPage,  
  '211': CompanyManagementPage,         
  '212': UnknownPage,           
  '214': UnknownPage,         
  '215': UnknownPage,         
  '216': UnknownPage,         
  '217': UnknownPage,         
};

export const getPageComponent = (menuItem) => {
  if (!menuItem || !menuItem.id) {
    return UnknownPage;
  }
  const PageComponent = pageRoutes[menuItem.id];
  return PageComponent || UnknownPage;
};

export const hasPage = (menuId) => {
  return menuId && pageRoutes[menuId] && pageRoutes[menuId] !== UnknownPage;
};

export const getAllRoutes = () => {
  return { ...pageRoutes };
};
