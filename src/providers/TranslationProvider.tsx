import { ParentProps, Show, createContext, useContext } from "solid-js";
import { createResource } from "solid-js";
import {
  flatten,
  translator,
  resolveTemplate,
  Translator,
} from "@solid-primitives/i18n";
import ISO6391 from "iso-639-1";
import { Dict, Dictionary, Locale } from "../i18n/types";
import { Loader, SelectOptions } from "../components";

async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  const dict: Dict = (await import(`../i18n/${locale}.ts`)).dict;
  return flatten(dict);
}

const TranslationContext = createContext<{
  t: Translator<Dictionary>;
  lang: Locale;
}>(
  {} as {
    t: Translator<Dictionary>;
    lang: Locale;
  }
);

const availableLangCodes = ["en", "ru", "fr", "de", "it", "pl", "es", "pt"];

export const languageOptions: SelectOptions = ISO6391.getLanguages(
  availableLangCodes
).map((val) => ({
  label: val.name,
  value: val.code,
}));

export function TranslationProvider(props: ParentProps<{ lang: Locale }>) {
  const [dict] = createResource(
    () => (availableLangCodes.includes(props.lang) ? props.lang : "en"),
    fetchDictionary
  );

  return (
    <Show when={dict()} fallback={<Loader />}>
      {(dict) => {
        return (
          <TranslationContext.Provider
            value={{ t: translator(dict, resolveTemplate), lang: props.lang }}
          >
            {props.children}
          </TranslationContext.Provider>
        );
      }}
    </Show>
  );
}

export const useTranslation = () => useContext(TranslationContext);
