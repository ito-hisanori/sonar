import usersGlobalStore, { UsersGlobalStore } from "@/global-store/users-store";
import React from "react";

function Header() {
  const { user } = usersGlobalStore() as UsersGlobalStore;
  return (
    <div className="p-6 flex justify-between bg-primary items-center">
      <div>
        <h1 className="text-xl text-white font-bold">Sonar</h1>
      </div>
      <div className="flex items-center gap-5">
        <h1 className="text-white text-sm">{user?.first_name}</h1>
      </div>
    </div>
  );
}

export default Header;
