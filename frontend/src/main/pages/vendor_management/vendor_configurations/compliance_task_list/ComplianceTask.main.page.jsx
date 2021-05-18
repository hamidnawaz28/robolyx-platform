import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ReviewTemplateCard from "./ComplianceTaskCard";

import {
  fetchReviewTemplateStart,
  updateCurrentPage,
} from "../../vendor_admin/redux/approvalActions";
import ReviewTemplateQueryForm from "./ComplianceTaskQueryForm";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  tagIcon: {
    width: "2.5em",
    [theme.breakpoints.down("sm")]: {
      width: "2em",
    },
  },
}));

function ReviewTemplateList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    query_review_temp,
    currentPage,
    perPage,
    reviewTemplates,
    totalRows,
  } = useSelector((state) => state.vendorApproval);

  let fetchApiData = {
    query_review_temp: JSON.stringify(query_review_temp),
    currentPage: currentPage,
    perPage: perPage,
  };
  console.log("vendors.count", reviewTemplates);

  useEffect(() => {
    dispatch(fetchReviewTemplateStart({ fetchApiData }));
  }, []);

  const handleChange = (event, value) => {
    let currPage = value;
    dispatch(updateCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchReviewTemplateStart({ fetchApiData }));
  };

  return (
    <>
      <Typography
        variant={matches ? "h3" : "h2"}
        style={{ marginBottom: "0.5em" }}
      >
        Compliance Tasks
      </Typography>
      <ReviewTemplateQueryForm />

      <Grid container spacing={2}>
        {reviewTemplates.data &&
          reviewTemplates.data.map((review_template) => (
            <ReviewTemplateCard
              review_template={review_template}
              setValue={props.setValue}
            />
          ))}
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Pagination
            count={Math.ceil(reviewTemplates.count / perPage)}
            page={currentPage}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="small"
            color="secondary"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ReviewTemplateList;
