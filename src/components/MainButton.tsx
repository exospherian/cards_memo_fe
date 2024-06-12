import { RGB } from "@tma.js/sdk";
import { useHapticFeedback, useMainButton } from "../hooks";
import {
  Component,
  Show,
  createEffect,
  on,
  onCleanup,
  onMount,
} from "solid-js";
import { Button } from "@suid/material";

type MainButtonProps = {
  color?: RGB;
  text: string;
  onClick: VoidFunction;
  loading?: boolean;
  hide?: boolean;
};

export const MainButton: Component<MainButtonProps> = (props) => {
  const mainButton = useMainButton();
  const hapticFeedback = useHapticFeedback();

  onMount(() => {
    mainButton().on("click", onClickHandler);
  });

  onCleanup(() => {
    mainButton().off("click", onClickHandler);
  });

  createEffect(
    on(
      () => props.text,
      (text) => {
        mainButton().setText(text);
      }
    )
  );

  createEffect(
    on(
      () => props.color,
      (color) => {
        if (color) mainButton().setBackgroundColor(color);
      }
    )
  );

  createEffect(
    on(
      () => props.hide,
      (hide) => {
        if (hide) {
          mainButton().hide();
        } else {
          mainButton().show();
        }
      }
    )
  );

  createEffect(
    on(
      () => props.loading,
      (loading) => {
        if (loading) {
          mainButton().disable().showLoader();
        } else {
          mainButton().enable().hideLoader();
        }
      }
    )
  );

  const onClickHandler = () => {
    hapticFeedback().impactOccurred("medium");
    props.onClick();
  };

  return (
    <Show when={!mainButton()}>
      <Button variant="contained" onClick={props.onClick}>
        {props.text}
      </Button>
    </Show>
  );
};
