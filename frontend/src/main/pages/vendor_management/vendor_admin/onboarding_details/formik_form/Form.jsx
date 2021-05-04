import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { SelectMultiField } from "../../../../../../global/FormFields";
import {
  fetchCategoryStart,
  fetchTagsStart,
  fetchTradesStart,
  fetchDiversityStart,
  fetchPaymentTermStart,
} from "../../redux/approvalActions";

export default function Form(props) {
  const {
    formField: { category, tags, trades, diversity, payment_term },
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryStart());
    dispatch(fetchTagsStart());
    dispatch(fetchTradesStart());
    dispatch(fetchDiversityStart());
    dispatch(fetchPaymentTermStart());
  }, []);

  const categoryList = useSelector((state) => state.vendorApproval.categories);
  const tagsList = useSelector((state) => state.vendorApproval.tags);
  const tradesList = useSelector((state) => state.vendorApproval.trades);
  const diversityList = useSelector((state) => state.vendorApproval.diversity);
  const paymenttermList = useSelector(
    (state) => state.vendorApproval.paymentterm
  );

  console.log("category", category);

  return (
    // SelectMultiField
    <React.Fragment>
      <Grid container justify="space-around">
        <Grid item sm={12} md={2}>
          <SelectMultiField
            name={category.name}
            label={category.label}
            data={categoryList && categoryList}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={12} md={2}>
          <SelectMultiField
            name={tags.name}
            label={tags.label}
            data={tagsList && tagsList}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={12} md={2}>
          <SelectMultiField
            name={trades.name}
            label={trades.label}
            data={tradesList && tradesList}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={12} md={2}>
          <SelectMultiField
            name={diversity.name}
            label={diversity.label}
            data={diversityList && diversityList}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={12} md={2}>
          <SelectMultiField
            name={payment_term.name}
            label={payment_term.label}
            data={paymenttermList && paymenttermList}
            style={{ width: "80%" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
