import React, { useState } from "react";
import Table from "../../../../../../global/table/table.table";
import VendorConfigsDataForm from "./VendorConfigsDataForm";
import VendorConfigsQueryForm from "./VendorConfigsQueryForm";
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

function VendorConfigs(props) {
  const [selectedRow, setSelectedRow] = useState("");
  const [actionType, setActionType] = useState("");
  const [formState, setFormState] = useState(false);
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    API_LINK,
    COLUMNS,
    tableName,
    initialState,
    initialStateForSearch,
  } = props;

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
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Typography variant={matches ? "h4" : "h3"}>{tableName}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <VendorConfigsQueryForm
            apiLink={API_LINK}
            initialState={initialStateForSearch}
            tableName={tableName}
          />
        </Grid>
      </Grid>

      <Table
        tableHeaders={COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={API_LINK}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <VendorConfigsDataForm
          apiLink={API_LINK}
          table={tableName}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
          initialState={initialState}
        />
      )}
    </>
  );
}

export default VendorConfigs;
