import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../../../../components/Input";
import { Grid, Button } from "@material-ui/core";
import * as Yup from "yup";
import { supplierRequestSchema } from "../formvalidations/Schemas";
import { supplierRequestInitialValues } from "../formvalidations/InitialValues";
import { gr1, gr2, gr3, gr4, gr6 } from "../../../../../components/Theme";
import GridInput from "../../../../../components/GridInput";
import MailTemplate from "./MailTemplate";
import { postVendorRequest } from "../../../../../services/VendorManagement";
const handleSubmit = (formValues) => {
  postVendorRequest(formValues);
};
const RequestForm = () => (
  <div>
    <Formik
      initialValues={supplierRequestInitialValues}
      validationSchema={supplierRequestSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid {...gr2}>
              <h3>From Robolyx</h3>
              <h3>Company Information</h3>
              <Input
                label="Company Name"
                placeholder="Enter a company name"
                type="text"
                name="company_name"
              />
              <h3>Contact Information</h3>
              <Grid container spacing={3}>
                <GridInput
                  sp="2"
                  label="First Name"
                  placeholder="Enter a first name"
                  type="text"
                  name="first_name"
                />
                <GridInput
                  sp="2"
                  label="Last Name"
                  placeholder="Enter a last name"
                  type="text"
                  name="last_name"
                />
                <GridInput
                  sp="2"
                  label="Email"
                  placeholder="Enter a valid email"
                  type="text"
                  name="email"
                />
                <GridInput
                  sp="2"
                  label="Phone Number"
                  placeholder="Enter a phone number"
                  type="text"
                  name="phone_no"
                />
                <GridInput
                  sp="2"
                  label="Languages"
                  placeholder="English"
                  type="text"
                  name="language"
                />
                <GridInput
                  sp="2"
                  label="Country"
                  placeholder="Country"
                  type="text"
                  name="country"
                />
              </Grid>
              <h3>Additional Information</h3>
              <p>Please provide more information about this supplier</p>
              <Input
                label=""
                placeholder="Enter your comment"
                type="text"
                name="extra_comments"
              />
              <Grid container spacing={-1}>
                <GridInput
                  sp="2"
                  label="Requesting Sites"
                  placeholder="Choose an operator"
                  type="text"
                  name="requesting_site"
                />
                <GridInput
                  sp="2"
                  label="Deadline"
                  placeholder=""
                  type="date"
                  name="deadline"
                />
                <GridInput
                  sp="2"
                  label="Requesting Contact"
                  placeholder="Hamid, hamid.nawaz28@yahoo.com"
                  type="text"
                  name="request_contact"
                />
              </Grid>

              <h3>External IDs</h3>
              <Button variant="contained" color="primary">
                +ADD EXTERNAL ID
              </Button>
            </Grid>
            <Grid {...gr2}>
              <MailTemplate data={values} submitForm={handleSubmit} />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  </div>
);
export default RequestForm;
