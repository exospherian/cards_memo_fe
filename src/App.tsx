import { Route, Routes } from "@solidjs/router";
import { Component, ErrorBoundary, onMount } from "solid-js";
import { useMiniApp } from "./hooks";
import { lazy } from "solid-js";
import { ServiceRegistry } from "solid-services";
import { Toaster } from "solid-toast";
import { DictionaryResolver, MainResolver } from "./resolvers";
// import eruda from "eruda";

const General = lazy(() => import("./pages/General"));
const Dictionaries = lazy(() => import("./pages/Dictionaries"));
const PublicDictionaries = lazy(() => import("./pages/PublicDictionaries"));
const AddEditDictionary = lazy(
  () => import("./pages/AddEditDictionary/AddEditDictionary")
);
const Dictionary = lazy(() => import("./pages/Dictionary"));
const DictionaryStudy = lazy(() => import("./pages/study/DictionaryStudy"));
const GlobalStudy = lazy(() => import("./pages/study/GlobalStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const App: Component = () => {
  const miniApp = useMiniApp();

  onMount(() => {
    miniApp().ready();
    // eruda.init();
  });

  return (
    <ServiceRegistry>
      <ErrorBoundary fallback={(err) => err}>
        <Routes>
          <Route path="/" component={MainResolver}>
            <Route path="/" component={General} />
            <Route path="dictionary">
              <Route path={["/:type/:id"]} component={DictionaryResolver}>
                <Route path="/" component={Dictionary} />
                <Route path={"study"} component={DictionaryStudy} />
                <Route path={"edit"} component={AddEditDictionary} />
              </Route>
              <Route path={"add"} component={AddEditDictionary} />
            </Route>
            <Route path="unit" />
            <Route path="dictionaries" component={Dictionaries} />
            <Route path="public-dictionaries" component={PublicDictionaries} />
            <Route path="global-study" component={GlobalStudy} />
            <Route path="progress" component={NotFound} />
            <Route path="contacts" component={NotFound} />
          </Route>
          <Route path="**" component={NotFound} />
        </Routes>
      </ErrorBoundary>

      <Toaster
        containerClassName="toaster"
        position="bottom-center"
        gutter={8}
      />
    </ServiceRegistry>
  );
};
