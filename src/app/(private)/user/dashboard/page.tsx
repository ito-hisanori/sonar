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
      <h1>UserDashboardPage</h1>

      {user && (
        <>
          <h1>User Id : {user.id}</h1>
          <h1>First Name : {user.first_name}</h1>
          <h1>Family Name : {user.family_name} </h1>
          <h1>User Email : {user.email}</h1>
        </>
      )}
    </div>
  );
}

export default UserDashboardPage;
