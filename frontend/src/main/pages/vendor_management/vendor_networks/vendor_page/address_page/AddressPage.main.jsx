import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import AddressDialog from "./AddressDialog";

import { Typography, Grid } from "@material-ui/core";
import GeneralLedger from "../../../../../../assets/ledger.png";
import { fetchIndividualVendorAddressStart } from "../../redux/vendorNetworksActions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontWeight: "600",
    fontSize: "0.9em",
  },
}));

function AddressPage() {
  let { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndividualVendorAddressStart(id));
  }, []);

  const { vendorAddress } = useSelector((state) => state.vendorNetworks);

  return (
    <>
      <Grid container justify="space-between" style={{ marginBottom: "1em" }}>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <img src={GeneralLedger} alt="ledger" style={{ width: "2em" }} />
            </Grid>
            <Grid item>
              <Typography variant="h3">Vendor Addresses</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <AddressDialog action="add" />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {vendorAddress.data &&
          vendorAddress.data.map((add) => (
            <Grid item sm={4}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Grid container>
                    <Grid item sm={12}>
                      <span className={classes.subtitle}>Street Address:</span>{" "}
                      {add.street_address} <br />
                    </Grid>
                    <Grid item sm={6}>
                      {" "}
                      <Typography variant="body2">
                        <span className={classes.subtitle}>Address Type:</span>{" "}
                        {add.address_type} <br />
                        <span className={classes.subtitle}>
                          Postal Code:
                        </span>{" "}
                        {add.postal_code} <br />
                        <span className={classes.subtitle}>
                          Suburb Name:
                        </span>{" "}
                        {add.suburb_name} <br />
                        <span className={classes.subtitle}>City:</span>{" "}
                        {add.city} <br />
                        <span className={classes.subtitle}>State:</span>{" "}
                        {add.state} <br />
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <span className={classes.subtitle}>Country:</span>{" "}
                      {add.country} <br />
                      <span className={classes.subtitle}>
                        Billing Status:
                      </span>{" "}
                      {add.billing_status} <br />
                      <span className={classes.subtitle}>Longitude:</span>{" "}
                      {add.longitude} <br />
                      <span className={classes.subtitle}>Latitude:</span>{" "}
                      {add.latitude} <br />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <AddressDialog action="edit" ven_add={add && add} />
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default AddressPage;
