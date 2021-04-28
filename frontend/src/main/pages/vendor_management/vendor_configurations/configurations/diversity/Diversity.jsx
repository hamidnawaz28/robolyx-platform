import React, { useState } from "react";
import Table from "../../../../../../global/table/table.table";
import {
  VENDOR_DIVERSITY_API_LINK,
  VENDOR_DIVERSITY_COLUMNS,
} from "../../../../../../global/constants";
import DiversityDataForm from "./DiversityDataForm";
import DiversityQueryForm from "./DiversityQueryForm";
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

function VendorDiversity() {
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
                Diversity Classification
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <DiversityQueryForm apiLink={VENDOR_DIVERSITY_API_LINK} />
        </Grid>
      </Grid>

      <Table
        tableHeaders={VENDOR_DIVERSITY_COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={VENDOR_DIVERSITY_API_LINK}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <DiversityDataForm
          apiLink={VENDOR_DIVERSITY_API_LINK}
          table={"Diversity"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default VendorDiversity;
