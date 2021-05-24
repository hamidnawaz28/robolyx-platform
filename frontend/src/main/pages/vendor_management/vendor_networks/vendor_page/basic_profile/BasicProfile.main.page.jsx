import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import MoreIcon from "@material-ui/icons/More";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Certificate from "./certificate";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import BusinessIcon from "@material-ui/icons/Business";
const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "1em" },
}));

export default function BasicProfile({ vendor }) {
  const classes = useStyles();
  const [certlisc, setCertlisc] = useState([]);

  console.log("vendor from basic profile", vendor.id);

  useEffect(() => {
    if (vendor.id) {
      console.log("What the fuck is happening");
      let id = vendor.id;
      var config = {
        method: "get",
        url: `http://127.0.0.1:8090/api/vendor_management/cert-lisc-list/?vendorId=${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then((res) => {
          console.log("is this even working ");
          const { data } = res;
          const { error, message } = JSON.stringify(data);
          if (!error) {
            console.log("data", data);
            setCertlisc(data);
          } else alert("Error");
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [vendor]);

  console.log("certlisc", certlisc);

  const CardSample = ({ icon, title, buttonTitle, VendorDetail, id }) => (
    <Card className={classes.root} key={id}>
      <CardContent>
        <Grid container>
          <Grid item sm={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ paddingBottom: "1em" }}
            >
              <Grid item>
                <Grid container spacing={2} alignContent="center">
                  <Grid item>
                    {icon === "tags" ? (
                      <MoreIcon />
                    ) : icon === "category" ? (
                      <AccountTreeIcon />
                    ) : icon === "payment" ? (
                      <AccountBalanceIcon />
                    ) : icon === "trade" ? (
                      <BusinessIcon />
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">{title}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button color="secondary" size="small">
                  {buttonTitle}
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          <Grid item style={{ paddingTop: "1em" }}>
            {VendorDetail &&
              VendorDetail.map((ven) => (
                <React.Fragment>
                  <Chip
                    label={ven.name}
                    color="secondary"
                    style={{ marginRight: "0.5em" }}
                    key={ven.name}
                  />
                </React.Fragment>
              ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <React.Fragment>
      <CardSample
        id="tags"
        icon="tags"
        title="Applied Tags"
        buttonTitle="Apply Tags"
        VendorDetail={vendor.tags}
      />
      <CardSample
        id="category"
        icon="category"
        title="Applied Categories"
        buttonTitle="Apply Category"
        VendorDetail={vendor.category}
      />

      <CardSample
        id="trade"
        icon="trade"
        title="Applied Trades"
        buttonTitle="Apply Trades"
        VendorDetail={vendor.trades}
      />

      <CardSample
        id="payment"
        icon="payment"
        title="Payment Terms"
        buttonTitle="Apply Payment Term"
        VendorDetail={vendor.payment_term}
      />

      <CardSample
        id="certificates"
        icon="payment"
        title="Certificates & Licenses"
        buttonTitle="Apply Payment Term"
        VendorDetail={vendor.payment_term}
      />

      <Card className={classes.root}>
        <CardContent>
          <Grid container>
            <Grid item sm={12}>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                style={{ paddingBottom: "1em" }}
              >
                <Grid item>
                  <Grid container spacing={2} alignContent="center">
                    <Grid item>
                      <BusinessCenterIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">
                        Certificates & Licenses
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button color="secondary" size="small">
                    Apply Tags
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </Grid>

            <Grid item style={{ paddingTop: "1em" }} sm={12}>
              <Grid container>
                {certlisc.data &&
                  certlisc.data.map((cert) => (
                    <Grid item style={{ marginRight: "0.5em" }}>
                      <Certificate cert={cert} key={cert.id} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
