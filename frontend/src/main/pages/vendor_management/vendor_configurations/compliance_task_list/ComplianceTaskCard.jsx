import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  updateApprovalStatus,
  deleteReviewTemplate,
} from "../../vendor_admin/redux/approvalActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Chip from "@material-ui/core/Chip";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import localStorage from "../../../../../common/storage/localStorage";
import { useHistory } from "react-router-dom";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #e5e5e5",
    marginLeft: "1em",
    marginBottom: "1em",
  },
  root: {
    minWidth: 275,
    border: "1px solid #ced4da",
    marginBottom: "0.5em",
  },
  approved: {
    backgroundColor: "#4caf50",
    borderRadius: "0",
    width: "10em",
    padding: "0.5em 2.5em",
    [theme.breakpoints.down("sm")]: {
      width: "5em",
      padding: "0.3em 1em",
    },
  },
  rejected: {
    backgroundColor: "#f44336",
    borderRadius: "0",
    width: "10em",
    padding: "0.5em 2.5em",
    [theme.breakpoints.down("sm")]: {
      width: "5em",
      padding: "0.3em 1em",
    },
  },
  subtitle: {
    fontSize: "0.9em",
  },
  activeChip: {
    backgroundColor: "green",
    color: "#fff",
    marginBottom: "0.5em",
  },
  deactiveChip: {
    backgroundColor: "red",
    color: "#fff",
    marginBottom: "0.5em",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ReviewTemplateCard({ review_template, setValue }) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  console.log("review template here", review_template);

  const { query_review_temp, currentPage, perPage } = useSelector(
    (state) => state.vendorApproval
  );

  let fetchApiData = {
    query_review_temp: JSON.stringify(query_review_temp),
    currentPage: currentPage,
    perPage: perPage,
  };

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (temp_id) => {
    let data = {
      id: temp_id,
      fetchApiData: fetchApiData,
    };

    dispatch(deleteReviewTemplate(data));
  };

  const handleEdit = (temp) => {
    localStorage.set("section_edit", temp.JSON_fields);
    localStorage.set("temp", temp);

    history.push({
      pathname: "/vendor-management/review-template-edit",
    });

    //history.push("/vendor-management/review-template-edit");
  };

  return (
    <Grid sm={3} className={classes.card}>
      <Card mb={6}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {review_template.name}
          </Typography>
          {review_template.status === "active" ? (
            <Chip size="small" label="Active" className={classes.activeChip} />
          ) : (
            <Chip
              size="small"
              label="Deactivated"
              className={classes.deactiveChip}
            />
          )}
          <br />

          <Typography mb={4} variant="caption">
            created at : {review_template.created_at}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            Delete
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
              <Grid className={classes.paper}>
                <h2>
                  Are you sure you want to delete review template{" "}
                  {review_template.name}
                </h2>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleDelete(review_template.id)}
                      variant="contained"
                    >
                      Confirm
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClose()}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Fade>
          </Modal>

          <Button
            size="small"
            color="primary"
            onClick={() => handleEdit(review_template)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
