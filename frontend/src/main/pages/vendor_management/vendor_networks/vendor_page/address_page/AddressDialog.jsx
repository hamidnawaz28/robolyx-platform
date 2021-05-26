import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MainFormikForm from "./formik_form/MainFormikPage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddressDialog({ action, ven_add }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        {action == "add" ? "Add a New Address" : "Edit Address"}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <MainFormikForm
            setOpen={setOpen}
            open={open}
            vendorAddress={ven_add && ven_add}
            action={action}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
