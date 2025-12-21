import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { title } from "process";
import { Icon, LayoutDashboard, ListChecks, LogOut } from "lucide-react";
import usersGlobalStore, { UsersGlobalStore } from "@/global-store/users-store";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function SidebarMenuItems({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}) {
  const { user } = usersGlobalStore() as UsersGlobalStore;
  const iconSize = 14;
  const pathname = usePathname();
  const router = useRouter();

  const logoutHandler = () => {
    toast.success("Logged out successfully");
    Cookies.remove("jwt_token");
    // Cookies.remove("role");
    router.push("/?formType=login");
  };
  const userMenuItems: any = [
    // {
    //   title: "Dashboard",
    //   icon: <LayoutDashboard size={iconSize} />,
    //   path: "/user/dashboard",
    // },
    {
      title: "Dive Log",
      icon: <ListChecks size={iconSize} />,
      path: "/user/divelogs",
    },
  ];
  // const adminMenuItems = [];

  // const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-12 mt-14 px-7">
          {userMenuItems.map((item: any, index: number) => (
            <div
              key={index}
              className={`p-3 flex gap-3 items-center cursor-pointer ${
                pathname === item.path
                  ? "bg-gray-100 border border-gray-500 text-primary rounded-lg"
                  : ""
              }`}
              onClick={() => {
                setOpenSidebar(false);
                router.push(item.path);
              }}
            >
              {item.icon}
              <h1 className="text-sm">{item.title}</h1>
            </div>
          ))}

          <Button onClick={logoutHandler}>
            <LogOut /> Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMenuItems;
