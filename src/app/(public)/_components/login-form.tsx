"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const rolesArray = [
  { value: "notInstructor", label: "Not Instructor" },
  { value: "instructor", label: "Instructor" },
];

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(50),
  role: z.string(),
});

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "notInstructor",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full px-10">
      <Form {...form}>
        <h1 className="text-xl font-bold text-primary">Login your account</h1>
        <hr className="border-b border-gray-300 my-5"></hr>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-10"
                  >
                    {rolesArray.map((role) => (
                      <FormItem key={role.value} className="flex items-center">
                        <FormControl>
                          <RadioGroupItem value={role.value} id={role.value} />
                        </FormControl>
                        <FormLabel htmlFor={role.value} className="ml-2">
                          {role.label}
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <h1 className="text-sm flex gap-2">
              Don't have an account?{" "}
              <Link
                className="text-sm underline text-black"
                href={"/?formType=register"}
              >
                Register
              </Link>
            </h1>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
