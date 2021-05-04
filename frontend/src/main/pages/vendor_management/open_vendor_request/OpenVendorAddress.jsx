import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../../../components/Input";
import { Grid, Button } from "@material-ui/core";
// import Button from '@material-ui/core/Button';
import { openVendorAddressSchema } from "../formvalidations/Schemas";
import { openVendorAddressInitialValues } from "../formvalidations/InitialValues";
import { gr1, gr2, gr3, gr4, gr6 } from "../../../../components/Theme";
import SelectField from "../../../../components/SelectField";
import GridInput from "../../../../components/GridInput";
import Box from '@material-ui/core/Box';
// import MailTemplate from "./MailTemplate";
import { postopenVendorData } from "../../../../services/VendorManagement";
const addressData = [
  {label:'Headquarter',value:'Headquarter'},
  {label:'Site', value:'Site'}
];
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
                <Grid xs={12} >
                  <SelectField 
                    label ={"Address Type"}
                    name="address_type"
                    data={addressData}
                    style={{width:"100%",marginBottom: "20px"}}
                  />
                </Grid>
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
          <Box  style={{marginTop:"2%",marginLeft: "42%"}}>
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}  >
                Save
          </Button>
          </Box>
        </form>
      )}
    </Formik>
  </div>
);
export default RequestForm;
