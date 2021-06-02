import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import { fetchIndividualVendorAddressStart } from "../../redux/vendorNetworksActions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ ven_note_id, venId }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    var config = {
      method: "delete",
      url: `http://127.0.0.1:8090/api/vendor_management/vendor-address/${ven_note_id}`,
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
          alert("Vendor Address Deleted Successfully");
          dispatch(fetchIndividualVendorAddressStart(venId));
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
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Are you sure you want to delete address id ${ven_note_id} ?`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Sure
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
