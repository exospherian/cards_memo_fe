// import { setDebug } from "@tma.js/sdk";
import { InitOptions, SDKProvider, useSDKContext } from "@tma.js/sdk-solid";
import { Match, Switch, createMemo } from "solid-js";
import { App } from "./App";
import { Loader } from "./components";
import { Router } from "@solidjs/router";
import { NavigatorProvider } from "./providers";

function SDKLoader() {
  const { loading, error, initResult } = useSDKContext();
  const errorMessage = createMemo(() => {
    const err = error();
    if (!err) {
      return null;
    }

    return err instanceof Error ? err.message : "Unknown error";
  });

  return (
    <Switch
      fallback={
        <NavigatorProvider>
          <App />
        </NavigatorProvider>
      }
    >
      <Match when={errorMessage()}>
        <Router>
          <App />
        </Router>
      </Match>
      <Match when={loading()}>
        <Loader />
      </Match>
      <Match when={!loading() && !error() && !initResult()}>
        <div>SDK init function is not yet called.</div>
      </Match>
    </Switch>
  );
}

export function Root() {
  const options: InitOptions = {
    async: true,
    cssVars: true,
    acceptCustomStyles: true,
  };

  // setDebug(true);

  return (
    <SDKProvider options={options}>
      <SDKLoader />
    </SDKProvider>
  );
}
