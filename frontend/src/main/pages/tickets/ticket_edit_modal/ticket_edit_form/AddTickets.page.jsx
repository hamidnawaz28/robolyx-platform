import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import localStorage from "../../../../../common/storage/localStorage";

import { UpdateTicket } from "../../redux/ticketActions";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";
import { spacing, typography } from "@material-ui/system";

import TicketAdd from "./TicketAdd";

import validationSchema from "./validationSchema";
import checkoutFormModel from "./checkoutFormModel";
import formInitialValues from "./formInitialValues";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import Box from "@material-ui/core/Box";

import useStyles from "./styles";
import { Grid } from "@material-ui/core";

const Alert = styled(MuiAlert)(spacing);
const { formId, formField } = checkoutFormModel;

export default function Addtickets({ setOpen, ticket }) {
  const classes = useStyles();
  const [submitError, setSubmitError] = useState("");
  const [errorCheck, setErrorCheck] = useState();

  const dispatch = useDispatch();

  const history = useHistory();

  const activeQuery = useSelector((state) => state.tickets.activeQuery);
  let fetchApiData = { activeQuery: JSON.stringify(activeQuery) };

  async function _submitForm(values, actions) {
    let post_data = values;
    alert(values);

    //let tic_num = 'TIK' + Math.floor(1000 + Math.random() * 90000000);

    post_data.due_date = post_data.due_date.split("T")[0];
    post_data.created_by = post_data.created_by.id;

    console.log("post_data from edit", post_data);

    //post_data = JSON.stringify(post_data);
    let data = {
      post_data: post_data,
      fetchApiData: fetchApiData,
    };

    dispatch(UpdateTicket(data));
    setSubmitError("");

    actions.setSubmitting(false);
    // history.push('/admin/sites/');
    setOpen(false);
  }

  function _handleReset() {
    console.log("Fired Reset");
    console.log(formInitialValues);
  }
  console.log(ticket);

  const ticket1 = { ...ticket };
  ticket1["responsible_person"] = ticket1.responsible_person.id;

  console.log(ticket1.list_tickets);

  return (
    <div style={{ padding: "2em" }}>
      <Grid container direction="column">
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Grid
                container
                alignItems="center"
                spacing={2}
                className={classes.titleContainer}
              >
                <Grid item>
                  <Box display={{ xs: "none", md: "block" }}>
                    <CardTravelIcon />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h4" className={classes.tikTitle}>
                    Ticket No : {ticket.ticket_number}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.createInfo}>
              <Typography variant="body2">
                Created by : {ticket.created_by.username}{" "}
              </Typography>
              <Typography variant="body2">
                Creation date : {ticket.creation_date}{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Formik
            initialValues={ticket1 || formInitialValues}
            validationSchema={validationSchema[0]}
            onSubmit={_submitForm}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
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
        </Grid>
      </Grid>
    </div>
  );
}
