import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  styled,
} from "@suid/material";
import { Word } from "../../models";
import {
  Component,
  For,
  Show,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
} from "solid-js";
import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";
import { shuffleArray } from "../../utils/transforms";
import { Clue } from "../Clue";
import { Droppable } from "../Droppable";
import { Draggable } from "../Draggable";
import { useTranslation } from "../../providers";

type MatchingProps = {
  words: Word[];
  onChange: (result: Map<string, boolean>) => void;
};

type FromViewData = {
  word: Word;
  answerWord?: Word;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  margin: 0,
  border: "1px solid transparent",
  overflow: "hidden",
  "&.drag": {
    cursor: "pointer",
    background: theme.palette.primary.main,
  },
  "&.drop": {
    border: "1px dashed",
    backgroundImage: "none",
    backgroundColor: "inherit",
  },
}));

export const Matching: Component<MatchingProps> = (props) => {
  const toWordsContainerId = createUniqueId();
  const translation = useTranslation();
  const [toWordsView, setToWordsView] = createSignal<Map<string, Word>>(
    new Map()
  );
  const [fromWordsView, setFromWordsView] = createSignal<
    Map<string, FromViewData>
  >(new Map());

  onMount(() => {
    window.addEventListener("touchstart", handleСollapseTouchMove, {
      passive: false,
    });
    window.addEventListener("touchmove", handleСollapseTouchMove, {
      passive: false,
    });
    const fromArray: [string, FromViewData][] = [];
    const toArray: [string, Word][] = [];
    for (let word of props.words) {
      fromArray.push([createUniqueId(), { word }]);
      toArray.push([createUniqueId(), word]);
    }

    shuffleArray(fromArray);
    shuffleArray(toArray);

    setFromWordsView(new Map(fromArray));
    setToWordsView(new Map(toArray));
  });

  onCleanup(() => {
    removeEventListener("touchmove", handleСollapseTouchMove);
    removeEventListener("touchstart", handleСollapseTouchMove);
  });

  createEffect(() => {
    const result = new Map<string, boolean>();
    fromWordsView().forEach((value) => {
      result.set(value.word.id, value.word.id === value.answerWord?.id);
    });
    props.onChange(result);
  });

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (!draggable || !droppable) return;
    const dragData = draggable.data as Word;
    const dragId = draggable.id.toString();
    const dropId = droppable.id.toString();
    const fromDropView = fromWordsView().get(dropId);
    const fromDragView = fromWordsView().get(dragId);

    if (dropId === toWordsContainerId && fromDragView) {
      if (!toWordsView().has(dragId)) {
        setFromWordsView((prevView) => {
          prevView.set(dragId, { ...fromDragView, answerWord: undefined });
          return new Map(prevView);
        });
        setToWordsView((prevView) => {
          prevView.set(createUniqueId(), dragData);
          return new Map(prevView);
        });
      }
      return;
    }

    if (fromDragView && fromDropView) {
      setFromWordsView((prevView) => {
        prevView.set(dropId, {
          ...fromDropView,
          answerWord: fromDragView.answerWord,
        });
        prevView.set(dragId, {
          ...fromDragView,
          answerWord: fromDropView.answerWord,
        });
        return new Map(prevView);
      });
      return;
    }
    if (fromDropView) {
      setFromWordsView((prevView) => {
        prevView.set(dropId, { ...fromDropView, answerWord: dragData });
        return new Map(prevView);
      });
      setToWordsView((prevView) => {
        prevView.delete(dragId);
        return new Map(prevView);
      });
    }
  };

  function handleСollapseTouchMove(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Clue text={translation.t("study.matching.clue")} />
      <DragDropProvider onDragEnd={onDragEnd}>
        <DragDropSensors>
          <Grid container spacing={2}>
            <For each={[...fromWordsView().entries()]}>
              {([id, fromView]) => {
                return (
                  <Grid container item columnSpacing={1}>
                    <Grid item xs={6}>
                      <Item>{fromView.word.from}</Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Droppable id={id} data={fromView.word}>
                        <Show
                          when={fromView.answerWord}
                          fallback={
                            <Item class="drop">
                              {translation.t("study.matching.place")}
                            </Item>
                          }
                        >
                          <Draggable id={id} data={fromView.answerWord!}>
                            <Item class="drag">{fromView.answerWord?.to}</Item>
                          </Draggable>
                        </Show>
                      </Droppable>
                    </Grid>
                  </Grid>
                );
              }}
            </For>
          </Grid>

          <Card
            sx={{
              overflow: "unset",
              flex: 1,
              display: "flex",
              "& .droppable": {
                flex: 1,
              },
            }}
          >
            <Droppable id={toWordsContainerId}>
              <CardContent>
                <Stack direction="row" sx={{ gap: 1 }} flexWrap="wrap">
                  <For each={[...toWordsView().entries()]}>
                    {([id, toView]) => {
                      return (
                        <Draggable id={id} data={toView}>
                          <Item class="drag">{toView?.to}</Item>
                        </Draggable>
                      );
                    }}
                  </For>
                </Stack>
              </CardContent>
            </Droppable>
          </Card>
        </DragDropSensors>
      </DragDropProvider>
    </Box>
  );
};
