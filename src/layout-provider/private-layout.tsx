import React from "react";
import Header from "./header";
import { getLoggedInUser } from "@/server-actions/users";
import usersGlobalStore, { UsersGlobalStore } from "@/global-store/users-store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const { setUser } = usersGlobalStore() as UsersGlobalStore;
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getLoggedInUser();
      if (response.success) {
        setUser(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error("Failed to fetch user data");
      Cookies.remove("jwt_token");
      // Cookies.remove("user_id");
      router.push("/?formType=login");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default PrivateLayout;
