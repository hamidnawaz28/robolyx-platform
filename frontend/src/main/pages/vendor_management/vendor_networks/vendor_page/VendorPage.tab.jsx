import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import BasicProfile from "./basic_profile/BasicProfile.main.page";

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
  tab: {
    minWidth: "125px",
  },
  tabPanel: {
    backgroundColor: "#F7F9FC",
  },
}));

export default function VendorPageTab({ vendor }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
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
            <Tab
              label="Basic Profile"
              {...a11yProps(0)}
              classes={{ root: classes.tab }}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Address"
              {...a11yProps(1)}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Complaince"
              {...a11yProps(2)}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Uploads"
              {...a11yProps(3)}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Reviews"
              {...a11yProps(4)}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Notes"
              {...a11yProps(5)}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Compaince History"
              {...a11yProps(6)}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Flag History"
              {...a11yProps(7)}
            />
            <Tab
              classes={{ root: classes.tab }}
              label="Profile History"
              {...a11yProps(8)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} className={classes.tabPanel}>
          <BasicProfile vendor={vendor} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Configurations
        </TabPanel>
        <TabPanel value={value} index={3}>
          Configurations
        </TabPanel>
        <TabPanel value={value} index={4}>
          Configurations
        </TabPanel>
        <TabPanel value={value} index={5}>
          Configurations
        </TabPanel>
        <TabPanel value={value} index={6}>
          Configurations
        </TabPanel>
        <TabPanel value={value} index={7}>
          Configurations
        </TabPanel>
        <TabPanel value={value} index={8}>
          Configurations
        </TabPanel>
      </div>
    </React.Fragment>
  );
}
