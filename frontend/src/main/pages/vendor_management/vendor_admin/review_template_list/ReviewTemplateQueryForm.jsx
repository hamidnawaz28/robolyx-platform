import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  updateReviewTemplateQuery,
  fetchReviewTemplateStart,
} from "../redux/approvalActions";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
}));

function ReviewTemplateQueryForm(props) {
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const vendorApproval = useSelector((state) => state.vendorApproval);
  const { perPage, currentPage, query } = vendorApproval;
  const classes = useStyles();

  const initialState = {
    name__icontains: "",
  };

  const [formData, setFormData] = useState(initialState);

  let fetchApiData = {
    currentPage: currentPage,
    perPage: perPage,
  };

  const searchQueryHandle = () => {
    fetchApiData["query_review_temp"] = formData;
    fetchApiData["currentPage"] = 1;
    dispatch(updateReviewTemplateQuery(formData));
    dispatch(fetchReviewTemplateStart({ fetchApiData }));
  };

  const resetQueryHandle = () => {
    fetchApiData["query_review_temp"] = JSON.stringify(initialState);
    setFormData(initialState);
    dispatch(updateReviewTemplateQuery(initialState));
    dispatch(fetchReviewTemplateStart({ fetchApiData }));
  };

  return (
    <BorderWrapper
      p={matches ? 1 : 3}
      mb={matches ? 0 : 3}
      style={{ marginBottom: matches ? "1em" : "0.5em" }}
    >
      <Grid
        container
        spacing={0}
        style={{ marginTop: matches ? "0em" : "0.5em" }}
        direction="row"
      >
        <Grid item sm={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={matches ? "Template Name" : "Search by Template Name"}
            style={{ width: matches ? "90%" : "100%" }}
            value={formData.name__icontains}
            fullWidth={true}
            size="small"
            onChange={(e) =>
              setFormData({
                ...formData,
                name__icontains: e.target.value,
              })
            }
          />
        </Grid>
        {matches ? (
          <Grid item>
            <Search
              onClick={() => searchQueryHandle()}
              style={{
                marginTop: "0.3em",
              }}
            />
            <RotateLeft
              onClick={() => resetQueryHandle()}
              style={{
                marginLeft: "0.1em",
                marginTop: "0.3em",
              }}
            />
          </Grid>
        ) : (
          <Grid item>
            <Grid container spacing={2} className={classes.root}>
              <Grid item>
                <Button
                  style={{
                    backgroundColor: "#232f3e",
                    color: "#fff",
                    width: "10em",
                  }}
                  variant="contained"
                  startIcon={<Search />}
                  onClick={() => searchQueryHandle()}
                >
                  Search
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    backgroundColor: "#232f3e",
                    color: "#fff",
                    width: "10em",
                  }}
                  variant="contained"
                  startIcon={<RotateLeft />}
                  onClick={() => resetQueryHandle()}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </BorderWrapper>
  );
}
export default ReviewTemplateQueryForm;
