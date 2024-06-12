import { useService } from "solid-services";
import { END_POINT } from "../const/api.const";
import { AuthService } from "./auth.service";
import { ToastService } from "./toast.service";

const enum ROUTES {
  SOUND = "/sound",
}

export type SoundOptions = {
  from: string;
  text: string;
};

export const SoundService = () => {
  const path = `${END_POINT}${ROUTES.SOUND}`;
  const authService = useService(AuthService)();
  const toastService = useService(ToastService)();

  const getSound = async (options: SoundOptions): Promise<string> => {
    try {
      const resp = await authService.axiosJWT.get(path, {
        params: options,
        responseType: "arraybuffer",
      });
      const blob = new Blob([resp.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      return audioUrl;
    } catch (error: any) {
      toastService.showError(error);
      return "";
    }
  };

  return {
    getSound,
  };
};
