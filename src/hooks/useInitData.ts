import { useInitData as initData } from "@tma.js/sdk-solid";
import { createSignal } from "solid-js";

export const useInitData = () => {
  try {
    const initD = initData();
    return initD;
  } catch (error) {
    const [initD] = createSignal({ user: null, startParam: "" });
    return initD;
  }
};
