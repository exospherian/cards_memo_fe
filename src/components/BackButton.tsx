import { useBackButton } from "../hooks";
import { useNavigator } from "../providers";
import { Component, Show, onCleanup, onMount } from "solid-js";
import { ArrowBackIosNew } from "@suid/icons-material";
import { IconButton } from "@suid/material";

type BackButtonProps = {
  onClick: VoidFunction;
};

export const BackButton: Component<BackButtonProps> = (props) => {
  const backButton = useBackButton();
  const navigator = useNavigator();

  const onClick = () => {
    setTimeout(() => {
      props.onClick();
    }, 0);
  };

  onMount(() => {
    backButton().on("click", onClick);
    navigator?.detach();
  });

  onCleanup(() => {
    backButton().off("click", onClick);
    navigator?.attach();
  });

  return (
    <Show when={!backButton}>
      <IconButton color="secondary" aria-label="add an alarm">
        <ArrowBackIosNew />
      </IconButton>
    </Show>
  );
};
