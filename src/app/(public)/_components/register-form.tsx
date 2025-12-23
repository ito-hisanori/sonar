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
import { registerUser } from "@/server-actions/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ServerActionResponse } from "@/interfaces";

const formSchema = z.object({
  first_name: z.string().min(2).max(50),
  family_name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(8).max(50),
});

function RegisterForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      family_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response: ServerActionResponse = await registerUser(values);
    setLoading(false);
    if (response.success) {
      if (response.message !== undefined) {
        toast.success(response.message);
      }
      router.push("/?formType=login");
    } else {
      if (response.message !== undefined) {
        toast.error(response.message);
      }
    }
  }

  return (
    <div className="w-full px-10">
      <Form {...form}>
        <h1 className="text-xl font-bold text-primary">
          Register your account
        </h1>
        <hr className="border-b border-gray-300 my-5"></hr>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="family_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Name</FormLabel>
                <FormControl>
                  <Input placeholder="your family name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input
                    type="password"
                    placeholder="your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <h1 className="text-sm flex gap-2">
              Already have an account?{" "}
              <Link
                className="text-sm underline text-black"
                href={"/?formType=login"}
              >
                Login
              </Link>
            </h1>
            <Button type="submit" disabled={loading}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
