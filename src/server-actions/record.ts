"use server";

import supabase from "@/config/supabase-config";
import { Record } from "@/interfaces";
import { errorResponse, successResponse } from "@/helpers/request-responses";

export const createRecord = async (rcd: Partial<Record>) => {
  const { data, error } = await supabase.from("records").insert([rcd]);
  if (error) {
    return errorResponse(error.message);
  }
  return successResponse(null, "Record created successfully");
};

export const updateRecord = async (id: number, rcd: Partial<Record>) => {
  const { data, error } = await supabase
    .from("records")
    .update(rcd)
    .eq("id", id);
  if (error) {
    return errorResponse(error.message);
  }
  return successResponse(null, "Record updated successfully");
};

export const getRecord = async (id: number) => {
  const { data, error } = await supabase
    .from("records")
    .select("id, rate, dived_at, description, updated_at, created_at")
    .eq("id", id);

  if (error || !data || data.length === 0) {
    return errorResponse("Record not found");
  }
  return successResponse(data[0], "Record retrieved successfully");
};

export const deleteRecord = async (id: number) => {
  const { data, error } = await supabase.from("records").delete().eq("id", id);
  if (error) {
    return errorResponse(error.message);
  }
  return successResponse(null, "Record deleted successfully");
};

export const getAllRecords = async (user_id: number) => {
  const { data, error } = await supabase
    .from("records")
    .select("id, rate, dived_at, description, updated_at, created_at")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
  if (error) {
    return errorResponse(error.message);
  }
  return successResponse(data, "Records retrieved successfully");
};
