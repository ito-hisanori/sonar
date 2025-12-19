"use client";
import React from "react";
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
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import { uploadFileAndGetUrl } from "@/helpers/file-uploads";
import { createRecord } from "@/server-actions/record";
import { useRouter } from "next/navigation";

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

function DivelogForm({ formType }: { formType: "add" | "edit" }) {
  const router = useRouter();
  const [existingImageUrls, setExistingImageUrls] = React.useState<string[]>(
    []
  );
  const [images, setImages] = React.useState<string[]>([]);
  const [selectedImagesFiles, setSelectedImagesFiles] = React.useState<File[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 1,
      dived_at: Date(),
      // public_range: 1,
      description: "",
    },
  });

  // const handleSelectImageDelete = (index: number) => {
  //   setImages((prev) => prev.filter((_, i) => i !== index));
  //   setSelectedImagesFiles((prev) => prev.filter((_, i) => i !== index));
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      let newImageUrls = [];
      for (const file of selectedImagesFiles) {
        const response = await uploadFileAndGetUrl(file);
        if (response.success) {
          newImageUrls.push(response.data);
        }
      }

      const imageUrls = [...existingImageUrls, ...newImageUrls];

      let response: any = null;
      if (formType === "add") {
        response = await createRecord({
          ...values,
          // images: imageUrls,
          // is_active: true,
          // status: "active",
        });
      } else {
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
                    {/* <Textarea placeholder="Enter your description" {...field} /> */}
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                      init={{
                        plugins: [
                          // Core editing features
                          "anchor",
                          "autolink",
                          "charmap",
                          "codesample",
                          "emoticons",
                          "link",
                          "lists",
                          "media",
                          "searchreplace",
                          "table",
                          "visualblocks",
                          "wordcount",
                          // Your account includes a free trial of TinyMCE premium features
                          // Try the most popular premium features until Jan 1, 2026:
                          "checklist",
                          "mediaembed",
                          "casechange",
                          "formatpainter",
                          "pageembed",
                          "a11ychecker",
                          "tinymcespellchecker",
                          "permanentpen",
                          "powerpaste",
                          "advtable",
                          "advcode",
                          "advtemplate",
                          "ai",
                          "uploadcare",
                          "mentions",
                          "tinycomments",
                          "tableofcontents",
                          "footnotes",
                          "mergetags",
                          "autocorrect",
                          "typography",
                          "inlinecss",
                          "markdown",
                          "importword",
                          "exportword",
                          "exportpdf",
                        ],
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
                        mergetags_list: [
                          { value: "First.Name", title: "First Name" },
                          { value: "Email", title: "Email" },
                        ],
                        ai_request: (request: any, respondWith: any) =>
                          respondWith.string(() =>
                            Promise.reject("See docs to implement AI Assistant")
                          ),
                        uploadcare_public_key: "60f2f47d1090a7016580",
                      }}
                      initialValue="Enter your description"
                      value={field.value}
                      onEditorChange={(content) => field.onChange(content)}
                    />
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
              <div
                key={index}
                className="flex flex-col items-center border p-2 "
              >
                <img
                  src={image}
                  alt={`Selected ${index}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <h1
                  className="text-sm cursor-pointer  underline mt-2 rounded"
                  onClick={() => handleSelectImageDelete(index)}
                >
                  Delete
                </h1>
              </div>
            ))}
          </div> */}

          <div className="flex justify-end gap-5">
            <Button onClick={() => router.back()} variant={"outline"}>
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
