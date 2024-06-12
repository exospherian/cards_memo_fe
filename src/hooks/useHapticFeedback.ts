import { useHapticFeedback as HapticFeedback } from "@tma.js/sdk-solid";
import { createSignal } from "solid-js";

export const useHapticFeedback = () => {
  try {
    const hf = HapticFeedback();
    return hf;
  } catch (error) {
    const [hf] = createSignal({
      impactOccurred: () => {},
    });
    return hf;
  }
};
