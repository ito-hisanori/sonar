import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function Homepage() {
  return (
    <div className="p-5 flex flex-col w-max gap-5">
      <h1>Homepage</h1>
      <Button>Shadcn default button</Button>
      <Button variant={"outline"}>Shadcn default button</Button>
      <Input placeholder="Shadcn inout"></Input>
    </div>
  );
}

export default Homepage;
