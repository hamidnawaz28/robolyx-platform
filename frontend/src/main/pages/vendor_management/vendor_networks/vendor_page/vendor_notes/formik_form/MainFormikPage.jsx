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

import NoteForm from "./NoteForm";

import validationSchema from "./validationSchema";
import FormModel from "./FormModel";
import formInitialValues from "./formInitialValues";

import useStyles from "./styles";
import { useParams } from "react-router-dom";
import { fetchNotesStart } from "../../../redux/vendorNetworksActions";

const Alert = styled(MuiAlert)(spacing);
const { formId, formField } = FormModel;

export default function MainFormikPage({ setOpen, action, ven_note, open }) {
  const classes = useStyles();
  let { id } = useParams();
  console.log("iddd", id);
  const [submitError, setSubmitError] = useState("");
  const [initialValues, setInitialValues] = useState(formInitialValues);
  const [errorCheck, setErrorCheck] = useState();

  const { noteQuery, currentPage, perPage, vendorNotes } = useSelector(
    (state) => state.vendorNetworks
  );

  let fetchApiData = {
    vendorId: parseInt(id),
    noteQuery: JSON.stringify(noteQuery),
    currentPage: currentPage,
    perPage: perPage,
  };

  const reduxVals = {
    category: ven_note && ven_note.category,
    description: ven_note && ven_note.description,
    priority: ven_note && ven_note.priority,
    subject: ven_note && ven_note.subject,
  };

  const dispatch = useDispatch();

  const history = useHistory();

  async function _submitForm(values, actions) {
    console.log(values);
    let post_data = values;
    const { userId: userId } =
      localStorage.get("user") && localStorage.get("user");
    console.log("userId", userId);
    let formData = new FormData();
    if (post_data.notes_file == null) {
      delete post_data.notes_file;
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("priority", values.priority);
      formData.append("subject", values.subject);
      formData.append("vendor_id", parseInt(id));
      formData.append("created_by", userId);
    } else {
      formData.append("notes_file", values.notes_file);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("priority", values.priority);
      formData.append("subject", values.subject);
      formData.append("vendor_id", parseInt(id));
      formData.append("created_by", userId);
    }

    if (action == "add") {
      console.log("Hello from add");

      //post_data.vendor_id = parseInt(id);
      //post_data.created_by = userId;
      console.log("from add", formData);
      var config = {
        method: "post",
        url: `http://127.0.0.1:8090/api/vendor_management/notes/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      };
      axios(config)
        .then((res) => {
          console.log(res);

          const { data } = res;
          const { error, message } = JSON.stringify(data);
          if (!error) {
            console.log("posted data", data);
            alert("Note Added Successfully");
            dispatch(fetchNotesStart({ fetchApiData }));
            setSubmitError("");
            actions.setSubmitting(false);
            actions.resetForm();

            setOpen(false);
          } else alert("Error");
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (action == "edit") {
      console.log("Hello from edit");
      let noteId = ven_note && ven_note.id;
      console.log(noteId);
      var config = {
        method: "put",
        url: `http://127.0.0.1:8090/api/vendor_management/notes/${noteId}/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      };
      axios(config)
        .then((res) => {
          console.log(res);

          const { data } = res;
          const { error, message } = data;
          if (!error) {
            //console.log("posted data", data);
            alert("Note Updated Successfully");
            dispatch(fetchNotesStart({ fetchApiData }));
          } else alert(message);
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      setOpen(false);
      setSubmitError("");
      actions.setSubmitting(false);
    }
  }

  function _handleReset() {
    console.log("Fired Reset");
    console.log(formInitialValues);
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={action == "add" ? formInitialValues : reduxVals}
        validationSchema={validationSchema[0]}
        onSubmit={_submitForm}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form id={formId} style={{ padding: "1.5em" }}>
            <NoteForm
              formField={formField}
              action={action}
              setFieldValue={setFieldValue}
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
