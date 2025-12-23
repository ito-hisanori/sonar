import { ServerActionResponse } from "@/interfaces";

export const errorResponse = (message: string): ServerActionResponse => {
  return {
    success: false,
    message,
    data: null,
  };
};

export const successResponse = (
  data: any,
  message: string
): ServerActionResponse => {
  return {
    success: true,
    message,
    data: data || null,
  };
};
