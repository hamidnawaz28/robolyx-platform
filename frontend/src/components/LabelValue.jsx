import React from "react";
import { makeStyles } from "@material-ui/styles";
import { H6 } from "./Headings";
import { Grid } from "@material-ui/core";
import { colors } from "./Theme";
import { gr3, gr2 } from "./Theme";
const useStyles = makeStyles({
  para: {
    color: "black",
  },
});
const LabelValue = ({ label, value }) => {
  const { para } = useStyles();
  return (
    <Grid container>
      <Grid {...gr3}>
        <p>
          {label}
          {` :`}
        </p>
      </Grid>
      <Grid {...gr2}>
        <p className={para}>{value}</p>
      </Grid>
    </Grid>
  );
};

export default LabelValue;
