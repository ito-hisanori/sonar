"use client";
import React, { useEffect } from "react";
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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { uploadFileAndGetUrl } from "@/helpers/file-uploads";
import { createRecord, updateRecord } from "@/server-actions/record";
import { useRouter } from "next/navigation";
import { Record, User } from "@/interfaces";
// import DivelogFormImage from "./package-form-image";
import { getLoggedInUser } from "@/server-actions/users";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import Tiptap from "@/components/ui/tipTap";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

new Editor({
  extensions: [StarterKit],
});

const formSchema = z.object({
  // user_id: number;
  // buddy_id: number;
  // spot_id: number;
  // event_id: number;
  rate: z.int(),
  dived_at: z.string(),
  // public_range: z.int(),
  description: z.string(),
});

function DivelogForm({
  formType,
  divelogData,
}: {
  formType: "add" | "edit";
  divelogData?: Partial<Record>;
}) {
  const router = useRouter();
  // const [existingImageUrls, setExistingImageUrls] = React.useState<string[]>();
  // divelogData?.images || []
  // const [images, setImages] = React.useState<string[]>([]);
  // const [selectedImagesFiles, setSelectedImagesFiles] = React.useState<File[]>(
  //   []
  // );
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: divelogData?.rate || 5,
      dived_at:
        getDateTimeFormat(divelogData?.dived_at!) ||
        getDateTimeFormat(new Date()),
      // public_range: 1,
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

  // const handleSelectImageDelete = (index: number) => {
  //   setImages((prev) => prev.filter((_, i) => i !== index));
  //   setSelectedImagesFiles((prev) => prev.filter((_, i) => i !== index));
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      // let newImageUrls = [];
      // for (const file of selectedImagesFiles) {
      //   const response = await uploadFileAndGetUrl(file);
      //   if (response.success) {
      //     newImageUrls.push(response.data);
      //   }
      // }

      // const imageUrls = [...existingImageUrls, ...newImageUrls];

      let response: any = null;
      if (formType === "add") {
        response = await createRecord({
          ...values,
          user_id: user?.id,
          created_at: getDateTimeFormat(new Date()),
          updated_at: getDateTimeFormat(new Date()),
          // images: imageUrls,
          // is_active: true,
          // status: "active",
        });
      } else {
        response = await updateRecord(divelogData?.id!, {
          ...values,
          user_id: user?.id,
          updated_at: getDateTimeFormat(new Date()),
          // images: imageUrls,
        });
      }

      if (response.success) {
        toast.success("Divelog saved successfully");
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
  }

  return (
    <div className="mt-5">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="dived_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>dived at</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* <div>
            <h1 className="text-sm">select images (Optional)</h1>
            <Input
              type="file"
              multiple
              accept="image/*"
              placeholder="Select images"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setSelectedImagesFiles([...selectedImagesFiles, ...files]);
                const imageUrls = files.map((file) =>
                  URL.createObjectURL(file)
                );
                setImages([...images, ...imageUrls]);
              }}
            />
          </div> */}

          {/* <div className="flex gap-5 mt-5">
            {images.map((image, index) => (
              <DivelogFormImage
                key={index}
                image={image}
                index={index}
                handleDelete={handleSelectImageDelete}
              />
            ))}

            {existingImageUrls.map((image, index) => (
              <DivelogFormImage
                key={index}
                image={image}
                index={index}
                handleDelete={(idx) => {
                  const newUrls = existingImageUrls.filter((_, i) => i !== idx);
                }}
              />
            ))} */}
          {/* </div> */}

          <div className="flex justify-end gap-5">
            <Button
              type="button"
              onClick={() => router.back()}
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {formType === "add" ? "Add Divelog" : "Update Divelog"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DivelogForm;
