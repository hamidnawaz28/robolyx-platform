import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../components/Input";
import { Grid, Button } from "@material-ui/core";
import * as Yup from "yup";
import { createVendorSchema } from "../formvalidations/Schemas";
import { createVendorInitialValues } from "../formvalidations/InitialValues";
import VendorDetails from "./VendorDetails";
import Documents from "./Documents";
import Tasks from "./Tasks";

import { gr1, gr2, gr3, gr4, gr6 } from "../components/Theme";
const handleSubmit = (formValues) => {
  console.log("Form data ---------", formValues);
};
const CreateVendorForm = () => (
  <Formik
    initialValues={createVendorInitialValues}
    validationSchema={createVendorSchema}
    onSubmit={handleSubmit}
  >
    {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <VendorDetails />
          <Documents />
          <Tasks />
        </Grid>
      </form>
    )}
  </Formik>
);
export default CreateVendorForm;
