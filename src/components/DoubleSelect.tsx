import { Component } from "solid-js";
import { SelectFormField, SelectOptions } from "./SelectFormField";
import {
  clearError,
  custom,
  getValue,
  required,
  setError,
} from "@modular-forms/solid";

type DoubleSelectProps = {
  form: any;
  firstName: string;
  firstLabel: string;
  secondName: string;
  secondLabel: string;
  options: SelectOptions;
  validate?: any[];
  equals?: string;
  disabled?: boolean;
  required?: string;
};

export const DoubleSelect: Component<DoubleSelectProps> = (props) => {
  const equalsValidation = custom(() => {
    const valid =
      getValue(props.form, props.firstName) !==
      getValue(props.form, props.secondName);
    if (valid) {
      clearError(props.form, props.firstName);
      clearError(props.form, props.secondName);
    } else {
      setError(props.form, props.firstName, props.equals ?? "");
      setError(props.form, props.secondName, props.equals ?? "");
    }
    return valid;
  }, props.equals ?? "");

  const validate = () => {
    const val = [];
    if (props.required) {
      val.push(required(props.required));
    }
    if (props.equals) {
      val.push(equalsValidation);
    }
    if (props.validate) {
      val.push(...props.validate);
    }
    return val;
  };

  return (
    <>
      <SelectFormField
        form={props.form}
        name={props.firstName}
        label={props.firstLabel}
        validate={validate()}
        disabled={props.disabled}
        required={!!props.required}
        options={props.options}
      />
      <SelectFormField
        form={props.form}
        name={props.secondName}
        label={props.secondLabel}
        validate={validate()}
        disabled={props.disabled}
        required={!!props.required}
        options={props.options}
      />
    </>
  );
};
