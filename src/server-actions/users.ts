"use server";

import supabase from "@/config/supabase-config";
import { errorResponse, successResponse } from "@/heplers/request-responses";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import { email, success } from "zod";
import jwt from "jsonwebtoken";
import { userAgent } from "next/server";
import { cookies } from "next/headers";

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

export const loginUser = async (payload: Partial<IUser>) => {
  const { data: existingUsers, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", payload.email);

  if (existingUserError || !existingUsers || existingUsers.length === 0) {
    return errorResponse("User with this email does not exist.");
  }

  const existingUser = existingUsers[0];

  const isPasswordValid = await bcrypt.compare(
    payload.password || "",
    existingUser.password || ""
  );
  if (!isPasswordValid) {
    return errorResponse("Invalid password.");
  }

  // add role permission

  const token = jwt.sign(
    { userId: existingUser.id },
    process.env.JWT_SECRET || "",
    { expiresIn: "1d" }
  );

  return successResponse({ token }, "User logged in successfully.");
};

export const getLoggedInUser = async () => {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;

  const decryptedTokenData: any = jwt.verify(
    jwtToken!,
    process.env.JWT_SECRET || ""
  );

  if (!decryptedTokenData) {
    return errorResponse("Invalid token");
  }

  const userId = decryptedTokenData.userId;

  const { data: users, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);

  if (userError || !users || users.length === 0) {
    return errorResponse("User not found.");
  }

  const user = users[0];
  delete user.password;
  return successResponse(user, "User fetched successfully.");
};
