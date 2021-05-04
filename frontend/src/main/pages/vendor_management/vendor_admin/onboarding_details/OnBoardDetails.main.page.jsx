import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import OnboardDetailsAccordion from "./OnboardDetails.accordion";
import {
  fetchApprovedVendorsStart,
  updateCurrentPage,
} from "../redux/approvalActions";
import OnboardDetailsQueryForm from "../onboarding_details/OnboardDetailsSearch";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  tagIcon: {
    width: "2.5em",
    [theme.breakpoints.down("sm")]: {
      width: "2em",
    },
  },
}));

function OnboardDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { query, currentPage, perPage, vendors, totalRows } = useSelector(
    (state) => state.vendorApproval
  );

  let fetchApiData = {
    query: JSON.stringify(query),
    currentPage: currentPage,
    perPage: perPage,
  };
  console.log("vendors.count", vendors.count);

  useEffect(() => {
    dispatch(fetchApprovedVendorsStart({ fetchApiData }));
  }, []);

  const handleChange = (event, value) => {
    let currPage = value;
    dispatch(updateCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchApprovedVendorsStart({ fetchApiData }));
  };

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <OnboardDetailsQueryForm />
      </Grid>
      {vendors.data &&
        vendors.data.map((vendor) => (
          <OnboardDetailsAccordion vendor={vendor} />
        ))}
      <Grid container justify="center">
        <Grid item style={{ marginTop: "0.5em" }}>
          <Pagination
            count={Math.ceil(vendors.count / perPage)}
            page={currentPage}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            color="secondary"
            size="small"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OnboardDetails;
