import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import VendorTags from "./tags/Tags";
import VendorTrades from "./trades/Trades";
import VendorCategories from "./categories/Categories";
import VendorDiversity from "./diversity/Diversity";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: "1em",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [configOption, setConfigOption] = React.useState("VendorTag");

  const handleChange = (event) => {
    setConfigOption(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={configOption}
          onChange={handleChange}
        >
          <MenuItem value={"VendorTag"}>Vendor Tag</MenuItem>
          <MenuItem value={"VendorTrades"}>Vendor Trades</MenuItem>
          <MenuItem value={"Categories"}>Categories</MenuItem>
          <MenuItem value={"Diversity"}>Diversity Classification</MenuItem>
        </Select>
      </FormControl>
      {configOption == "VendorTag" ? (
        <VendorTags />
      ) : configOption == "VendorTrades" ? (
        <VendorTrades />
      ) : configOption == "Categories" ? (
        <VendorCategories />
      ) : configOption == "Diversity" ? (
        <VendorDiversity />
      ) : (
        ""
      )}
    </div>
  );
}
