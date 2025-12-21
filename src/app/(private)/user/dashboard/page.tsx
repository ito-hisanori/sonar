"use client";
import { getLoggedInUser } from "@/server-actions/users";
import { User } from "@/interfaces";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function UserDashboardPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const fetchData = async () => {
    const response = await getLoggedInUser();
    if (response.success) {
      setUser(response.data);
    } else {
      if (response.message !== undefined) {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5 flex flex-col gap-5">
      {user && (
        <>
          <h1>This is {user.first_name}'s profile!</h1>
        </>
      )}
    </div>
  );
}

export default UserDashboardPage;
