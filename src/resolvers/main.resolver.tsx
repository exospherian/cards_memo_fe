import { Outlet } from "@solidjs/router";
import { Box, ThemeProvider, createPalette, createTheme } from "@suid/material";
import { useThemeParams, useViewport } from "@tma.js/sdk-solid";
import { Loader } from "../components";
import { Locale } from "i18n/types";
import { Header } from "../layout/Header/Header";
import { GlobalOptionsProvider, TranslationProvider } from "../providers";
import { AuthService, DictionaryService, TagsService } from "../services";
import { Component, Show, createEffect, createMemo, onMount } from "solid-js";
import { useService } from "solid-services";
import { Transition } from "solid-transition-group";
import { useInitData } from "../hooks";

export const MainResolver: Component = () => {
  const authService = useService(AuthService);
  const tagsService = useService(TagsService);
  const dictionaryService = useService(DictionaryService);
  const themeParams = useThemeParams();
  const viewPort = useViewport();
  const initData = useInitData();
  const store = () => authService().store;

  const enter = (el: Element, done: VoidFunction) => {
    const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
    a.finished.then(done);
    done();
  };

  const exit = (_: Element, done: VoidFunction) => {
    done();
  };

  onMount(() => {
    viewPort().expand();
    authService().tgLogin();
  });

  createEffect(() => {
    const params: string = atob(initData()?.startParam ?? "");

    if (authService().store.access && params) {
      const startParams: {
        dictionaryId: string;
      } = JSON.parse(params);
      dictionaryService().onAcceptShare(startParams);
    }
  });

  createEffect(() => {
    if (authService().isAuthenticated()) {
      tagsService().refetch();
    }
  });

  const palette = createMemo(() =>
    createPalette({
      mode: themeParams().isDark ? "dark" : "light",
      primary: {
        light: themeParams().buttonColor,
        main: themeParams().buttonColor,
        dark: themeParams().buttonColor,
        contrastText: themeParams().buttonTextColor, //button text
      },
      secondary: {
        light: themeParams().secondaryBackgroundColor,
        main: themeParams().secondaryBackgroundColor,
        dark: themeParams().secondaryBackgroundColor,
        contrastText: themeParams().buttonTextColor,
      },
      error: {
        light: themeParams().destructiveTextColor,
        main: themeParams().destructiveTextColor,
        dark: themeParams().destructiveTextColor,
        contrastText: themeParams().buttonTextColor,
      },
      text: {
        primary: themeParams().textColor,
        secondary: themeParams().hintColor,
        disabled: themeParams().hintColor,
      },
      background: {
        paper: themeParams().secondaryBackgroundColor,
        default: themeParams().backgroundColor,
      },
      action: {
        focus: themeParams().buttonColor,
      },
    })
  );

  const theme = createTheme({
    palette,
  });

  return (
    <Show fallback={<Loader />} when={authService().isAuthenticated()}>
      <TranslationProvider lang={store()?.user?.lang as Locale}>
        <GlobalOptionsProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header />
              <Transition onEnter={enter} onExit={exit}>
                <Outlet />
              </Transition>
            </Box>
          </ThemeProvider>
        </GlobalOptionsProvider>
      </TranslationProvider>
    </Show>
  );
};
