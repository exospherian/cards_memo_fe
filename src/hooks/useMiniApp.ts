import { useMiniApp as MiniApp } from "@tma.js/sdk-solid";
import { createSignal } from "solid-js";

export const useMiniApp = () => {
  try {
    const mapp = MiniApp();
    return mapp;
  } catch (error) {
    const [mapp] = createSignal({ ready: () => {} });
    return mapp;
  }
};
