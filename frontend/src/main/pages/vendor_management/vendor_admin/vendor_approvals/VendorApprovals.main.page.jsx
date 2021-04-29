import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import VendorCard from "./VendorCard";
import {
  fetchPendingVendorsStart,
  updateCurrentPage,
} from "../redux/approvalActions";
import VendorApprovalQueryForm from "../vendor_approvals/VendorApprovalQueryForm";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  tagIcon: {
    width: "2.5em",
    [theme.breakpoints.down("sm")]: {
      width: "2em",
    },
  },
}));

function VendorApprovals(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    query,
    currentPage,
    perPage,
    pendingVendors,
    totalRows,
  } = useSelector((state) => state.vendorApproval);

  let fetchApiData = {
    query: JSON.stringify(query),
    currentPage: currentPage,
    perPage: perPage,
  };
  console.log("pendingVendors.count", pendingVendors.count);

  useEffect(() => {
    dispatch(fetchPendingVendorsStart({ fetchApiData }));
  }, []);

  const handleChange = (event, value) => {
    let currPage = value;
    dispatch(updateCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchPendingVendorsStart({ fetchApiData }));
  };

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <VendorApprovalQueryForm />
      </Grid>
      {pendingVendors.data &&
        pendingVendors.data.map((vendor) => <VendorCard vendor={vendor} />)}
      <Grid container justify="center">
        <Grid item>
          <Pagination
            count={Math.ceil(pendingVendors.count / perPage)}
            page={currentPage}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            color="secondary"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default VendorApprovals;
