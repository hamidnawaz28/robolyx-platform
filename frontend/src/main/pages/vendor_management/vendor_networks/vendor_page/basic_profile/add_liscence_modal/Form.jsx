import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@material-ui/core";
import { InputField } from "../../../../../../../global/FormFields";
import formField from "./formFields";

export default function CertificatesAndLiscenceForm({ id }) {
  const dispatch = useDispatch();

  return (
    // SelectMultiField
    <React.Fragment>
      <Grid container justify="space-around">
        <Grid item sm={12}>
          <InputField
            name={formField.certificate_name.name}
            label={formField.certificate_name.label}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={12}>
          <InputField
            name={formField.registration_no.name}
            label={formField.registration_no.label}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={12}>
          <InputField
            name={formField.aggregation_body.name}
            label={formField.aggregation_body.label}
            style={{ width: "80%" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
