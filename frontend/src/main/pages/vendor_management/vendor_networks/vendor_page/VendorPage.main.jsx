import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { fetchSingleVendorStart } from "../redux/vendorNetworksActions";
import VendorPageTab from "./VendorPage.tab";

const useStyles = makeStyles((theme) => ({
  backArrow: {
    "&:hover": {
      cursor: "pointer",
      color: "#1e88e5",
    },
  },
  triIcon: {
    color: "#f4a261",
  },
}));

function VendorPage() {
  let { id } = useParams();
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleVendorStart(id));
  }, []);

  const { singleVendor } = useSelector((state) => state.vendorNetworks);

  console.log(singleVendor.data);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <ArrowBackIcon
              className={classes.backArrow}
              onClick={() =>
                history.push({
                  pathname: `/vendor-management/vendor-networks/`,
                })
              }
            />
          </Grid>
          <Grid item>
            <Typography variant="h6"> My Networks </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item sm={2}>
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={1}
              style={{ backgroundColor: "#edf6f9", padding: "1em 0.5em" }}
            >
              <Grid item>
                <ChangeHistoryIcon
                  fontSize="large"
                  className={classes.triIcon}
                />
              </Grid>
              <Grid item>
                <Typography variant="h5">Conditional</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={10} style={{ paddingLeft: "1em" }}>
            <Typography variant="h5">
              {singleVendor.data && singleVendor.data.vendor_name}
            </Typography>
            <Typography variant="body1">
              Vendor ID: {singleVendor.data && singleVendor.data.id}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <VendorPageTab vendor={singleVendor.data && singleVendor.data} />
      </Grid>
    </Grid>
    // {location.vendor.vendor_name}
  );
}

export default VendorPage;
