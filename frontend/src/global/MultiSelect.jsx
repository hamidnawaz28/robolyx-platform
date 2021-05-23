import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
    //minWidth: 120,
    //maxWidth: 300,
  },
}));

function MultiSelectField(props) {
  const { label, data, property, handleChange, ...rest } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id="priority">{label}</InputLabel>
      <Select
        labelId="priority-checkbox-label"
        id="priority-checkbox"
        style={{ width: "100%" }}
        multiple
        value={property}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {data.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <Checkbox checked={property.indexOf(item.name) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultiSelectField;
