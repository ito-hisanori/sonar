import { IUser } from "@/interfaces";
import { getLoggedInUser } from "@/server-actions/users";
import React from "react";

async function AdminDashboardPage() {
  const response = await getLoggedInUser();
  if (!response.success) {
    return <div className="p-5">{response.message}</div>;
  }

  const user: IUser = response.data;
  return (
    <div className="p-5 flex flex-col gap-5">
      <h1>Admin Dashboard</h1>

      <h1>User Id : {user.id}</h1>
      <h1>First Name : {user.first_name}</h1>
      <h1>Family Name : {user.family_name} </h1>
      <h1>User Email : {user.email}</h1>
    </div>
  );
}

export default AdminDashboardPage;
