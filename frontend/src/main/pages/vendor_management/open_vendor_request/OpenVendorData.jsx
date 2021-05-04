import React,{useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../../../components/Input";
import { Grid, Button } from "@material-ui/core";
import { openVendorSchema } from "../formvalidations/Schemas";
import { openVendorInitalValues } from "../formvalidations/InitialValues";
import { gr1, gr2, gr3, gr4, gr6 } from "../../../../components/Theme";
import GridInput from "../../../../components/GridInput";
// import MailTemplate from "./MailTemplate";
import { postopenVendorData } from "../../../../services/VendorManagement";
import SimpleTable from "../../../../components/SimpleTable";
import Modal from "../../../../components/Modal";
import { TramRounded } from "@material-ui/icons";
import OpenVendorAddress from "./OpenVendorAddress";
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';


const RequestForm = () => {
  const [formstate, setFormState] = useState(false);
  const [vendoraddress,setVendorAddress] = useState([]);
  const headers ={
    "Address Type": "address_type",
    "Street Address": "street_address",
    "Postal Code": "postal_code",
    "Subhurb Name": "subhurb_name",
    "Billing Status": "billing_status",
    "City": "city",
    "State": "state",
    "Country": "country",
    "Lattitude": "lattitude",
    "Longitude": "longitude"
  }
  const handleAddress = (address)=>{
     const addresses = [...vendoraddress]
     addresses.push(address)
     setVendorAddress(addresses)
     setFormState(false)
  }
  const handleSubmit = (formValues) => {

    postopenVendorData(formValues,vendoraddress);

};
  const handleSave = ()=>{

  }
    return (<div>
        <Formik
          initialValues={openVendorInitalValues}
          validationSchema={openVendorSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid {...gr2}>
                  
                  
                
                  <Grid container spacing={3}>
                    <GridInput
                      sp="2"
                      label="Vendor Name"
                      placeholder="Enter a vendor name"
                      type="text"
                      name="vendor_name"
                    />
                    <GridInput
                      sp="2"
                      label="Contact Name"
                      placeholder="Enter a contact name"
                      type="text"
                      name="contact_name"
                    />
                    <GridInput
                      sp="2"
                      label="Contact Email"
                      placeholder="Enter a valid contact email"
                      type="text"
                      name="contact_email"
                    />
                    <GridInput
                      sp="2"
                      label="Contact Phone"
                      placeholder="Enter a contact phone number"
                      type="text"
                      name="contact_phone"
                    />
                    <GridInput
                      sp="2"
                      label="Designation"
                      placeholder="Enter designation"
                      type="text"
                      name="designation"
                    />
                    <GridInput
                      sp="2"
                      label="Department"
                      placeholder="Enter department"
                      type="text"
                      name="department"
                    />
                
                    <GridInput
                      sp="2"
                      label="Password"
                      placeholder="Enter Password"
                      type="text"
                      name="password"
                    />
                    <GridInput
                      sp="2"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      type="text"
                      name="confirm_password"
                    />
                  </Grid>
    
                 
                </Grid>
                
              </Grid>
              <br/>
              <Box style={{margin:"1% 0%"}}>
              <Button variant="contained" color="primary" onClick={()=>setFormState(true)}>
                    Add Address
                  </Button>
                  </Box>
                  <Modal title= "Add Address"
                    handleSave={handleSave}
                      formState={formstate}
                   setFormState={()=>setFormState(false)}
                     field={<OpenVendorAddress handleSubmit={handleAddress}/>} />
                     {(vendoraddress.length ==0 && <h5> No address added</h5>) }
                    {vendoraddress.length !=0 && <SimpleTable data={vendoraddress } headers={headers}/>}
             <Box style={{margin:"1% 0%"}}>
               
              <Button variant="contained" color="primary" onClick={handleSubmit} style={{padding:"0.5% 3.25%" }}>
                    Submit
                  </Button>
                  </Box>
            </form>
          )}    
        </Formik>
      </div>)
  
          };
export default RequestForm;
  