import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "1em",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "600",
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.text.secondary,
  },
  circleIcon: {
    color: "#388e3c",
  },
  triIcon: {
    color: "#f4a261",
  },
  noCircleIcon: {
    color: "#e63946",
  },
  pendingIcon: {
    color: "#8d99ae",
  },
}));

export default function VendorAccordion({ vendor }) {
  const classes = useStyles();
  let history = useHistory();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{ padding: "0.5em 2em" }}
        >
          <Grid container>
            <Grid item sm={4}>
              {" "}
              <Typography className={classes.heading} color="primary">
                <a
                  className={classes.anchor}
                  onClick={() =>
                    history.push({
                      pathname: `/vendor-management/vendor/${vendor.id}`,
                      vendor: vendor,
                    })
                  }
                >
                  {" "}
                  {vendor.vendor_name}
                </a>
              </Typography>
              <Typography variant="caption">Vendor ID: {vendor.id}</Typography>
            </Grid>
            <Grid item sm={8}>
              <Grid container spacing={4}>
                <Grid item>
                  {/* Start */}
                  <Grid container alignContent="center" spacing={1}>
                    <Grid item>
                      <FiberManualRecordIcon
                        fontSize="small"
                        className={classes.circleIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        className={classes.secondaryHeading}
                      >
                        0 Compliant
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {/* Start */}
                  <Grid container alignContent="center" spacing={1}>
                    <Grid item>
                      <ChangeHistoryIcon
                        fontSize="small"
                        className={classes.triIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        className={classes.secondaryHeading}
                      >
                        1 Conditional
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {/* Start */}
                  <Grid container alignContent="center" spacing={1}>
                    <Grid item>
                      <NotInterestedIcon
                        fontSize="small"
                        className={classes.noCircleIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        className={classes.secondaryHeading}
                      >
                        0 Non-Compliant
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End */}
                <Grid item>
                  {/* Start */}
                  <Grid container alignContent="center" spacing={1}>
                    <Grid item>
                      <RadioButtonUncheckedIcon
                        fontSize="small"
                        className={classes.pendingIcon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        className={classes.secondaryHeading}
                      >
                        0 Pending
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End */}

                <Grid container spacing={4}>
                  <Grid item>
                    {/* Start */}
                    <Grid container alignContent="center" spacing={1}>
                      <Grid item>
                        <AccountTreeIcon fontSize="small" color="primary" />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          className={classes.secondaryHeading}
                        >
                          1 Site Connection
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* End */}
                  <Grid item>
                    {/* Start */}
                    <Grid container alignContent="center" spacing={1}>
                      <Grid item>
                        <MenuBookIcon fontSize="small" color="primary" />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          className={classes.secondaryHeading}
                        >
                          1 Trade
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* End */}
                  <Grid item>
                    {/* Start */}
                    <Grid container alignContent="center" spacing={1}>
                      <Grid item>
                        <LocationCityIcon fontSize="small" color="primary" />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          className={classes.secondaryHeading}
                        >
                          1 Location
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* End */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tags:{" "}
            {vendor.tags
              ? vendor.tags.map((tag) => tag + ", ")
              : "No Tag Added"}
          </Typography>
          <Typography>Categories:</Typography>
          <Typography>Trades:</Typography>
          <Typography>Payment Terms:</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
