import { Field, getValue, required, setValue } from "@modular-forms/solid";
import { CircularProgress, TextField } from "@suid/material";
import { Match, Switch, createEffect, createSignal } from "solid-js";
import { Refresh } from "@suid/icons-material";
import { useMainButton } from "../hooks";
import { useLaunchParams } from "@tma.js/sdk-solid";

type FormFieldProps = {
  label: string;
  form: any;
  name: any;
  validate?: any[];
  required?: string;
  maxRows?: number;
  multiline?: boolean;
  loading?: boolean;
  refreshable?: boolean;
  onBlur?: (value: string) => void;
};

export function TextFormField(props: FormFieldProps) {
  const mainButton = useMainButton();
  const launchParams = useLaunchParams();
  const [inputRef, setInputRef] = createSignal<HTMLInputElement>();
  const [focused, setFocused] = createSignal(false);
  const [lastValue, setLastValue] = createSignal<string>(
    getValue(props.form, props.name, { shouldActive: false }) as string
  );
  createEffect(() => {
    requestAnimationFrame(() => {
      inputRef()?.blur();
    });
  });

  createEffect(() => {
    if (focused()) {
      if (["android", "ios"].includes(launchParams.platform)) {
        requestAnimationFrame(() => {
          mainButton().hide();
        });
      }
      return;
    }
    if (!focused()) {
      if (["android", "ios"].includes(launchParams.platform)) {
        requestAnimationFrame(() => {
          mainButton().show();
        });
      }
    }
    // console.log("asdfsdf");
  });

  const onBlurHandler = (value: string) => {
    if (props.onBlur && value !== lastValue()) {
      props.onBlur(value.trim());
      setLastValue(value);
    }
  };

  const validate = () => {
    const validators = [];
    if (props.required) {
      validators.push(required(props.required));
    }
    if (props.validate) {
      validators.push(...props.validate);
    }
    return validators;
  };

  return (
    <Field
      type={"string"}
      of={props.form}
      name={props.name}
      validate={validate()}
    >
      {(field, fieldProps) => (
        <TextField
          inputRef={(ref) => {
            setInputRef(ref);
            fieldProps.ref(ref);
          }}
          variant="outlined"
          onKeyUp={(event) => {
            if (event.key === "Enter" && !props.multiline) {
              inputRef()?.blur();
            }
          }}
          inputProps={{
            enterkeyhint: "done",
          }}
          size="small"
          autoComplete="off"
          autoFocus={false}
          value={field.value ?? ""}
          onChange={(e) => setValue(props.form, field.name, e.target.value)}
          onBlur={(e) => {
            fieldProps.onBlur(e);
            setFocused(false);
            onBlurHandler(field.value as string);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          label={props.label}
          error={!!field.error}
          helperText={field.error}
          required={!!props.required}
          maxRows={props.maxRows}
          multiline={props.multiline}
          InputProps={{
            endAdornment: (
              <Switch>
                <Match when={props.loading}>
                  <CircularProgress
                    sx={{ height: "23px", width: "23px" }}
                    color="primary"
                  />
                </Match>
                <Match
                  when={
                    !props.loading &&
                    props.refreshable &&
                    field.value &&
                    !focused()
                  }
                >
                  <Refresh
                    onClick={() => {
                      const value = lastValue();
                      if (value && props.onBlur) props.onBlur(value.trim());
                    }}
                    sx={{ height: "23px", width: "23px", cursor: "pointer" }}
                  />
                </Match>
              </Switch>
            ),
          }}
        />
      )}
    </Field>
  );
}
