import React, { useState } from "react";
import Table from "../../../../../../global/table/table.table";
import {
  VENDOR_TRADES_API_LINK,
  VENDOR_TRADES_COLUMNS,
} from "../../../../../../global/constants";
import TradesDataForm from "./TradesDataForm";
import TradesQueryForm from "./TradesQueryForm";
import { Typography, Grid } from "@material-ui/core";
import tagIcon from "../../../../../../assets/tag.png";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  tagIcon: {
    width: "2.5em",
    [theme.breakpoints.down("sm")]: {
      width: "2em",
    },
  },
}));

function VendorTrades() {
  const [selectedRow, setSelectedRow] = useState("");
  const [actionType, setActionType] = useState("");
  const [formState, setFormState] = useState(false);
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const addNewDataHandle = () => {
    setActionType("New");
    setFormState(true);
  };
  const editDataHandle = (rowData) => {
    console.log("rowData from main page", rowData);
    setSelectedRow(rowData);
    setActionType("Edit");
    setFormState(true);
  };
  console.log("selectedRow from main page", selectedRow);
  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <img src={tagIcon} alt="tagIcon" className={classes.tagIcon} />
            </Grid>
            <Grid item>
              <Typography variant={matches ? "h4" : "h3"}>
                Vendor Trades
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TradesQueryForm apiLink={VENDOR_TRADES_API_LINK} />
        </Grid>
      </Grid>

      <Table
        tableHeaders={VENDOR_TRADES_COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={VENDOR_TRADES_API_LINK}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <TradesDataForm
          apiLink={VENDOR_TRADES_API_LINK}
          table={"Trades"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default VendorTrades;
