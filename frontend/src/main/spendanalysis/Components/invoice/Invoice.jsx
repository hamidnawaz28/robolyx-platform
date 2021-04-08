import React, { useState } from "react";
import Table from "../../../../global/table/table.table";
import {
  DATA_ATTRIBUTES_FOR_COLUMNS,
  INVOICE_DATA,
} from "../../../../global/constants";
import InvoiceDataForm from "./InvoiceDataForm";
import InvoiceQueryForm from "./InvoiceQueryForm";
import { Typography, Grid } from "@material-ui/core";
import InvoicePng from "../../../../assets/invoice.png";

function Invoice() {
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
          <img src={InvoicePng} alt="ledger" style={{ width: "3em" }} />
        </Grid>
        <Grid item>
          <Typography variant="h2">Invoice Information</Typography>
        </Grid>
      </Grid>
      <InvoiceQueryForm apiLink={INVOICE_DATA} />
      <Table
        tableHeaders={DATA_ATTRIBUTES_FOR_COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={INVOICE_DATA}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <InvoiceDataForm
          apiLink={INVOICE_DATA}
          table={"Invoice"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default Invoice;
