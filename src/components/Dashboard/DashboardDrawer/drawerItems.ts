import { DrawerItem } from "@/types/common";
import shoppingIcon from "@/assets/icons/icon.png";
import dashboardIcon from "@/assets/icons/secondary-shape.png";
export const drawerItems = (): DrawerItem[] => {
  const defaultMenus = [
    {
      title: "Dashboard",
      path: "dashboard",
      image: dashboardIcon.src,
    },
    {
      title: "Onboarding",
      path: "onboarding",
      image: shoppingIcon.src,
    },
  ];

  return [...defaultMenus];
};
