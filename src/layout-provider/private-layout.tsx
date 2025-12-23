import React from "react";
import Header from "./header";
import { getLoggedInUser } from "@/server-actions/users";
import usersGlobalStore, { UsersGlobalStore } from "@/global-store/users-store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/spinner";

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
      router.push("/?formType=login");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <Spinner height="100vh" />;
  }
  return (
    <div>
      <Header />
      <div className="p-6">{children}</div>
    </div>
  );
}

export default PrivateLayout;
