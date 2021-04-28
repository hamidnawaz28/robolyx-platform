import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddVendorIcon from "../../../../assets/supply-chain.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "79vw",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
  },
}));

export default function VendorAdmin() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <img
            src={AddVendorIcon}
            alt="add vendor logo"
            style={{ width: "3em" }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h2">Vendor Admin</Typography>
        </Grid>
      </Grid>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Supplier Requests" {...a11yProps(0)} />
            <Tab label="Vendor Approvals" {...a11yProps(1)} />
            <Tab label="Vendor OnBoarding Details" {...a11yProps(1)} />
            <Tab label="Vendor Response Approval" {...a11yProps(1)} />
            <Tab label="Add Review Templates" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item 3
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item 4
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item 5
        </TabPanel>
      </div>
    </React.Fragment>
  );
}