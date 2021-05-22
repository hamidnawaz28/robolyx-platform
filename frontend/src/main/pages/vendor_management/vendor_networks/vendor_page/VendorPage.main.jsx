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
import { fetchVendorsStart } from "../redux/vendorNetworksActions";
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
  const [vendor, setVendor] = useState({});

  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8090/api/vendor_management/vendor-basic/${id}/`,
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
          setVendor(data.data);
        } else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log("vendor", vendor);

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
          <Grid
            item
            sm={10}
            style={{ paddingLeft: "1em" }}
            alignContent="center"
          >
            <Typography variant="h5">{vendor && vendor.vendor_name}</Typography>
            <Typography variant="body">
              Vendor ID: {vendor && vendor.id}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <VendorPageTab />
      </Grid>
    </Grid>
    // {location.vendor.vendor_name}
  );
}

export default VendorPage;
