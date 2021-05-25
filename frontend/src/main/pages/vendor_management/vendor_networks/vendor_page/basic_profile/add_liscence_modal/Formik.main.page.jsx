import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Divider } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import OnBoardDetailsUpdateForm from "./Form";

import useStyles from "./styles";
import { partialUpdateVendor } from "../../../../vendor_admin/redux/approvalActions";
import { fetchSingleVendorStart } from "../../../redux/vendorNetworksActions";
import CertificatesAndLiscenceForm from "./Form";
import * as Yup from "yup";
import axios from "axios";
import formField from "./formFields";
import localStorage from "../../../../../../../common/storage/localStorage";

const Alert = styled(MuiAlert)(spacing);

export default function MainFormik({ setOpen, refreshCert, setRefreshCert }) {
  const classes = useStyles();
  const [submitError, setSubmitError] = useState("");

  const { singleVendor } = useSelector((state) => state.vendorNetworks);

  const vendor_id = singleVendor.data.id;

  const reduxVals = {
    certificate_name: "",
    registration_no: "",
    aggregation_body: "",
    created_by: "",
  };

  let validation = [
    Yup.object().shape({
      [formField.certificate_name.name]: Yup.string().required(
        `${formField.certificate_name.requiredErrorMsg}`
      ),
      [formField.registration_no.name]: Yup.string().required(
        `${formField.registration_no.requiredErrorMsg}`
      ),
      [formField.aggregation_body.name]: Yup.string().required(
        `${formField.aggregation_body.requiredErrorMsg}`
      ),
    }),
  ];

  const dispatch = useDispatch();

  const history = useHistory();

  const { query_vendor_onboard, currentPage, perPage } = useSelector(
    (state) => state.vendorApproval
  );

  let fetchApiData = {
    query_vendor_onboard: JSON.stringify(query_vendor_onboard),
    currentPage: currentPage,
    perPage: perPage,
  };

  async function _submitForm(values, actions) {
    console.log(values);

    let { certificate_name, registration_no, aggregation_body } = values;

    let user = localStorage.get("user");

    let created_by = user.userId;

    let post_data = {
      vendor_id: vendor_id,
      certificate_name: certificate_name,
      registration_no: registration_no,
      aggregation_body: aggregation_body,
      created_by: created_by,
    };

    console.log("Hello", post_data);

    var config = {
      method: "post",
      url: `http://127.0.0.1:8090/api/vendor_management/vendor-cert-lisc/`,
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
          alert("Certificate/Liscence Added Successfully");
          setRefreshCert(!refreshCert);
        } else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    //dispatch(fetchSingleVendorStart(id));
    // setSubmitError("");
    setOpen(false);
    // actions.setSubmitting(false);
    // history.push('/admin/sites/');
  }

  function _handleReset() {
    console.log("Fired Reset");
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={reduxVals}
        onSubmit={_submitForm}
        enableReinitialize
        validationSchema={validation[0]}
      >
        {({ isSubmitting }) => (
          <Form style={{ padding: "1.5em", width: "100%" }}>
            <CertificatesAndLiscenceForm />
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
