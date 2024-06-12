import {
  DictionaryCreateDto,
  Dictionary,
  DictionaryType,
  DictionaryUpdateDto,
  DictionaryWithWords,
  DictionaryFilter,
} from "../models";
import { END_POINT } from "../const/api.const";
import { useService } from "solid-services";
import { AuthService } from "./auth.service";
import { AxiosResponse } from "axios";
import { createEffect, createResource, createSignal } from "solid-js";
import { ToastService } from "./toast.service";
import { createStore } from "solid-js/store";

const enum ROUTES {
  PRIVATE = "/dictionary",
  PUBLIC = "/public-dictionary/mine",
  GLOBAL = "/public-dictionary",
  GLOBAL_BY_ID = "/public-dictionary/public",
  PUBLISH = "/public-dictionary/publish",
  ADD = "/public-dictionary/add",
  TAGS = "/tag/get-all",
  ACCEPT_SHARE = "/dictionary/accept-share",
}

export const DictionaryService = () => {
  const authService = useService(AuthService)();
  const toastService = useService(ToastService)();
  const [filters, setFilters] = createStore<DictionaryFilter>({
    tags: [],
    from: authService.store.user?.defaultFrom ?? "",
    to: authService.store.user?.defaultTo ?? "",
    limit: 10,
    offset: 0,
  });
  const [type, setType] = createSignal<DictionaryType | undefined>();
  const [dictionaryPayload, setDictionaryPayload] = createSignal<{
    id: string;
    type: DictionaryType;
  }>();
  const [loading, setLoading] = createSignal<boolean>(false);

  const [dictionaries, dictionariesHandlers] = createResource(type, findAll, {
    initialValue: [],
  });
  const [dictionary, dictionaryHandlers] = createResource(
    dictionaryPayload,
    findById
  );

  const [publisher, publisherHandler] = createResource(sendToPublish);
  const [adder, adderHandler] = createResource(addFromPublish);
  const [deleter, deleterHandler] = createResource(remove);

  createEffect(() => {
    setFilters({
      from: authService.store.user?.defaultFrom,
      to: authService.store.user?.defaultTo,
    });
  });

  async function findAll(type: DictionaryType): Promise<Dictionary[]> {
    try {
      if (type === DictionaryType.PUBLIC) {
        const response = await authService.axiosJWT.get<Dictionary[]>(
          `${END_POINT}${ROUTES.PUBLIC}`
        );
        return response.data;
      }
      if (type === DictionaryType.GLOBAL) {
        const response = await authService.axiosJWT.get<Dictionary[]>(
          `${END_POINT}${ROUTES.GLOBAL}`,
          { params: filters }
        );
        return response.data;
      }
      if (type === DictionaryType.PRIVATE) {
        const response = await authService.axiosJWT.get<Dictionary[]>(
          `${END_POINT}${ROUTES.PRIVATE}`
        );
        return response.data;
      }
      return [];
    } catch (error) {
      toastService.showError(error);
      return [];
    }
  }

  async function findById({
    id,
    type,
  }: {
    id: string;
    type: DictionaryType;
  }): Promise<DictionaryWithWords | undefined> {
    try {
      let response: AxiosResponse<DictionaryWithWords>;
      if (type === DictionaryType.PUBLIC) {
        response = await authService.axiosJWT.get<DictionaryWithWords>(
          `${END_POINT}${ROUTES.GLOBAL_BY_ID}/${id}`
        );
        return response.data;
      }
      if (type === DictionaryType.GLOBAL) {
        response = await authService.axiosJWT.get<DictionaryWithWords>(
          `${END_POINT}${ROUTES.GLOBAL_BY_ID}/${id}`
        );
        return response.data;
      }
      if (type === DictionaryType.PRIVATE) {
        response = await authService.axiosJWT.get<DictionaryWithWords>(
          `${END_POINT}${ROUTES.PRIVATE}/${id}`
        );
        return response.data;
      }
      return;
    } catch (error) {
      toastService.showError(error);
    }
  }

  async function create(data: DictionaryCreateDto): Promise<void> {
    setLoading(true);
    try {
      const response = await authService.axiosJWT.post<Dictionary>(
        `${END_POINT}${ROUTES.PRIVATE}`,
        data
      );
      if (type() === DictionaryType.PRIVATE) {
        dictionariesHandlers.mutate((dictionaries) =>
          dictionaries ? [...dictionaries, response.data] : [response.data]
        );
      }
      toastService.showSuccess();
    } catch (error) {
      toastService.showError(error);
    } finally {
      setLoading(false);
    }
  }

  async function update(
    data: DictionaryUpdateDto,
    nested?: boolean
  ): Promise<void> {
    if (!nested) {
      setLoading(true);
    }

    try {
      let response: AxiosResponse<DictionaryWithWords>;
      if (dictionaryPayload()?.type === DictionaryType.PRIVATE) {
        response = await authService.axiosJWT.post<DictionaryWithWords>(
          `${END_POINT}${ROUTES.PRIVATE}/${dictionaryPayload()?.id}`,
          data
        );
      } else {
        response = await authService.axiosJWT.post<DictionaryWithWords>(
          `${END_POINT}${ROUTES.GLOBAL}/${dictionaryPayload()?.id}`,
          data
        );
      }

      const dictionary = response.data;
      dictionariesHandlers.mutate((dictionaries) => {
        const idx = dictionaries.findIndex((d) => d.id === dictionary.id);
        if (~idx) {
          const { words, ...general } = dictionary;
          dictionaries[idx] = general;
        }
        return dictionaries;
      });
      dictionaryHandlers.mutate(() => {
        return response?.data;
      });
      if (!nested) {
        toastService.showSuccess();
      }
    } catch (error: any) {
      toastService.showError(error);
    } finally {
      setLoading(false);
    }
  }

  async function remove(
    _: boolean,
    { refetching }: { refetching: boolean }
  ): Promise<void> {
    if (refetching) {
      try {
        if (dictionaryPayload()?.type === DictionaryType.PRIVATE) {
          await authService.axiosJWT.delete<void>(
            `${END_POINT}${ROUTES.PRIVATE}/${dictionaryPayload()?.id}`
          );
        }
        if (dictionaryPayload()?.type === DictionaryType.PUBLIC) {
          await authService.axiosJWT.delete<void>(
            `${END_POINT}${ROUTES.GLOBAL_BY_ID}/${dictionaryPayload()?.id}`
          );
        }
        dictionariesHandlers.mutate((dictionaries) =>
          dictionaries?.filter(
            (dictionary) => dictionary.id !== dictionaryPayload()?.id
          )
        );
        toastService.showSuccess();
      } catch (error) {
        toastService.showError(error);
      }
    }
  }

  async function sendToPublish(
    _: boolean,
    { refetching }: { refetching: number[] | boolean }
  ): Promise<Dictionary | undefined> {
    if (refetching && refetching instanceof Array) {
      try {
        await update(
          {
            tags: refetching,
          },
          true
        );
        const resalt = await authService.axiosJWT.post<Dictionary>(
          `${END_POINT}${ROUTES.PUBLISH}/${dictionaryPayload()?.id}`
        );
        toastService.showSuccess();
        return resalt.data;
      } catch (error) {
        toastService.showError(error);
      }
    }
  }

  async function addFromPublish(
    _: boolean,
    { refetching }: { refetching: boolean }
  ): Promise<void> {
    if (refetching) {
      try {
        await authService.axiosJWT.post<void>(
          `${END_POINT}${ROUTES.ADD}/${dictionaryPayload()?.id}`
        );
        toastService.showSuccess();
      } catch (error) {
        toastService.showError(error);
      }
    }
  }

  async function acceptShare(id: string) {
    try {
      const response = await authService.axiosJWT.post<DictionaryWithWords>(
        `${END_POINT}${ROUTES.ACCEPT_SHARE}/${id}`
      );
      toastService.showSuccess();
      return response.data;
    } catch (error) {
      toastService.showError(error);
    }
  }

  async function onPublish(tags: number[]) {
    await publisherHandler.refetch(tags);
  }

  async function onAdd() {
    await adderHandler.refetch(true);
  }

  async function onDelete() {
    await deleterHandler.refetch(true);
  }

  async function onAcceptShare(startParams: { dictionaryId: string }) {
    acceptShare(startParams.dictionaryId);
  }

  function updateFilters(filters: DictionaryFilter) {
    setFilters(filters);
    dictionariesHandlers.refetch();
  }

  function onCleanupDictionary() {
    setDictionaryPayload();
    dictionaryHandlers.mutate(() => undefined);
  }

  function onCleanupDictionaries() {
    dictionariesHandlers.mutate(() => []);
  }

  return {
    dictionaries,
    dictionary,
    publisher,
    adder,
    deleter,
    filters,
    onCleanupDictionary,
    onCleanupDictionaries,
    updateFilters,
    dictionaryPayload,
    setDictionaryPayload,
    type,
    loading,
    setType,
    findAll,
    findById,
    update,
    create,
    onPublish,
    onAdd,
    onDelete,
    onAcceptShare,
  };
};
