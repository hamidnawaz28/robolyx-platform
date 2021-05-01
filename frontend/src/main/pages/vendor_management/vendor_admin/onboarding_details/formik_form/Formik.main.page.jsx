import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import OnBoardDetailsUpdateForm from "./Form";
import formModel from "./formModel";
import formInitialValues from "./formInitialValues";
import useStyles from "./styles";
import { partialUpdateVendor } from "../../redux/approvalActions";

const Alert = styled(MuiAlert)(spacing);
const { formId, formField } = formModel;

export default function MainFormik({ vendor }) {
  const classes = useStyles();
  const [submitError, setSubmitError] = useState("");
  const [errorCheck, setErrorCheck] = useState();
  console.log("Vendor is here ", vendor);

  const reduxVals = {
    category: vendor.category,
    diversity: vendor.diversity,
    payment_term: vendor.payment_term,
    tags: vendor.tags,
    trades: vendor.trades,
  };

  const dispatch = useDispatch();

  const history = useHistory();

  const { query, currentPage, perPage } = useSelector(
    (state) => state.vendorApproval
  );

  let fetchApiData = {
    query: JSON.stringify(query),
    currentPage: currentPage,
    perPage: perPage,
  };

  async function _submitForm(values, actions) {
    console.log(values);

    let { category, tags, trades, diversity, payment_term } = values;

    let post_data = {};

    if (category.length > 0) {
      category = category.map(String);
      post_data.category = category;
    }
    if (tags.length > 0) {
      tags = tags.map(String);
      post_data.tags = tags;
    }
    if (trades.length > 0) {
      trades = trades.map(String);
      post_data.trades = trades;
    }
    if (diversity.length > 0) {
      diversity = diversity.map(String);
      post_data.diversity = diversity;
    }
    if (payment_term.length > 0) {
      payment_term = payment_term.map(String);
      post_data.payment_term = payment_term;
    }

    console.log("Hello", post_data);

    let id = vendor.id;

    let submit_data = { post_data, id, fetchApiData };

    dispatch(partialUpdateVendor(submit_data));
    // setSubmitError("");

    // actions.setSubmitting(false);
    // history.push('/admin/sites/');
  }

  function _handleReset() {
    console.log("Fired Reset");
    console.log(formInitialValues);
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={reduxVals || formInitialValues}
        onSubmit={_submitForm}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form id={formId} style={{ padding: "1.5em", width: "100%" }}>
            <OnBoardDetailsUpdateForm formField={formField} />
            <Divider style={{ marginTop: "1em" }} />

            <div className={classes.buttons}>
              <Button
                type="reset"
                onClick={_handleReset}
                className={classes.button}
              >
                Reset
              </Button>
              <div className={classes.wrapper}>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Save
                </Button>

                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
            {submitError ? (
              <div>
                <Alert mb={4} severity="error">
                  {submitError}
                </Alert>
              </div>
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
