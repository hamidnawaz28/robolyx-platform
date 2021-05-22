import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MoreIcon from "@material-ui/icons/More";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Certificate from "./certificate";

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "1em" },
}));

export default function BasicProfile({ vendor }) {
  const classes = useStyles();
  const [certlisc, setCertlisc] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8090/api/vendor_management/cert-lisc-list/`,
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
          setCertlisc(data);
        } else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log("certlisc", certlisc);

  return (
    <React.Fragment>
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
                      <MoreIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">Applied Tags</Typography>
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

            <Grid item style={{ paddingTop: "1em" }}>
              {vendor.tags &&
                vendor.tags.map((tag) => (
                  <React.Fragment>
                    <Chip
                      label={tag.name}
                      color="secondary"
                      style={{ marginRight: "0.5em" }}
                    />
                  </React.Fragment>
                ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
                {certlisc &&
                  certlisc.map((cert) => (
                    <Grid item style={{ marginRight: "0.5em" }}>
                      <Certificate cert={cert} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
                      <AccountTreeIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">Applied Categories</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button color="secondary" size="small">
                    Apply Category
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </Grid>

            <Grid item style={{ paddingTop: "1em" }}>
              {vendor.category &&
                vendor.category.map((cat) => (
                  <React.Fragment>
                    <Chip
                      label={cat.name}
                      color="secondary"
                      style={{ marginRight: "0.5em" }}
                    />
                  </React.Fragment>
                ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
