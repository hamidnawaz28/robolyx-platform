import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import Addtickets from "./ticket_add_form/AddTickets.page";

import MaterialLayout from "../../../../global/Layout/MaterialLayout";

import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginLeft: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "5%",
    },
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="button"
        startIcon={<AddCircleIcon />}
        style={{
          height: "2.5em",
          marginBottom: "1em",
          backgroundColor: "#BA4478",
          color: "#fff",
        }}
        size="small"
        onClick={handleOpen}
        variant="contained"
      >
        Add New Ticket
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <MaterialLayout>
            <Addtickets setOpen={setOpen} />
          </MaterialLayout>
        </Fade>
      </Modal>
    </div>
  );
}
