import React, { useState } from "react";
import Table from "../../../../../../global/table/table.table";
import {
  VENDOR_TAGS_API_LINK,
  VENDOR_TAGS_COLUMNS,
} from "../../../../../../global/constants";
import TagsDataForm from "./TagsDataForm";
import TagsQueryForm from "./TagsQueryForm";
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

function VendorTags() {
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
                Vendor Tags
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TagsQueryForm apiLink={VENDOR_TAGS_API_LINK} />
        </Grid>
      </Grid>

      <Table
        tableHeaders={VENDOR_TAGS_COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={VENDOR_TAGS_API_LINK}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <TagsDataForm
          apiLink={VENDOR_TAGS_API_LINK}
          table={"Tags"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default VendorTags;
