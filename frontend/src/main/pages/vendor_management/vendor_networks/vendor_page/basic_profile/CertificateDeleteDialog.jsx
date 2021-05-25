import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export default function DeleteDialog({
  open,
  handleClose,
  cert,
  setOpen,
  refreshCert,
  setRefreshCert,
}) {
  const handleDelete = () => {
    let id = cert.id;
    var config = {
      method: "delete",
      url: `http://127.0.0.1:8090/api/vendor_management/vendor-cert-lisc/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => {
        const { data } = res;
        const { error, message } = JSON.stringify(data);
        if (!error) {
          console.log("data", data);
          alert("Certificate Deleted Successfully");
          setRefreshCert(!refreshCert);
        } else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete {cert.certificate_name}?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Sure
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
