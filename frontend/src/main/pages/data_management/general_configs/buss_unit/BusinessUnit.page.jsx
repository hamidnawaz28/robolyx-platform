import React, { useState } from "react";
import Table from "../../../../../global/table/table.table";
import {
  BUSINESS_UNIT_DATA,
  BU_COLUMNS,
} from "../../../../../global/constants";
import BUDataForm from "./BussinessUnitForm";
//import TaxonomyQueryForm from "./TaxonomyQueryForm";
import { Typography, Grid } from "@material-ui/core";
import TaxonomyPng from "../../../../../assets/taxonomy.png";

function BusinessUnit() {
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
          <img src={TaxonomyPng} alt="ledger" style={{ width: "3em" }} />
        </Grid>
        <Grid item>
          <Typography variant="h2">Business Units</Typography>
        </Grid>
      </Grid>
      {/* <TaxonomyQueryForm apiLink={BUSINESS_UNIT_DATA} /> */}
      <Table
        tableHeaders={BU_COLUMNS}
        selectOption={true}
        paginationOption={true}
        apiLink={BUSINESS_UNIT_DATA}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <BUDataForm
          apiLink={BUSINESS_UNIT_DATA}
          table={"Bussiness Unit"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default BusinessUnit;
