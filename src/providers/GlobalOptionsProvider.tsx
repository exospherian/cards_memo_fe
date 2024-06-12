import { ParentProps, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

interface GlobalOptionsStore {
  options: { label: string; action: VoidFunction }[];
}

const GlobalOptionsContext = createContext<
  [get: GlobalOptionsStore, set: SetStoreFunction<GlobalOptionsStore>]
>(
  createStore<GlobalOptionsStore>({
    options: [],
  })
);

export function GlobalOptionsProvider(props: ParentProps) {
  const headerStore = createStore<GlobalOptionsStore>({
    options: [],
  });

  return (
    <GlobalOptionsContext.Provider value={headerStore}>
      {props.children}
    </GlobalOptionsContext.Provider>
  );
}

export const useGlobalOptions = () => useContext(GlobalOptionsContext);
