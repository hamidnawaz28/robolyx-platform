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

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "1em" },
}));

export default function Certificate({ cert }) {
  console.log(cert);
  return (
    <React.Fragment>
      <Grid
        container
        style={{
          border: "1px solid #dee2e6",
          padding: "0.8em",
        }}
      >
        <Grid item style={{ paddingRight: "0.5em" }}>
          <ListAltIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" style={{ fontSize: "1em" }}>
                {cert.certificate_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{cert.aggregation_body}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {cert.registration_no} . {cert.created_at}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
