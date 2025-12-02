"use server";

import supabase from "@/config/supabase-config";
import { errorResponse, successResponse } from "@/heplers/request-responses";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import { success } from "zod";

export const registerUser = async (payload: Partial<IUser>) => {
  // initial settings
  payload.is_intermediate = true;

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", payload.email);

  if (existingUserError) {
    return errorResponse(existingUserError.message);
  }

  if (existingUser && existingUser.length > 0) {
    return errorResponse("User already exists with this email.");
  }

  const hashedPassword = await bcrypt.hash(payload.password || "", 10);
  payload.password = hashedPassword;

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([payload]);

  if (insertError) {
    return errorResponse(insertError.message);
  }

  return successResponse(newUser, "User registered successfully.");
};
