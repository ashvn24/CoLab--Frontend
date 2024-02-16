import {
    HomeIcon,
    UserCircleIcon,
  } from "@heroicons/react/24/solid";

const icon = {
    className: "w-5 h-5 text-inherit",
  };

export const AdminRoutes = [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/adminDashboard",
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Users",
          path: "/users",
        },
        
      ]