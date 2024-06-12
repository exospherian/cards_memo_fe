import { BaseWrapper } from "../../components";
import { DictionaryService, StudyService } from "../../services";
import { Component, Show, createEffect, onCleanup } from "solid-js";
import { useService } from "solid-services";
import { CircularProgress } from "@suid/material";
import { Study } from "./Study";
import { useNavigator } from "../../providers";

const DictionaryStudy: Component = () => {
  const navigator = useNavigator();
  const studyService = useService(StudyService);
  const dictionaryService = useService(DictionaryService);

  createEffect(() => {
    const words = dictionaryService().dictionary()?.words;
    if (words) {
      studyService().initInternal(words);
    }
  });

  onCleanup(() => {
    studyService().cleanProgress();
  });

  return (
    <BaseWrapper>
      <Show
        when={
          !studyService().store.loading &&
          !dictionaryService().dictionary.loading
        }
        fallback={
          <CircularProgress sx={{ alignSelf: "center" }} color="primary" />
        }
      >
        <Study onComplete={() => navigator?.back()} />
      </Show>
    </BaseWrapper>
  );
};

export default DictionaryStudy;
