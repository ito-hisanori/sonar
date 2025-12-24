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
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-10">
      <Form {...form}>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
          Login your account
        </h1>
        <hr className="border-b border-gray-300 my-3 sm:my-5" />

        <form
          onSubmit={onSubmit}
          className="space-y-4 sm:space-y-6 md:space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your email"
                    className="text-sm sm:text-base h-10 sm:h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    className="text-sm sm:text-base h-10 sm:h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-2 pt-2">
            <p className="text-xs sm:text-sm text-center sm:text-left order-2 sm:order-1">
              Don't have an account?{" "}
              <Link
                className="text-xs sm:text-sm underline text-primary font-medium hover:text-primary/80 transition-colors"
                href="/?formType=register"
              >
                Register
              </Link>
            </p>
            <Button
              disabled={loading}
              type="submit"
              className="w-full sm:w-auto order-1 sm:order-2 h-10 sm:h-11"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
