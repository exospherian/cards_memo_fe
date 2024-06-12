import {
  Field,
  FieldArray,
  FormStore,
  required,
  setValue,
} from "@modular-forms/solid";
import { Button, Paper } from "@suid/material";
import { DictionaryForm } from "../../models";
import { Component, For, Setter, Show, createSignal } from "solid-js";
import { useTranslation } from "../../providers";
import { useService } from "solid-services";
import { TranslateService } from "../../services";
import { MultipleInputField, TextFormField } from "../../components";

type WordFormContentProps = {
  form: FormStore<DictionaryForm, undefined>;
  name: "updatedWords" | "createdWords";
  onRemove: (index: number) => void;
  from: string;
  to: string;
};

export const WordFormContent: Component<WordFormContentProps> = (props) => {
  const translation = useTranslation();
  const translateService = useService(TranslateService)();

  const onTranslateHandler = async (
    value: string,
    index: number,
    setTranslations: Setter<string[]>,
    setLoading: Setter<boolean>
  ) => {
    if (value) {
      setLoading(true);
      const translate = await translateService.translate({
        from: props.from,
        to: props.to,
        text: value,
      });
      if (translate?.transcript) {
        setValue(
          props.form,
          `${props.name}.${index}.transcription`,
          translate.transcript
        );
      }
      if (translate?.translation) {
        const t = translate.translation.map((t) => t.translation);
        setTranslations(t);
        if (t[0]) {
          setValue(props.form, `${props.name}.${index}.to`, t[0]);
        }
      }
      setLoading(false);
    } else {
      setTranslations([]);
    }
  };

  return (
    <FieldArray of={props.form} name={props.name}>
      {(fieldArray) => (
        <For each={fieldArray.items}>
          {(_, index) => {
            const [translations, setTranslations] = createSignal<string[]>([]);
            const [loading, setLoading] = createSignal<boolean>(false);
            return (
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: 2,
                }}
              >
                <Show when={props.name === "updatedWords"}>
                  <Field
                    of={props.form}
                    name={`${fieldArray.name as "updatedWords"}.${index()}.id`}
                  >
                    {() => <></>}
                  </Field>
                </Show>
                <TextFormField
                  form={props.form}
                  name={`${fieldArray.name}.${index()}.from`}
                  label={`${translation.t(
                    "addEditDictionary.words.form.from.label"
                  )} (${props.from})`}
                  onBlur={(value) => {
                    onTranslateHandler(
                      value,
                      index(),
                      setTranslations,
                      setLoading
                    );
                  }}
                  required={translation.t(
                    "addEditDictionary.words.form.from.error"
                  )}
                />
                <Field
                  of={props.form}
                  name={`${fieldArray.name}.${index()}.to`}
                  validate={[
                    required(
                      translation.t("addEditDictionary.words.form.to.error")
                    ),
                  ]}
                >
                  {(field, fieldProps) => {
                    return (
                      <MultipleInputField
                        options={translations()}
                        value={field.value}
                        onChange={(value) =>
                          setValue(props.form, field.name, value)
                        }
                        onBlur={(e) => {
                          fieldProps.onBlur(e);
                        }}
                        label={`${translation.t(
                          "addEditDictionary.words.form.to.label"
                        )} (${props.to})`}
                        error={field.error}
                        loading={loading()}
                        required
                      />
                    );
                  }}
                </Field>
                <TextFormField
                  form={props.form}
                  name={`${fieldArray.name}.${index()}.transcription`}
                  label={translation.t(
                    "addEditDictionary.words.form.transcription"
                  )}
                  loading={loading()}
                />
                <TextFormField
                  form={props.form}
                  name={`${fieldArray.name}.${index()}.description`}
                  label={translation.t(
                    "addEditDictionary.words.form.description"
                  )}
                  maxRows={4}
                  multiline
                />
                <Button
                  variant="contained"
                  onClick={() => props.onRemove(index())}
                  color="error"
                >
                  {translation.t("addEditDictionary.words.form.deleteButton")}
                </Button>
              </Paper>
            );
          }}
        </For>
      )}
    </FieldArray>
  );
};
