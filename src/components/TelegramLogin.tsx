import { onMount } from "solid-js";

declare global {
  interface Window {
    TelegramLoginWidget: {} | undefined;
  }
}

export interface WebWidgetInitData {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  photo_url: string;
  username: string;
}

interface Props {
  botName: string;
  usePic?: boolean;
  className?: string;
  cornerRadius?: number;
  requestAccess?: boolean;
  onAuth: (user: string) => void;
  buttonSize?: "large" | "medium" | "small";
}

export const TelegramLogin = (props: Props) => {
  let ref: HTMLDivElement | undefined;

  const {
    usePic = false,
    botName,
    className,
    buttonSize = "large",
    onAuth,
    cornerRadius,
    requestAccess = true,
  } = props;

  const convertInitData = (data: WebWidgetInitData): string => {
    return Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  onMount(() => {
    if (!ref) return;

    window.TelegramLoginWidget = {
      dataOnauth: (user: WebWidgetInitData) => onAuth(convertInitData(user)),
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString());
    }

    if (requestAccess) {
      script.setAttribute("data-request-access", "write");
    }

    script.setAttribute("data-userpic", usePic.toString());
    script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");
    script.async = true;

    ref.appendChild(script);
  });

  return <div ref={ref} class={className} />;
};
