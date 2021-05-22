import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import {
  fetchVendorsStart,
  updateCurrentPage,
} from "../redux/vendorNetworksActions";
import VendorAccordion from "./MyNetwork.accordion";
import VendorNetworkQueryForm from "./MyNetworkSearchQuery";
import Pagination from "@material-ui/lab/Pagination";
import {
  fetchCategoryStart,
  fetchTagsStart,
  fetchTradesStart,
  fetchDiversityStart,
  fetchPaymentTermStart,
} from "../../vendor_admin/redux/approvalActions";

const useStyles = makeStyles((theme) => ({}));

export default function MyNetworks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { searchQuery, currentPage, perPage, allVendors, totalRows } =
    useSelector((state) => state.vendorNetworks);

  let fetchApiData = {
    searchQuery: JSON.stringify(searchQuery),
    currentPage: currentPage,
    perPage: perPage,
  };
  console.log("vendors.count", allVendors.count);

  useEffect(() => {
    dispatch(fetchVendorsStart({ fetchApiData }));
    dispatch(fetchCategoryStart());
    dispatch(fetchTagsStart());
    dispatch(fetchTradesStart());
    dispatch(fetchDiversityStart());
    dispatch(fetchPaymentTermStart());
  }, []);

  const handlePageChange = (event, value) => {
    let currPage = value;
    dispatch(updateCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchVendorsStart({ fetchApiData }));
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={3}>
          <VendorNetworkQueryForm />
        </Grid>
        <Grid item sm={9}>
          {allVendors.data &&
            allVendors.data.map((vendor) => (
              <VendorAccordion vendor={vendor} />
            ))}
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Pagination
            count={Math.ceil(allVendors.count / perPage)}
            page={currentPage}
            onChange={handlePageChange}
            defaultPage={1}
            color="primary"
            size="small"
            color="secondary"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
