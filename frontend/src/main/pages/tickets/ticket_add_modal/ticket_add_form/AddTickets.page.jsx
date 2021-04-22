import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import localStorage from "../../../../../common/storage/localStorage";

import { addTicket } from "../../redux/ticketActions";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

import TicketAdd from "./TicketAdd";

import validationSchema from "./validationSchema";
import checkoutFormModel from "./checkoutFormModel";
import formInitialValues from "./formInitialValues";

import useStyles from "./styles";

const Alert = styled(MuiAlert)(spacing);
const { formId, formField } = checkoutFormModel;

export default function Addtickets({ setOpen }) {
  const classes = useStyles();
  const [submitError, setSubmitError] = useState("");
  const [errorCheck, setErrorCheck] = useState();

  const dispatch = useDispatch();

  const history = useHistory();

  let activeQuery1 = {
    ticket_title__icontains: "",
    ticket_number__icontains: "",
    ticket_content__icontains: "",
  };

  let fetchApiData = { activeQuery: JSON.stringify(activeQuery1) };

  async function _submitForm(values, actions) {
    console.log(values);

    let post_data = values;

    let tic_num = "TIK" + Math.floor(1000 + Math.random() * 90000000);

    const { userId: userId } =
      localStorage.get("user") && localStorage.get("user");
    post_data.ticket_number = tic_num;
    post_data.created_by = userId;
    post_data.responsible_person = userId;
    post_data.due_date = post_data.due_date.split("T")[0];

    //post_data = JSON.stringify(post_data);

    let data = {
      fetchApiData: fetchApiData,
      post_data: post_data,
    };

    dispatch(addTicket(data));
    setSubmitError("");

    actions.setSubmitting(false);
    // history.push('/admin/sites/');
    setOpen(false);
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
            <TicketAdd formField={formField} />

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
