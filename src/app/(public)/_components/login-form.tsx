"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";

function LoginForm() {
  const { form, loading, onSubmit } = useLogin();

  return (
    <div className="w-full px-10">
      <Form {...form}>
        <h1 className="text-xl font-bold text-primary">Login your account</h1>
        <hr className="border-b border-gray-300 my-5"></hr>
        <form onSubmit={onSubmit} className="space-y-8 w-full">
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
              Don't have an account?{" "}
              <Link
                className="text-sm underline text-black"
                href={"/?formType=register"}
              >
                Register
              </Link>
            </h1>
            <Button disabled={loading} type="submit">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
