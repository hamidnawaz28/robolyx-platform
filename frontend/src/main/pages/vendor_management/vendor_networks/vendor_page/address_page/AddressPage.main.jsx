import React, { useState } from "react";
import Table from "../../../../../../global/table/table.table";
import {
  VEN_ADDRESS_COLUMNS,
  VENDOR_ADDRESS_API_LINK,
} from "../../../../../../global/constants";
import AddressDataForm from "./AddressDataFrom";
import AddressSearchForm from "./AddressSearchForm";
import { Typography, Grid } from "@material-ui/core";
import GeneralLedger from "../../../../../../assets/ledger.png";
function AddressPage() {
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
          <Typography variant="h2">Vendor Addresses</Typography>
        </Grid>
      </Grid>

      <AddressSearchForm apiLink={VENDOR_ADDRESS_API_LINK} />
      <Table
        tableHeaders={VEN_ADDRESS_COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={VENDOR_ADDRESS_API_LINK}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
        withId={true}
      />
      {formState && (
        <AddressDataForm
          apiLink={VENDOR_ADDRESS_API_LINK}
          table={"Vendor Address"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default AddressPage;
