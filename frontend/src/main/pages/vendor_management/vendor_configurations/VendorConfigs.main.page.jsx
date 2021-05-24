import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddVendorIcon from "../../../../assets/supply-chain.png";
import Configurations from "./configurations/Configurations.main.page";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddComplianceTask from "./add_compliance_task/AddComplianceTask";
import ComplianceTaskList from "./compliance_task_list/ComplianceTask.main.page";
import { updateComplianceQuery } from "./redux/complianceTaskActions";

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
      {value === index && <Box p={3}>{children}</Box>}
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
      width: "91vw",
    },
  },
}));

export default function VendorConfigurations() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(location.value ? location.value : 0);

  const initialState = {
    form_name__icontains: "",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(updateComplianceQuery(initialState));
  };

  return (
    <React.Fragment>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <img
            src={AddVendorIcon}
            alt="add vendor logo"
            style={{ width: matches ? "2em" : "3em" }}
          />
        </Grid>
        <Grid item>
          <Typography variant={matches ? "h4" : "h2"}>
            Vendor Configurations
          </Typography>
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
            <Tab label="Vendor Configurations" {...a11yProps(0)} />
            <Tab label="Add Compliance Task" {...a11yProps(1)} />
            <Tab label="Compliance Task List" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Configurations />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddComplianceTask />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ComplianceTaskList />
        </TabPanel>
      </div>
    </React.Fragment>
  );
}
