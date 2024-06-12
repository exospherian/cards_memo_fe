import axios from "axios";
import { END_POINT } from "../const/api.const";
import { createStore } from "solid-js/store";
import { useInitDataRaw } from "../hooks";
import { jwtDecode } from "jwt-decode";
import { onMount } from "solid-js";
import { useService } from "solid-services";
import { ToastService } from "./toast.service";

const enum ROUTES {
  SIGN_UP = "/auth/sign-up",
  SIGN_IN = "/auth/sign-in",
  REFRESH = "/auth/refresh",
  LOGOUT = "/auth/logout",
  HARD_LOGOUT = "/auth/hard-logout",
  PASSWORD_RECOVERY_REQUEST = "/auth/password-recovery-request",
  PASSWORD_RECOVERY = "/auth/password-recovery",
  TG_LOGIN = "/auth-tg/login",
  USER = "/user",
  SETTINGS = "/user/setting",
}

export type Settings = {
  defaultFrom: "string";
  defaultTo: "string";
};

export type User = Settings & {
  id: "string";
  nickname: "string";
  lang: "string";
};

type AuthResponse = {
  access: string;
  refresh: string;
};

type AuthStore = {
  access: string | null;
  refresh: string | null;
  user: User | null;
  loading: boolean;
};

export const AuthService = () => {
  const initDataRaw = useInitDataRaw();
  const toastService = useService(ToastService)();
  const axiosJWT = axios.create();
  const [store, setStore] = createStore<AuthStore>({
    access: null,
    user: null,
    refresh: null,
    loading: false,
  });

  onMount(() => {
    axiosJWT.interceptors.request.use(
      async (config) => {
        if (store.access && store.refresh) {
          const decodedToken = jwtDecode(store.access);
          const currentDate = new Date();
          if (decodedToken.exp) {
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
              await refresh();
            }
            config.headers["authorization"] = "Bearer " + store.access;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  });

  const refresh = async (): Promise<void> => {
    try {
      const resp = await axios.post<AuthResponse>(
        `${END_POINT}${ROUTES.REFRESH}`,
        {
          token: store.refresh,
        }
      );
      setStore(() => ({
        ...resp.data,
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const tgLogin = async (): Promise<void> => {
    try {
      const resp = await axios.post<AuthResponse>(
        `${END_POINT}${ROUTES.TG_LOGIN}`,
        {
          initDataRaw: initDataRaw(),
        }
      );

      setStore({
        ...resp.data,
      });
      const user = await getUserInfo();
      setStore({
        user,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getUserInfo = async (): Promise<User | null> => {
    try {
      const response = await axiosJWT.get<User>(`${END_POINT}${ROUTES.USER}`);

      return response.data;
    } catch (error) {
      toastService.showError(error);
      return null;
    }
  };

  async function updateSettings(payload: Settings): Promise<void> {
    setStore({ loading: true });
    try {
      const response = await axiosJWT.post<User>(
        `${END_POINT}${ROUTES.SETTINGS}`,
        payload
      );

      setStore(() => ({
        user: response.data,
      }));
      toastService.showSuccess();
    } catch (error) {
      toastService.showError(error);
    } finally {
      setStore({ loading: false });
    }
  }

  const isAuthenticated = () => store.access && store.user;

  return {
    store,
    axiosJWT,
    tgLogin,
    refresh,
    isAuthenticated,
    updateSettings,
  };
};
