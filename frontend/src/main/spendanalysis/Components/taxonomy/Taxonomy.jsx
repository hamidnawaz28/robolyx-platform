import React, { useState } from "react";
import Table from "../../../../global/table/table.table";
import {
  TAXONOMY_ATTRIBUTES,
  TAXONOMY_DATA,
} from "../../../../global/constants";
import TaxonomyDataForm from "./TaxonomyDataForm";
import TaxonomyQueryForm from "./TaxonomyQueryForm";
import { Typography, Grid } from "@material-ui/core";
import TaxonomyPng from "../../../../assets/taxonomy.png";
function Taxonomy() {
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
          <Typography variant="h2">Taxonomy List</Typography>
        </Grid>
      </Grid>
      <TaxonomyQueryForm apiLink={TAXONOMY_DATA} />
      <Table
        tableHeaders={TAXONOMY_ATTRIBUTES}
        selectOption={true}
        paginationOption={true}
        apiLink={TAXONOMY_DATA}
        addNewDataHandle={addNewDataHandle}
        editDataHandle={editDataHandle}
      />
      {formState && (
        <TaxonomyDataForm
          apiLink={TAXONOMY_DATA}
          table={"Taxonomy"}
          actionType={actionType}
          formState={formState}
          formData={selectedRow}
          formCloseEvent={() => setFormState(false)}
        />
      )}
    </>
  );
}

export default Taxonomy;
