import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteTableData } from "./table.actionCreators";

export default function DialogBody({ handleClose, payload, setOpen }) {
  console.log("payload", payload);
  console.log("idarray", payload.deleteApiData.idArray);
  let idArray = payload.deleteApiData.idArray;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTableData(payload));
    setOpen(false);
  };

  return (
    <div style={{ padding: "1em" }}>
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete ID ${idArray.toString()}`}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          No
        </Button>
        <Button
          onClick={handleDelete}
          color="primary"
          autoFocus
          variant="contained"
        >
          Yes, I am sure
        </Button>
      </DialogActions>
    </div>
  );
}
