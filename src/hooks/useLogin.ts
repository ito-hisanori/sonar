import { loginUser } from "@/server-actions/users";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .max(20, "パスワードは20文字以下で入力してください"),
});

type formSchemaData = z.infer<typeof formSchema>;

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: formSchemaData) => {
    try {
      setLoading(true);
      const response = await loginUser(data);

      if (response.success) {
        if (response.message !== undefined) {
          toast.success(response.message);
          Cookie.set("jwt_token", response.data.token);
          router.push("/user/divelogs/");
        }
      } else {
        if (response.message !== undefined) {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
