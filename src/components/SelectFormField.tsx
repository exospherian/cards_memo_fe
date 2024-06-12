import {
  Field,
  FieldPathValue,
  FormStore,
  Maybe,
  MaybeArray,
  ValidateField,
  setValue,
} from "@modular-forms/solid";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from "@suid/material";
import { SxProps } from "@suid/system";
import { For } from "solid-js";

type FieldProps<T> = {
  label: string;
  form: T;
  name: string;
  sx?: SxProps<Theme>;
  validate?: Maybe<MaybeArray<ValidateField<FieldPathValue<any, any>>>>;
  options: SelectOptions;
  required?: boolean;
  disabled?: boolean;
};

export type SelectOptions = {
  label: string;
  value: string;
}[];

export function SelectFormField<T extends FormStore<any, any>>(
  props: FieldProps<T>
) {
  return (
    <Field
      type={"string"}
      of={props.form}
      name={props.name}
      validate={props.validate}
    >
      {(field, fieldProps) => (
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            ...props.sx,
          }}
          error={!!field.error}
          required={props.required}
        >
          <InputLabel id={props.name}>{props.label}</InputLabel>
          <Select
            labelId={props.name}
            autoFocus={false}
            value={field.value ?? ""}
            onChange={(e) => setValue(props.form, field.name, e.target.value)}
            onBlur={(e) => fieldProps.onBlur(e)}
            label={props.label}
            error={!!field.error}
            disabled={props.disabled}
          >
            <For each={props.options}>
              {(item) => <MenuItem value={item.value}>{item.label}</MenuItem>}
            </For>
          </Select>
          <FormHelperText>{field.error}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}
