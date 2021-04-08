import React, { useState } from "react";
import Table from "../../../../global/table/table.table";
import { PO_COLUMNS, PO_DATA } from "../../../../global/constants";
import PoDataForm from "./PoDataForm";
import PoQueryForm from "./PoQueryForm";
import { Typography, Grid } from "@material-ui/core";
import PurchaseOrder from "../../../../assets/purchasing.png";

function Po() {
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
          <img src={PurchaseOrder} alt="ledger" style={{ width: "3em" }} />
        </Grid>
        <Grid item>
          <Typography variant="h2">Purchase Order Information</Typography>
        </Grid>
      </Grid>
      <PoQueryForm apiLink={PO_DATA} />
      <Table
        tableHeaders={PO_COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={PO_DATA}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <PoDataForm
          apiLink={PO_DATA}
          table={"PO"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default Po;
