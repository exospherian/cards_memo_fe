import { useService } from "solid-services";
import { END_POINT } from "../const/api.const";
import { AuthService } from "./auth.service";
import { ToastService } from "./toast.service";

const enum ROUTES {
  TRANSLATE = "/translate",
}

export type TranslateOptions = {
  from: string;
  to: string;
  text: string;
};

export type TranslateItem = {
  translation: string;
  freq: number;
  pos: string;
};

export type TranslateResponse = {
  transcript?: string;
  translation: TranslateItem[];
};

export const TranslateService = () => {
  const path = `${END_POINT}${ROUTES.TRANSLATE}`;
  const authService = useService(AuthService)();
  const toastService = useService(ToastService)();

  const translate = async (
    options: TranslateOptions
  ): Promise<TranslateResponse | undefined> => {
    try {
      const resp = await authService.axiosJWT.get(path, {
        params: options,
      });
      return resp.data;
    } catch (error: any) {
      toastService.showError(error);
      return;
    }
  };

  return {
    translate,
  };
};
