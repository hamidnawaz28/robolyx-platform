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
import WorkOffIcon from "@material-ui/icons/WorkOff"; //forced non conditional compliant
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CancelIcon from "@material-ui/icons/Cancel";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"; // conditional compliant
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const useStyles = makeStyles({
  root: {
    marginBottom: "1em",
    border: "1px solid #ced4da",
    marginBottom: "1rem",
    borderRadius: "0.25rem",
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
    <Grid item className={classes.root} variant="outlined" sm={12}>
      <Grid container style={{ padding: "1em" }}>
        <Grid item sm={4}>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <PagesIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item style={{ fontWeight: "bold" }}>
                  {ven_compliance.compliance_form_name}
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

        <Grid item sm={2}>
          {ven_compliance.req_status === "optional" ? (
            <Chip
              label={ven_compliance.req_status}
              style={{
                backgroundColor: "#388e3c",
                color: "#fff",
                borderRadius: "0.5em",
              }}
            />
          ) : ven_compliance.req_status === "conditional" ? (
            <Chip
              label={ven_compliance.req_status}
              style={{
                backgroundColor: "#ff9800",
                color: "#fff",
                borderRadius: "0.5em",
              }}
            />
          ) : (
            <Chip
              label={ven_compliance.req_status}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                borderRadius: "0.5em",
              }}
            />
          )}
        </Grid>
        {/* import WorkOffIcon from "@material-ui/icons/WorkOff"; //forced non conditional compliant
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"; // conditional compliant 
*/}
        <Grid item sm={2}>
          {ven_compliance.compliance_status == "compliant" ? (
            <Chip
              icon={<CheckBoxIcon />}
              label={ven_compliance.compliance_status}
              color="primary"
              size="small"
              variant="outlined"
              style={{ color: "#388e3c", borderColor: "#388e3c" }}
            />
          ) : ven_compliance.compliance_status == "non-compliant" ? (
            <Chip
              icon={<CancelIcon />}
              label={ven_compliance.compliance_status}
              color="primary"
              size="small"
              variant="outlined"
              style={{ color: "#f44336", borderColor: "#f44336" }}
            />
          ) : ven_compliance.compliance_status == "forced-compliant" ? (
            <Chip
              icon={<AssignmentTurnedInIcon />}
              label={ven_compliance.compliance_status}
              color="primary"
              size="small"
              variant="outlined"
              style={{ color: "#ff9800", borderColor: "#ff9800" }}
            />
          ) : ven_compliance.compliance_status == "forced-non-compliant" ? (
            <Chip
              icon={<WorkOffIcon />}
              label={ven_compliance.compliance_status}
              color="primary"
              size="small"
              variant="outlined"
              style={{ color: "#f44336", borderColor: "#f44336" }}
            />
          ) : ven_compliance.compliance_status == "conditional-compliant" ? (
            <Chip
              icon={<AccessAlarmIcon />}
              label={ven_compliance.compliance_status}
              color="primary"
              size="small"
              variant="outlined"
              style={{ color: "#ff9800", borderColor: "#ff9800" }}
            />
          ) : (
            ""
          )}
        </Grid>
        <Grid item sm={3}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="caption">
                {ven_compliance.completion_status}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={1}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              history.push({
                pathname: `/vendor-management/vendor/${vendorId}/compliance-form/${ven_compliance.id}`,
              });
            }}
          >
            VIEW
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
