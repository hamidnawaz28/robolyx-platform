import React, { useState } from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  labelText: {
    paddingBottom: "10px",
    paddingTop: "15px",
    fontWeight: "500",
  },
  inputField: {
    width: "90%",
    margin: "4px 0px",
    backgroundColor: "white",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white", //conditionl
      },
      "&:hover fieldset": {
        borderColor: "blue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "blue",
        borderWidth: "1px",
      },
    },
  },
  error: {
    color: "red",
  },
});
const Input = ({ label, ...props }) => {
  const { labelText, inputField, error } = useStyles();
  const [field, meta] = useField(props);
  const IsError = meta.touched && meta.error;
  return (
    <div>
      <div>
        <label htmlFor={props.id || props.name} className={labelText}>
          {label}
        </label>
      </div>
      <div>
        <TextField
          className={inputField}
          {...field}
          {...props}
          variant="outlined"
        />
      </div>
      {IsError ? <div className={error}>{meta.error}</div> : null}
    </div>
  );
};
export default Input;
