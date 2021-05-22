import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  updateQuery,
  fetchVendorsStart,
  updateCurrentPage,
} from "../redux/vendorNetworksActions";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const BorderWrapper = styled(Box)`
  background: white;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "1em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.8em",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
}));

function VendorNetworkQueryForm(props) {
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const vendorNetworks = useSelector((state) => state.vendorNetworks);
  const { perPage, currentPage, searchQuery } = vendorNetworks;
  const classes = useStyles();
  const [activeStatus, setActiveStatus] = React.useState("");

  const handleActiveChange = (event) => {
    setActiveStatus(event.target.value);
    setFormData({
      ...formData,
      approval_status__exact: event.target.value,
    });
  };

  const initialState = {
    vendor_name__icontains: "",
    id__icontains: "",
  };

  const [formData, setFormData] = useState(initialState);

  let fetchApiData = {
    currentPage: currentPage,
    perPage: perPage,
    searchQuery: searchQuery,
  };

  const searchQueryHandle = () => {
    fetchApiData["searchQuery"] = formData;
    fetchApiData["currentPage"] = 1;
    dispatch(updateQuery(formData));
    dispatch(fetchVendorsStart({ fetchApiData }));
  };

  const resetQueryHandle = () => {
    fetchApiData["searchQuery"] = JSON.stringify(initialState);
    setFormData(initialState);
    dispatch(updateQuery(initialState));
    dispatch(fetchVendorsStart({ fetchApiData }));
    dispatch(updateCurrentPage(1));
  };

  return (
    <BorderWrapper p={matches ? 1 : 3} mb={matches ? 0 : 3}>
      <Grid
        container
        spacing={2}
        style={{ marginTop: matches ? "0em" : "0.5em" }}
      >
        <Grid container spacing={2} style={{ marginBottom: "0.5em" }}>
          <Grid item>
            <Button
              style={{
                backgroundColor: "#232f3e",
                color: "#fff",
                width: "7em",
              }}
              variant="contained"
              startIcon={<Search />}
              onClick={() => searchQueryHandle()}
              size="small"
            >
              Search
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                backgroundColor: "#232f3e",
                color: "#fff",
                width: "7em",
              }}
              variant="contained"
              startIcon={<RotateLeft />}
              onClick={() => resetQueryHandle()}
              size="small"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={matches ? "Vendor Name" : "Search by Vendor Name"}
            style={{ width: matches ? "90%" : "100%" }}
            value={formData.vendor_name__icontains}
            size="small"
            onChange={(e) =>
              setFormData({
                ...formData,
                vendor_name__icontains: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item>
          <TextField
            id="search-by-id"
            variant="outlined"
            label={matches ? "Vendor Name" : "Search by Vendor ID"}
            style={{ width: matches ? "90%" : "100%" }}
            value={formData.id__icontains}
            size="small"
            onChange={(e) =>
              setFormData({
                ...formData,
                id__icontains: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="approval-status-label">Approval Status</InputLabel>
            <Select
              labelId="approval-status-label"
              id="approval-status"
              value={activeStatus}
              onChange={handleActiveChange}
            >
              <MenuItem value="approved">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </BorderWrapper>
  );
}
export default VendorNetworkQueryForm;
