import { useInitDataRaw as InitDataRaw } from "@tma.js/sdk-solid";
import { createSignal } from "solid-js";

export const useInitDataRaw = () => {
  try {
    const initDRaw = InitDataRaw();
    return initDRaw;
  } catch (error) {
    const [initDRaw] = createSignal("");
    return initDRaw;
  }
};
