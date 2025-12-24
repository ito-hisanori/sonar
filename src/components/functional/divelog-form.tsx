"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { createRecord, updateRecord } from "@/server-actions/record";
import { useRouter } from "next/navigation";
import { Record, User } from "@/interfaces";
import { getLoggedInUser } from "@/server-actions/users";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import Tiptap from "@/components/ui/tipTap";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { useDivelogForm } from "@/hooks/useDivelogForm";

interface DivelogFormProps {
  formType: "add" | "edit";
  divelogData?: Partial<Record>;
}

function DivelogForm({ formType, divelogData }: DivelogFormProps) {
  const { form, loading, isEdit, user, onSubmit, handleCancel } =
    useDivelogForm(formType, divelogData);

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8 w-full">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    className="text-sm sm:text-base"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dived_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">dived at</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    className="text-sm sm:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Description
                </FormLabel>
                <FormControl>
                  <Tiptap value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-5">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Divelog"
                : "Add Divelog"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DivelogForm;
