"use server";

import supabase from "@/config/supabase-config";
import { errorResponse, successResponse } from "./request-responses";

export const uploadFileAndGetUrl = async (file: File) => {
  const path = `uploads/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("default")
    .upload(path, file);
  if (error) {
    return errorResponse("File upload failed");
  }

  const { data: uploadedData } = supabase.storage
    .from("default")
    .getPublicUrl(data.path);

  return successResponse(uploadedData.publicUrl, "File uploaded successfully");
};
