import { Outlet, useParams } from "@solidjs/router";
import { DictionaryService } from "../services";
import { Show, onCleanup, onMount } from "solid-js";
import { useService } from "solid-services";
import { DictionaryType } from "models";
import { Loader } from "../components";

export const DictionaryResolver = () => {
  const params = useParams<{ id: string; type: DictionaryType }>();
  const dictionaryService = useService(DictionaryService);

  onMount(() => {
    if (params.id && params.type) {
      dictionaryService().setDictionaryPayload({
        id: params.id,
        type: params.type,
      });
    }
  });

  onCleanup(() => {
    dictionaryService().onCleanupDictionary();
  });

  return (
    <Show when={!dictionaryService().dictionary.loading} fallback={<Loader />}>
      <Outlet></Outlet>
    </Show>
  );
};
