import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BusinessUnit from "./buss_unit/BusinessUnit.page";

const useStyles = makeStyles((theme) => ({}));

function GeneralConfigurations() {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item>
        <h1>General Configurations</h1>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <BusinessUnit />
          </Grid>
          <Grid item xs={12} sm={6}>
            2
          </Grid>
          <Grid item xs={12} sm={6}>
            3
          </Grid>
          <Grid item xs={12} sm={6}>
            4
          </Grid>
          <Grid item xs={12} sm={6}>
            5
          </Grid>
          <Grid item xs={12} sm={6}>
            6
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GeneralConfigurations;
