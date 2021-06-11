import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import localStorage from "../../../../../../../common/storage/localStorage";
import axios from "axios";

//import { addTicket } from "../../redux/ticketActions";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

import FormReview from "./Form";

import validationSchema from "./validationSchema";
import FormModel from "./FormModel";
import formInitialValues from "./formInitialValues";

import useStyles from "./styles";
import { useParams } from "react-router-dom";
import { fetchVenComplianceListStart } from "../../../redux/vendorNetworksActions";

const Alert = styled(MuiAlert)(spacing);
const { formId, formField } = FormModel;

export default function MainFormikPage({ setOpen, action, ven_note, open }) {
  const classes = useStyles();

  const [submitError, setSubmitError] = useState("");
  const [reviewTempName, setReviewTempName] = useState("");

  let { id } = useParams();

  const { complianceQuery, currentPage, perPage, ven_compliance_list } =
    useSelector((state) => state.vendorNetworks);

  let fetchApiData = {
    vendorId: id,
    complianceQuery: JSON.stringify(complianceQuery),
    currentPage: currentPage,
    perPage: perPage,
  };

  const dispatch = useDispatch();

  const history = useHistory();

  async function _submitForm(values, actions) {
    console.log(values);

    let post_data = values;
    const { userId } = localStorage.get("user") && localStorage.get("user");

    post_data.vendor_id = parseInt(id);
    post_data.created_by = userId;
    post_data.compliance_template = values.compliance_template.form_questions;
    post_data.compliance_form_name = values.compliance_form_name;
    post_data.priority = values.priority;
    post_data.req_status = values.req_status;
    post_data.deadline = values.deadline.split("T", 1)[0];
    post_data.form_type = values.form_type;

    console.log("from add", post_data);
    var config = {
      method: "post",
      url: `http://127.0.0.1:8090/api/vendor_management/comp-vendor-task/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(post_data),
    };
    axios(config)
      .then((res) => {
        console.log(res);

        const { data } = res;
        const { error, message } = JSON.stringify(data);
        if (!error) {
          console.log("posted data", data);
          alert("Compliance Task Added Successfully");
          dispatch(fetchVenComplianceListStart({ fetchApiData }));
          setSubmitError("");
          actions.setSubmitting(false);
          setOpen(false);
        } else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    setOpen(!open);
    setSubmitError("");
    actions.setSubmitting(false);
  }

  function _handleReset() {
    console.log("Fired Reset");
    console.log(formInitialValues);
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema[0]}
        onSubmit={_submitForm}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form id={formId} style={{ padding: "1.5em" }}>
            <FormReview
              formField={formField}
              action={action}
              setReviewTempName={setReviewTempName}
            />

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
