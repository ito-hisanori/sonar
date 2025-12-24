import { z } from "zod";
import { Record, User } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { getLoggedInUser } from "@/server-actions/users";
import toast from "react-hot-toast";
import { createRecord, updateRecord } from "@/server-actions/record";

const formSchema = z.object({
  rate: z
    .number()
    .min(1, "評価は1以上で入力してください")
    .max(10, "評価は10以下で入力してください"),
  dived_at: z.string().min(1, "ダイビング日時を入力してください"),
  description: z.string(),
});

type formSchemaData = z.infer<typeof formSchema>;

export const useDivelogForm = (
  formType: "add" | "edit",
  divelogData?: Partial<Record>
) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isEdit = formType === "edit";

  const form = useForm<formSchemaData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: divelogData?.rate || 5,
      dived_at:
        getDateTimeFormat(divelogData?.dived_at!) ||
        getDateTimeFormat(new Date()),
      description: divelogData?.description || "",
    },
  });

  const fetchUser = async () => {
    const response = await getLoggedInUser();
    if (response.success) {
      setUser(response.data);
    } else {
      if (response.message !== undefined) {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (values: formSchemaData) => {
    try {
      setLoading(true);
      let response: any = null;

      if (formType === "add") {
        response = await createRecord({
          ...values,
          user_id: user?.id,
          created_at: getDateTimeFormat(new Date()),
          updated_at: getDateTimeFormat(new Date()),
        });
      } else {
        response = await updateRecord(divelogData?.id!, {
          ...values,
          user_id: user?.id,
          updated_at: getDateTimeFormat(new Date()),
        });
      }

      if (response.success) {
        toast.success(
          isEdit ? "Divelog updated successfully" : "Divelog saved successfully"
        );
        router.push("/user/divelogs");
      } else {
        toast.error(response.message || "Failed to save divelog");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return {
    form,
    loading,
    isEdit,
    user,
    onSubmit: form.handleSubmit(onSubmit),
    handleCancel,
  };
};
