import React from "react";
import Input from "../components/Input";
import { Grid } from "@material-ui/core";
import { gr1, gr2, gr3, gr4, gr6 } from "../components/Theme";
import GridInput from "../components/GridInput";
const VendorDetails = () => {
  return (
    <div>
      <Grid container>
        <GridInput
          sp="2"
          label="Vendor Name"
          placeholder=""
          type="text"
          name="vendorName"
        />
        <GridInput
          sp="2"
          label="Website"
          placeholder=""
          type="text"
          name="website"
        />
        <GridInput
          sp="2"
          label="Address"
          placeholder="Enter your Address"
          type="text"
          name="address"
        />
        <GridInput
          sp="2"
          label="Street Address"
          placeholder="Enter your Street Address"
          type="text"
          name="streetAddress"
        />
        <GridInput
          sp="2"
          label="City"
          placeholder="Enter your City"
          type="text"
          name="city"
        />
        <GridInput
          sp="2"
          label="State"
          placeholder="Enter your State"
          type="text"
          name="state"
        />
        <GridInput
          sp="2"
          label="Zip code"
          placeholder="Enter your Zip code"
          type="text"
          name="zipCode"
        />
        <GridInput sp="2" label="Country" type="text" name="zipCode" />
        <GridInput sp="2" label="Tier" type="text" name="tier" />
        <GridInput
          sp="2"
          label="Billing Address"
          type="textarea"
          name="billingAddress"
        />
        <GridInput sp="2" label="Payment Term" type="text" name="paymentTerm" />
        <GridInput
          sp="2"
          label="Onboard Templates"
          type="text"
          name="onboardTemplates"
        />
      </Grid>
      <h3>Contact Details</h3>
      <Grid container>
        <GridInput
          sp="2"
          label="Email"
          placeholder="Email"
          type="text"
          name="email"
        />
        <GridInput
          sp="2"
          label="First Name"
          placeholder="Hamid"
          type="text"
          name="firstName"
        />
        <GridInput
          sp="2"
          label="Last Name"
          placeholder="Nawaz"
          type="text"
          name="lastName"
        />
        <GridInput
          sp="2"
          label="Phone Number"
          placeholder=""
          type="text"
          name="phoneNumber"
        />
        <GridInput
          sp="2"
          label="Status"
          placeholder=""
          type="text"
          name="status"
        />
        <GridInput
          sp="2"
          label="Owner Name"
          placeholder=""
          type="text"
          name="ownerName"
        />
      </Grid>
    </div>
  );
};
export default VendorDetails;
