import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MainFormik from "./formik_form_generator/Formik.main.page";

import { fetchVenReviewlistStart } from "../../redux/vendorNetworksActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: 424,
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function ReviewForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  let { id, vendorId } = useParams();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { searchVenReview, currentPage, perPage, ven_review_templates } =
    useSelector((state) => state.vendorNetworks);

  let fetchApiData = {
    vendorId: vendorId,
    searchVenReview: JSON.stringify(searchVenReview),
    currentPage: currentPage,
    perPage: perPage,
  };
  console.log("vendors.count", ven_review_templates);

  useEffect(() => {
    dispatch(fetchVenReviewlistStart({ fetchApiData }));
  }, []);

  let vendorTemp =
    ven_review_templates.data &&
    ven_review_templates.data.filter((temp) => temp.id == id);

  console.log("ven_review_templates", vendorTemp);

  return (
    <Grid container>
      <Grid item sm={12}>
        <Grid container spacing={1}>
          <Grid item>
            <ArrowBackIcon
              className={classes.backArrow}
              onClick={() => {
                history.push({
                  pathname: `/vendor-management/vendor/${vendorId}`,
                });
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6"> Review Templates </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            {vendorTemp &&
              vendorTemp[0].review_template.map((sec) => (
                <Tab label={sec.section_name} {...a11yProps(0)} />
              ))}
          </Tabs>
          {vendorTemp &&
            vendorTemp[0].review_template.map((sec, index) => (
              <TabPanel value={value} index={index}>
                <MainFormik section={sec} sectionName={sec.section_name} />
              </TabPanel>
            ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default ReviewForm;
