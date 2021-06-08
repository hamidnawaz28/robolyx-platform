// FormElements.jsx

import React from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
  useField,
  useFormik,
} from "formik";
import Button from "@material-ui/core/Button";

export function Form(props) {
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation" noValidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
}

export function TextField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      <Field
        className="form-control"
        as="textarea"
        type="text"
        name={name}
        id={name}
        rows={3}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function SelectField(props) {
  const { name, label, options, isCompleted } = props;
  return (
    <>
      <Field
        as="select"
        id={name}
        name={name}
        style={{ width: "50%", padding: "0.5em" }}
        disabled={isCompleted ? true : false}
      >
        <option value="">Choose...</option>
        {options.map((optn, index) => (
          <option
            value={optn.optionText}
            label={optn.optionText || optn.optionText}
          />
        ))}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function SubmitButton(props) {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      {...rest}
      disabled={isSubmitting}
    >
      {title}
    </Button>
  );
}
