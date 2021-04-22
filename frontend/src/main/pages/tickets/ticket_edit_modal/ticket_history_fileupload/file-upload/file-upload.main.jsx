import React from "react";
import Grid from "@material-ui/core/Grid";
import FileUploadForm from "./file-upload.form";
import FileUploadTable from "./file-upload.table";

function FileUploadMain({ ticket_id }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <FileUploadTable ticket_id={ticket_id} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FileUploadForm ticket_id={ticket_id} />
      </Grid>
    </Grid>
  );
}

export default FileUploadMain;
