"use client";

import { Button } from "flowbite-react";
import SignUp from "./SignUp";

export default function Header() {
  return (
    <>
      <Button
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Header
      </Button>
      <SignUp></SignUp>
    </>
  );
}
