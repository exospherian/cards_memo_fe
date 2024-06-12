import { MainButtonParams, RGB } from "@tma.js/sdk";
import { useMainButton as MainButton } from "@tma.js/sdk-solid";
import { createSignal } from "solid-js";

class FakeMainButton {
  public isEnabled: boolean = true;
  public isLoaderVisible = true;
  public isVisible = true;
  public backgroundColor: RGB = `#${""}`;
  public text = "";
  public textColor: RGB = `#${""}`;

  disable() {
    return this;
  }

  enable() {
    return this;
  }

  hide() {
    return this;
  }
  /**
   * Hides the Main Button loader.
   */
  hideLoader() {
    return this;
  }

  on() {}
  off() {}

  show() {
    return this;
  }

  showLoader() {
    return this;
  }

  setText(text: string) {
    this.text = text;
    return this;
  }

  setTextColor(textColor: RGB) {
    this.textColor = textColor;
    return this;
  }

  setBackgroundColor(backgroundColor: RGB) {
    this.backgroundColor = backgroundColor;
  }

  setParams(_: MainButtonParams) {
    return this;
  }
}

export const useMainButton = () => {
  try {
    const mb = MainButton();
    return mb;
  } catch (error) {
    return createSignal(new FakeMainButton())[0];
  }
};
