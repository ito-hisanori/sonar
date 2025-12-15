import usersGlobalStore, { UsersGlobalStore } from "@/global-store/users-store";
import { Menu } from "lucide-react";
import React from "react";
import SidebarMenuItems from "./sidebar-menuitems";

function Header() {
  const { user } = usersGlobalStore() as UsersGlobalStore;
  const [openSidebar, setOpenSidebar] = React.useState(false);
  return (
    <div className="p-6 flex justify-between bg-primary items-center">
      <div>
        <h1 className="text-xl text-white font-bold">Sonar</h1>
      </div>
      <div className="flex items-center gap-5">
        <h1 className="text-white text-sm">{user?.first_name}</h1>
        <Menu
          size={14}
          onClick={() => setOpenSidebar(true)}
          className="text-white cursor-pointer"
        />
      </div>

      {openSidebar && (
        <SidebarMenuItems
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      )}
    </div>
  );
}

export default Header;
