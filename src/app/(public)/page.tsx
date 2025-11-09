"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Suspense } from "react";
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
import RegisterForm from "./_components/register-form";
import LoginForm from "./_components/login-form";
import { useSearchParams } from "next/navigation";

function Homepage() {
  const [openAuthSheet, setOpenAuthSheet] = React.useState(false);
  const searchParams = useSearchParams();

  const formType = searchParams.get("formType");
  return (
    <Suspense>
      <div className="flex flex-col">
        <div className="bg-primary px-20 py-5 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Sonar</h1>
          <Button variant={"outline"} onClick={() => setOpenAuthSheet(true)}>
            Login
          </Button>
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

        {openAuthSheet && (
          <Sheet open={openAuthSheet} onOpenChange={setOpenAuthSheet}>
            <SheetContent className="lg:min-w-[500px]">
              <SheetHeader>
                <SheetTitle></SheetTitle>
              </SheetHeader>

              <div className="flex items-center justify-center h-screen">
                {formType === "register" ? <RegisterForm /> : <LoginForm />}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </Suspense>
  );
}

export default Homepage;
