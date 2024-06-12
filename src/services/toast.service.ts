import axios, { AxiosError, HttpStatusCode } from "axios";
import toast from "solid-toast";

type errorResponse = {
  message: string;
  error: string;
  statusCode: HttpStatusCode;
};

export const ToastService = () => {
  const showError = (e: unknown) => {
    const error = e as Error | AxiosError<errorResponse>;
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message ?? "Something went wrong");
    } else {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const showSuccess = (message?: string) => {
    toast.success(message ?? "complete");
  };

  return {
    showError,
    showSuccess,
  };
};
