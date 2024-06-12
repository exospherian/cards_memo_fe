import { useBackButton as BackButton } from "@tma.js/sdk-solid";
import { createSignal } from "solid-js";

export const useBackButton = () => {
  try {
    const bb = BackButton();
    return bb;
  } catch (error) {
    const [bb] = createSignal({
      on: () => {},
      off: () => {},
      show: () => {},
    });
    return bb;
  }
};
