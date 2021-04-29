import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../../../components/Input";
import { Grid, Button } from "@material-ui/core";
// import Button from '@material-ui/core/Button';
import { openVendorAddressSchema } from "../formvalidations/Schemas";
import { openVendorAddressInitialValues } from "../formvalidations/InitialValues";
import { gr1, gr2, gr3, gr4, gr6 } from "../../../../components/Theme";

import GridInput from "../../../../components/GridInput";
// import MailTemplate from "./MailTemplate";
import { postopenVendorData } from "../../../../services/VendorManagement";

const RequestForm = ({handleSubmit}) => (
  <div>
    <Formik
      initialValues={openVendorAddressInitialValues}
      validationSchema={openVendorAddressSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid {...gr1}>
              <Grid container spacing={3}>
                
                <GridInput
                  sp="2"
                  label="Address Type"
                  placeholder="Enter address type"
                  type="text"
                  name="address_type"
                />
                <GridInput
                  sp="2"
                  label="Street Address"
                  placeholder="Enter street address"
                  type="text"
                  name="street_address"
                />
                <GridInput
                  sp="2"
                  label="Postal Code"
                  placeholder="Enter postal code"
                  type="text"
                  name="postal_code"
                />
                <GridInput
                  sp="2"
                  label="Subhurb Name"
                  placeholder="Enter subhurb name"
                  type="text"
                  name="subhurb_name"
                />
                <GridInput
                  sp="2"
                  label="City"
                  placeholder="Enter city"
                  type="text"
                  name="city"
                />
                <GridInput
                  sp="2"
                  label="State"
                  placeholder="Enter state"
                  type="text"
                  name="state"
                />
               <GridInput
                  sp="2"
                  label="Country"
                  placeholder="Enter country"
                  type="text"
                  name="country"
                />

                <GridInput
                  sp="2"
                  label="Billing Status"
                  placeholder="Enter billing status"
                  type="text"
                  name="billing_status"
                />
                 <GridInput
                  sp="2"
                  label="Longitude"
                  placeholder="Enter longitude"
                  type="text"
                  name="longitude"
                />
                <GridInput
                  sp="2"
                  label="Lattitude"
                  placeholder="Enter lattitude"
                  type="text"
                  name="lattitude"
                />
                
               

              </Grid>

             
            </Grid>
            
          </Grid>
    
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} >
                Save
          </Button>
         
        </form>
      )}
    </Formik>
  </div>
);
export default RequestForm;
