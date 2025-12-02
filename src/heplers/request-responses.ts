import { IServerActionResponse } from "@/interfaces";
import { success } from "zod";

export const errorResponse = (message: string): IServerActionResponse => {
  return {
    success: false,
    message,
    data: null,
  };
};

export const successResponse = (
  data: any,
  message: string
): IServerActionResponse => {
  return {
    success: true,
    message,
    data: data || null,
  };
};
