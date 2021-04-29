import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../../../../components/Input";
import { Grid, Button } from "@material-ui/core";
import { sizing } from '@material-ui/system';

import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import { vendorAddressSchema } from "../../formvalidations/Schemas";
import { vendorAddressInitialValues } from "../../formvalidations/InitialValues";
import { gr1, gr2, gr3, gr4, gr6 } from "../../../../../components/Theme";
import SelectField from "../../../../../components/SelectField";
import GridInput from "../../../../../components/GridInput";
// import MailTemplate from "./MailTemplate";
import { postopenVendorData } from "../../../../../services/VendorManagement";
const addressData = [
  {label:'Headquarter',value:'Headquarter'},
  {label:'Site', value:'Site'}
];
const RequestForm = ({handleSubmit}) => (
  <div>
    <Formik
      initialValues={vendorAddressInitialValues}
      validationSchema={vendorAddressSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid {...gr1}>
              <Grid container >
                <Grid xs={12} >
                  <SelectField 
                    label ={"Address Type"}
                    name="street_address"
                    data={addressData}
                    style={{width:"100%",marginBottom: "20px"}}
                  />
              </Grid>
                {/* <GridInput
                  sp="2"
                  label="Street Address"
                  placeholder="Enter street address"
                  type="text"
                  name="street_address"
                /> */}
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
