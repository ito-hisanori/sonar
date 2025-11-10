"use server";

import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import { success } from "zod";

export const registerUser = async (payload: Partial<IUser>) => {
  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", payload.email);

  if (existingUserError) {
    return {
      success: false,
      message: existingUserError.message,
    };
  }

  if (existingUser && existingUser.length > 0) {
    return {
      success: false,
      message: "User already exists with this email.",
    };
  }

  const hashedPassword = await bcrypt.hash(payload.password || "", 10);
  payload.password = hashedPassword;

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([payload]);

  if (insertError) {
    return {
      success: false,
      Message: insertError.message,
    };
  }

  return {
    success: true,
    message: "User registered successfully.",
  };
};
