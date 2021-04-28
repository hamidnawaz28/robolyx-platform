import React from "react";
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
function PopUpForm({
  title,
  handleSave,
  formState,
  setFormState,
  field,
  ...props
}) {
  return (
    <>
      <Dialog
        open={formState}
        onClose={setFormState}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent > {field}</DialogContent>
        <Grid container justify="center">
          {/* <DialogActions position="centre"> */}
            {/* <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button> */}
            {/* <Button
              onClick={setFormState}
              variant={"contained"}
              color="primary"
            >
              Cancel
            </Button> */}
          {/* </DialogActions> */}
        </Grid>
      </Dialog>
    </>
  );
}
export default PopUpForm;
