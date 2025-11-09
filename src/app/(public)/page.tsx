import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function Homepage() {
  return (
    <div className="flex flex-col">
      <div className="bg-primary px-20 py-5 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Sonar</h1>
        <Button variant={"outline"}>Login</Button>
      </div>

      <div className="grid lg:grid-cols-2 items-center h-[85vh] px-20">
        <div className="col-span-1 mt-20 lg:mt-0">
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-bold text-primary">
              Discover. <br></br>
              Feel. <br></br>
              Log. <br></br>
              Dive. <br></br>
              <br></br>
              With Sonar.
            </h1>
            <Button className="w-max">Get started</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
