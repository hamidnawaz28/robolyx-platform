import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenReviewlistStart } from "../../redux/vendorNetworksActions";
import { useParams, Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PagesIcon from "@material-ui/icons/Pages";

const useStyles = makeStyles({
  root: {
    marginBottom: "1em",
  },

  title: {
    fontSize: 14,
  },

  subtitle: {
    fontWeight: "600",
    fontSize: "0.9em",
  },
  subtitle2: {
    fontWeight: "600",
    fontSize: "1em",
  },
  deletButton: {
    fontSize: "1.75em",
    "&:hover": {
      cursor: "pointer",
      color: "#e63946",
    },
  },
});

export default function VendorComplianceCard({ ven_compliance }) {
  const classes = useStyles();
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  console.log(ven_compliance);
  const { complianceQuery, currentPage, perPage, ven_compliance_list } =
    useSelector((state) => state.vendorNetworks);

  let vendorId = id;

  let fetchApiData = {
    vendorId: id,
    complianceQuery: JSON.stringify(complianceQuery),
    currentPage: currentPage,
    perPage: perPage,
  };

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container style={{ padding: "1em" }}>
        <Grid item sm={6}>
          <Grid container direction="row">
            <Grid item>
              <PagesIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item style={{ fontWeight: "bold" }}>
                  Review Name: {ven_compliance.compliance_form_name}
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    Expires: {ven_compliance.deadline}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={1}>
          2
        </Grid>
        <Grid item sm={4}>
          3
        </Grid>
        <Grid item sm={1}>
          <Button variant="outlined" color="primary" size="small">
            VIEW
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
