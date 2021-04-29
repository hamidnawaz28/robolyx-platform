import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import VendorConfigs from "./vendor_config/VendorConfigs";
import {
  VENDOR_TRADES_API_LINK,
  VENDOR_TRADES_COLUMNS,
  VENDOR_TAGS_API_LINK,
  VENDOR_TAGS_COLUMNS,
  VENDOR_CATEGORIES_API_LINK,
  VENDOR_CATEGORIES_COLUMNS,
  VENDOR_DIVERSITY_API_LINK,
  VENDOR_DIVERSITY_COLUMNS,
} from "../../../../../global/constants";
import { resetStates } from "../../../../../global/table/table.actionCreators";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    marginBottom: "1em",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [configOption, setConfigOption] = React.useState("VendorTag");

  const handleChange = (event) => {
    setConfigOption(event.target.value);
    dispatch(resetStates());
  };

  const initialState = {
    name: "",
    trade_status: "",
  };
  const initialStateForTrade = {
    name: "",
    trade_status: "",
  };

  const initialStateForSearch = {
    name__icontains: "",
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">
          Select Configuration Type
        </InputLabel>
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
        <VendorConfigs
          API_LINK={VENDOR_TAGS_API_LINK}
          COLUMNS={VENDOR_TAGS_COLUMNS}
          tableName={"Tags"}
          initialState={initialState}
          initialStateForSearch={initialStateForSearch}
        />
      ) : configOption == "VendorTrades" ? (
        <VendorConfigs
          API_LINK={VENDOR_TRADES_API_LINK}
          COLUMNS={VENDOR_TRADES_COLUMNS}
          tableName={"Trades"}
          initialState={initialStateForTrade}
          initialStateForSearch={initialStateForSearch}
        />
      ) : configOption == "Categories" ? (
        <VendorConfigs
          API_LINK={VENDOR_CATEGORIES_API_LINK}
          COLUMNS={VENDOR_CATEGORIES_COLUMNS}
          tableName={"Categories"}
          initialState={initialStateForTrade}
          initialStateForSearch={initialStateForSearch}
        />
      ) : configOption == "Diversity" ? (
        <VendorConfigs
          API_LINK={VENDOR_DIVERSITY_API_LINK}
          COLUMNS={VENDOR_DIVERSITY_COLUMNS}
          tableName={"Diversity"}
          initialState={initialState}
          initialStateForSearch={initialStateForSearch}
        />
      ) : (
        ""
      )}
    </div>
  );
}
