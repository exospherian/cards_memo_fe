import { MainButton } from "../../components";
import { EXERSIZE, StudyService } from "../../services";
import {
  Component,
  Match,
  Show,
  Switch,
  createEffect,
  createSignal,
  on,
} from "solid-js";
import { useService } from "solid-services";
import { Button, CircularProgress } from "@suid/material";
import {
  Flashcard,
  Listening,
  Matching,
  Spelling,
} from "../../components/exersizes";
import { useTranslation } from "../../providers";

type StudyProps = {
  onComplete: () => void;
  global?: boolean;
};

export const Study: Component<StudyProps> = (props) => {
  const studyService = useService(StudyService);
  const translation = useTranslation();
  const [result, setResult] = createSignal(false);
  const [complexResult, setComplexResult] = createSignal<Map<string, boolean>>(
    new Map()
  );
  const [exersize, setExersize] = createSignal(EXERSIZE.FLASH_CARD);

  const word = () => studyService().word();

  const chunk = () => studyService().chunk();

  const availableExersizes = () => studyService().getAvailableBaseExersizes();

  const isLastWordInChunk = () => studyService().isLastWordInChunk();

  const isLastWord = () => studyService().isLastWord();

  createEffect(
    on(word, () => {
      setExersize(props.global ? EXERSIZE.FLASH_CARD : EXERSIZE.LISTENING);
    })
  );

  createEffect(
    on(exersize, () => {
      setResult(false);
      setComplexResult(new Map());
    })
  );

  const nextExersize = () => {
    const exersizes = availableExersizes();
    if (exersizes.length) {
      return setExersize(exersizes[0]);
    }
    if (isLastWordInChunk()) {
      return setExersize(EXERSIZE.MATCHING);
    }
    if (isLastWord()) {
      return props.onComplete();
    }
    studyService().nextWord();
  };

  const onCompleteBaseExersizes = () => {
    studyService().completeBaseExersizes();
    if (isLastWordInChunk()) {
      return setExersize(
        props.global ? EXERSIZE.FLASH_CARD : EXERSIZE.LISTENING
      );
    }
    if (isLastWord()) {
      return props.onComplete();
    }
    studyService().nextWord();
  };

  const onCompleteExersize = () => {
    if (studyService().isComplexExersize(exersize())) {
      studyService().completeComplexExersize(exersize(), complexResult());
      if (isLastWord()) {
        return props.onComplete();
      }
      return studyService().nextWord();
    }
    studyService().completeBaseExersize(exersize(), result());
    nextExersize();
  };

  return (
    <Show
      when={!studyService().store.loading && word()}
      fallback={
        <CircularProgress sx={{ alignSelf: "center" }} color="primary" />
      }
    >
      <Switch>
        <Match when={exersize() === EXERSIZE.FLASH_CARD}>
          <Flashcard word={word()} />
        </Match>
        <Match when={exersize() === EXERSIZE.LISTENING}>
          <Listening word={word()} onChange={(result) => setResult(result)} />
        </Match>
        <Match when={exersize() === EXERSIZE.MATCHING}>
          <Matching
            words={chunk()}
            onChange={(result) => setComplexResult(result)}
          />
        </Match>
        <Match when={exersize() === EXERSIZE.SPELLING}>
          <Spelling word={word()} onChange={(result) => setResult(result)} />
        </Match>
      </Switch>
      <MainButton
        text={translation.t("study.button")}
        onClick={() => onCompleteExersize()}
        hide={exersize() === EXERSIZE.FLASH_CARD}
      />
      <Show when={exersize() === EXERSIZE.FLASH_CARD}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onCompleteBaseExersizes()}
        >
          {translation.t("study.flashCard.apply")}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => nextExersize()}
        >
          {translation.t("study.flashCard.reject")}
        </Button>
      </Show>
    </Show>
  );
};
