import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddVendorIcon from "../../../../assets/supply-chain.png";
import VendorApprovals from "./vendor_approvals/VendorApprovals.main.page";
import OnboardDetails from "./onboarding_details/OnBoardDetails.main.page";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ReviewTemplateList from "./review_template_list/ReviewTemplate.main.page";

import AddReviewTemplate from "./add_review_template/AddReviewTemplate";
import SupplierData from "./supplierrequest/allrequests/SupplierData";
import { useLocation } from "react-router-dom";
import { fetchReviewTemplateStart } from "./redux/approvalActions";

import {
  updateQuery,
  updateReviewTemplateQuery,
  updateCurrentPage,
  updateVendorOnboardQuery,
} from "./redux/approvalActions";

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
      width: "90vw",
    },
  },
}));

export default function VendorAdmin() {
  const classes = useStyles();
  const location = useLocation();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(location.value ? location.value : 0);
  const dispatch = useDispatch();

  const initialState = {
    name__icontains: "",
  };

  const initialStateApprovals = {
    vendor_name__icontains: "",
  };

  const { perPage, currentPage, query_review_temp } = useSelector(
    (state) => state.vendorApproval
  );

  let fetchApiData = {
    currentPage: currentPage,
    perPage: perPage,
    query_review_temp: location.query_review_temp,
  };

  useEffect(() => {
    dispatch(updateCurrentPage(1));
  }, [value]);

  const handleChange = (event, newValue) => {
    dispatch(updateCurrentPage(1));
    dispatch(updateReviewTemplateQuery(initialState));
    dispatch(updateQuery(initialStateApprovals));
    dispatch(updateVendorOnboardQuery(initialStateApprovals));
    console.log("Handle Change is triggered");
    setValue(newValue);
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
          <Typography variant={matches ? "h4" : "h2"}>Vendor Admin</Typography>
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
            <Tab label="Review Templates" {...a11yProps(1)} />
            <Tab label="Add New Review Templates" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SupplierData />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VendorApprovals />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OnboardDetails />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewTemplateList setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AddReviewTemplate />
        </TabPanel>
      </div>
    </React.Fragment>
  );
}
