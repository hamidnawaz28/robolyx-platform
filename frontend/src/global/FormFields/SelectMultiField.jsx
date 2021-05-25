import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
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

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiTypography-body1": {
      fontSize: "2px",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function SelectField(props) {
  const { label, data, ...rest } = props;
  const classes = useStyles();
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <FormControl {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        {...field}
        MenuProps={MenuProps}
        renderValue={(selectedValue) =>
          selectedValue ? selectedValue.map((value) => value + ",") : ""
        }
        value={selectedValue ? selectedValue : ""}
        classes={{
          root: classes.selectEmpty,
          select: classes.select,
        }}
      >
        {data.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <Checkbox
              checked={selectedValue && selectedValue.indexOf(item.name) > -1}
            />
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
}

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectField;
