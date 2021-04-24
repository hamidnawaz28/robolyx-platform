import React, { useState } from "react";
import Table from "../../../../../global/table/table.table";
import {
  VENDOR_REQUEST_COLUMNS,
  VENDOR_REQUEST,
} from "../../../../../global/constants";
import SupplierQueryForm from "./QueryForm";
import { Typography, Grid } from "@material-ui/core";
// import InvoicePng from "../../../../assets/invoice.png";
function Supplier() {
  //   const [selectedRow, setSelectedRow] = useState("");
  //   const [actionType, setActionType] = useState("");
  //   const [formState, setFormState] = useState(false);
  //   const addNewDataHandle = () => {
  //     setActionType("New");
  //     setFormState(true);
  //   };
  //   const editDataHandle = (rowData) => {
  //     setSelectedRow(rowData);
  //     setActionType("Edit");
  //     setFormState(true);
  //   };
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        {/* <Grid item>
          <img src={InvoicePng} alt="requests" style={{ width: "3em" }} />
        </Grid> */}
        <Grid item>
          <Typography variant="h2">Suppplier Requests</Typography>
        </Grid>
      </Grid>
      <SupplierQueryForm apiLink={VENDOR_REQUEST} />
      <Table
        tableHeaders={VENDOR_REQUEST_COLUMNS}
        selectOption={false}
        paginationOption={true}
        apiLink={VENDOR_REQUEST}
        // addNewDataHandle={addNewDataHandle}
        // editDataHandle={editDataHandle}
      />
    </>
  );
}

export default Supplier;
