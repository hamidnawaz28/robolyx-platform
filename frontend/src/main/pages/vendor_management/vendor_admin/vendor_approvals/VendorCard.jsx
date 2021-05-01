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

export default function VendorCard({ vendor }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  console.log("vendor here", vendor);

  const { query, currentPage, perPage, pendingVendors } = useSelector(
    (state) => state.vendorApproval
  );

  let fetchApiData = {
    query: JSON.stringify(query),
    currentPage: currentPage,
    perPage: perPage,
  };

  const approveHandle = () => {
    let data = {
      post_data: {
        approval_status: "approved",
      },
      id: vendor.id,
      fetchApiData: fetchApiData,
    };

    dispatch(updateApprovalStatus(data));
  };

  const rejectHandle = () => {
    let data = {
      post_data: {
        approval_status: "rejected",
      },
      id: vendor.id,
      fetchApiData: fetchApiData,
    };

    dispatch(updateApprovalStatus(data));
  };

  return (
    <Card className={classes.root}>
      <CardContent style={{ padding: "0.5em" }}>
        <Grid container>
          <Grid item md={3}>
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ height: "100%" }}
              justify="center"
            >
              <Grid item>
                <Typography variant={matches ? "h5" : "h3"}>
                  {vendor.vendor_name}
                </Typography>
                <Typography variant="body1">Vendor ID: {vendor.id}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={5}
            style={{
              border: "1px solid #eee",
              padding: "0.5em",
              paddingLeft: matches ? "0" : "1em",
            }}
          >
            <Typography variant={matches ? "h6" : "h5"}>
              {matches ? "" : "Contact Name:"} {vendor.contact_name}
            </Typography>
            <Grid container spacing={matches ? 0 : 6}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle}
                >
                  Email: {vendor.contact_email}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle}
                >
                  Contact #: {vendor.contact_phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle}
                >
                  Department: {vendor.department}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle}
                >
                  Designation: {vendor.designation}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: "100%" }}
              spacing={3}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.approved}
                  onClick={() => approveHandle()}
                >
                  Approve
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.rejected}
                  onClick={() => rejectHandle()}
                >
                  Reject
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
