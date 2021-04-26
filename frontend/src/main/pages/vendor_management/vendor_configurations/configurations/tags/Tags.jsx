import React, { useState } from "react";
import Table from "../../../../../../global/table/table.table";
import {
  VENDOR_TAGS_API_LINK,
  VENDOR_TAGS_COLUMNS,
} from "../../../../../../global/constants";
import TagsDataForm from "./TagsDataForm";
import TagsQueryForm from "./TagsQueryForm";
import { Typography, Grid } from "@material-ui/core";
import GeneralLedger from "../../../../../../assets/ledger.png";
function VendorTags() {
  const [selectedRow, setSelectedRow] = useState("");
  const [actionType, setActionType] = useState("");
  const [formState, setFormState] = useState(false);
  const addNewDataHandle = () => {
    setActionType("New");
    setFormState(true);
  };
  const editDataHandle = (rowData) => {
    setSelectedRow(rowData);
    setActionType("Edit");
    setFormState(true);
  };
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <img src={GeneralLedger} alt="ledger" style={{ width: "3em" }} />
        </Grid>
        <Grid item>
          <Typography variant="h2">Vendor Tags</Typography>
        </Grid>
      </Grid>

      <TagsQueryForm apiLink={VENDOR_TAGS_API_LINK} />
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
