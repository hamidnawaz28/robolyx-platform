import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import Addtickets from "./ticket_edit_form/AddTickets.page";
import EditModalMainPage from "./edit_upload_history";

import MaterialLayout from "../../../../global/Layout/MaterialLayout";

import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginLeft: "15%",
    marginBottom: "2.5%",

    [theme.breakpoints.down("sm")]: {
      width: "95%",
      marginLeft: "2.5%",
    },
  },
}));

export default function TransitionsModal({ ticket }) {
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
        onClick={handleOpen}
        size="small"
        color="primary"
        variant="contained"
      >
        Edit
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
          <EditModalMainPage
            setOpen={setOpen}
            ticket={ticket}
            ticket_id={ticket.id}
          />
        </Fade>
      </Modal>
    </div>
  );
}
