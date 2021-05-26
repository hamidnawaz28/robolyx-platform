import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import VendorUploadForm from "./VendorUploadsForm";
import VendorUploadTable from "./VendorUploadsTable";

function VendorUploadMain() {
  let { id } = useParams();
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <VendorUploadTable vendor_id={id} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <VendorUploadForm vendor_id={id} />
      </Grid>
    </Grid>
  );
}

export default VendorUploadMain;
