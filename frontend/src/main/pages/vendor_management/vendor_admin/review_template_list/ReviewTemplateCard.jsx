import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { updateApprovalStatus } from "../redux/approvalActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  card: {
    border: '1px solid #e5e5e5',
    marginLeft: '1em',
    marginBottom: '1em'
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
}));

export default function ReviewTemplateCard({ review_template }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  console.log("review template here", review_template);

  const { query, currentPage, perPage } = useSelector(
    (state) => state.vendorApproval
  );

  let fetchApiData = {
    query: JSON.stringify(query),
    currentPage: currentPage,
    perPage: perPage,
  };

  // const approveHandle = () => {
  //   let data = {
  //     post_data: {
  //       approval_status: "approved",
  //     },
  //     id: vendor.id,
  //     fetchApiData: fetchApiData,
  //   };

  //   dispatch(updateApprovalStatus(data));
  // };

  // const rejectHandle = () => {
  //   let data = {
  //     post_data: {
  //       approval_status: "rejected",
  //     },
  //     id: vendor.id,
  //     fetchApiData: fetchApiData,
  //   };

  //   dispatch(updateApprovalStatus(data));
  // };

  return (
    <Grid sm={3} className={classes.card}>
      <Card mb={6}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {review_template.name}
          </Typography>



          <Typography mb={4} component="p">
            Created At : {review_template.created_at}

          </Typography>


        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Delete
        </Button>
          <Button size="small" color="primary">
            Edit
        </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
