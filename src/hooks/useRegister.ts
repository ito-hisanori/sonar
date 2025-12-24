import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/server-actions/users";
import toast from "react-hot-toast";
import { ServerActionResponse } from "@/interfaces";

const formSchema = z.object({
  first_name: z.string().min(1, "名前を入力してください"),
  family_name: z.string().min(2, "名字を入力してください"),
  email: z.email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .max(20, "パスワードは20文字以下で入力してください"),
});

type formSchemaData = z.infer<typeof formSchema>;

export const useRegiister = () => {
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (data: formSchemaData) => {
    try {
      setLoading(true);
      const response = await registerUser(data);

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
