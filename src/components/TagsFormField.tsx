import { Field, getError, setValue, validate } from "@modular-forms/solid";
import { Box, Chip, Stack, Typography } from "@suid/material";
import { Tag } from "../models";
import { For, Show } from "solid-js";

type FieldProps = {
  label: string;
  form: any;
  name: any;
  validate?: any;
  tags: Tag[];
  required?: boolean;
  disabled?: boolean;
};

export function TagsFormField(props: FieldProps) {
  const error = () => getError(props.form, props.name);

  const onClick = (id: number, values: number[]) => {
    if (values?.includes(id)) {
      setValue(
        props.form,
        props.name,
        values.filter((value) => value !== id) ?? undefined
      );
    } else {
      setValue(props.form, props.name, [...values, id]);
    }
    validate(props.form, props.name);
  };

  return (
    <Box>
      <Stack direction="row" gap={1} alignItems="end">
        <Typography
          variant="h6"
          color={error() ? "error.main" : "text.secondary"}
        >
          {`${props.label} ${props.required ? "*" : ""}`}
        </Typography>
        <Show when={error()}>
          <Typography variant="subtitle2" color="error.main">
            {error()}
          </Typography>
        </Show>
      </Stack>
      <For each={props.tags}>
        {(tag) => (
          <Box paddingLeft={1}>
            <Typography variant="subtitle1" color="text.secondary">
              {tag.name}
            </Typography>
            <Stack paddingLeft={1} direction="row" gap={1} flexWrap="wrap">
              <For each={tag.tags}>
                {(subTag) => (
                  <Field
                    type="string[]"
                    of={props.form}
                    name={props.name}
                    validate={props.validate}
                  >
                    {(field) => {
                      const value = () => field.value as number[];
                      return (
                        <Chip
                          label={subTag.name}
                          size="medium"
                          variant="filled"
                          color={
                            value().includes(subTag.id) ? "success" : "default"
                          }
                          onClick={() => {
                            onClick(subTag.id, value());
                          }}
                        />
                      );
                    }}
                  </Field>
                )}
              </For>
            </Stack>
          </Box>
        )}
      </For>
    </Box>
  );
}
