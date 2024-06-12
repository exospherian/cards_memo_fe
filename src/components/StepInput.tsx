import { Box, Paper, Stack, Typography, styled } from "@suid/material";
import { Component, Index, JSX, Show, createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";

export type StepInputProps = {
  length: number[];
  onChange: (value: string) => void;
};

const StepHiddenInput = styled("input")({
  position: "absolute",
  width: 0,
  height: 0,
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  border: 0,
});

const StepSpace = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  width: "25px",
  height: "25px",
}));

const StepField = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  verticalAlign: "middle",
  width: "25px",
  height: "25px",
  border: `1px solid transparent`,
  cursor: "pointer",
  "&.active": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export const StepInput: Component<StepInputProps> = (props) => {
  let inputRef: HTMLInputElement | undefined;
  const [store, setStore] = createStore<{
    cursor?: number;
    values: string[][];
  }>({
    values: props.length.map((length) => new Array(length).fill("")),
  });

  const fullLength = () => props.length.reduce((acc, value) => acc + value);

  createEffect(
    on(
      () => store.values,
      (values) => {
        props.onChange(values.map((i) => i.join("")).join(" "));
      }
    )
  );

  const getCursorPosition = () => {
    if (!inputRef?.selectionStart) {
      return 0;
    }
    if (inputRef?.selectionStart >= fullLength()) {
      return inputRef?.selectionStart - 1;
    }
    return inputRef?.selectionStart;
  };

  const onInputHandler: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (
    event
  ) => {
    const value = event.target.value;
    if (value.length > fullLength()) {
      event.target.value = value.slice(0, fullLength());
      return;
    }
    console.log(getCursorPosition());
    const values = props.length.map((length, parentIndex, array) => {
      return new Array(length).fill("").map((value, index) => {
        if (!parentIndex) {
          return event.target.value[index] ?? value;
        }
        const indexPrefix = array
          .slice(0, parentIndex)
          .reduce((acc, value) => acc + value);
        return event.target.value[indexPrefix + index] ?? value;
      });
    });
    setStore({
      cursor: getCursorPosition(),
      values,
    });
  };

  return (
    <Box position="relative">
      <StepHiddenInput
        ref={inputRef}
        type="text"
        tabIndex={0}
        maxLength={fullLength()}
        onBlur={() => inputRef?.focus()}
        onInput={onInputHandler}
      />
      <Stack
        direction="row"
        gap={1}
        flexWrap="wrap"
        justifyContent="center"
        onClick={() => {
          setStore({ cursor: 0 });
          inputRef?.focus();
        }}
      >
        <Index each={store.values}>
          {(value, parentIndex) => {
            return (
              <>
                <Index each={value()}>
                  {(letter, index) => {
                    const currentIndex = !parentIndex
                      ? index
                      : props.length
                          .slice(0, parentIndex)
                          .reduce((acc, value) => acc + value) + index;
                    return (
                      <StepField
                        class={currentIndex === store.cursor ? "active" : ""}
                      >
                        <Typography>{letter().toUpperCase()}</Typography>
                      </StepField>
                    );
                  }}
                </Index>
                <Show when={props.length.length > 1}>
                  <StepSpace />
                </Show>
              </>
            );
          }}
        </Index>
      </Stack>
    </Box>
  );
};
