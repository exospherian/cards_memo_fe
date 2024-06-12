import { END_POINT } from "../const/api.const";
import { useService } from "solid-services";
import { AuthService } from "./auth.service";
import { Tag } from "../models";
import { ToastService } from "./toast.service";
import { createResource } from "solid-js";

const enum ROUTES {
  FIND_ALL = "/tag/get-all",
}

export const TagsService = () => {
  const authService = useService(AuthService)();
  const toastService = useService(ToastService)();
  const [tags, { refetch }] = createResource<Tag[]>(findAll);

  async function findAll(): Promise<Tag[]> {
    try {
      const response = await authService.axiosJWT.get<Tag[]>(
        `${END_POINT}${ROUTES.FIND_ALL}`
      );

      return response.data;
    } catch (error) {
      toastService.showError(error);
      return [];
    }
  }

  return {
    tags,
    refetch,
  };
};
