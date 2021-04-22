import React, { useEffect, useState } from "react";
import GridInput from "../../../../components/GridInput";
import { Grid } from "@material-ui/core";
import { gr3, gr2 } from "../../../../components/Theme";
import { H3 } from "../../../../components/Headings";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LabelValue from "../../../../components/LabelValue";
const BoardingForm = () => {
  return (
    <Formik>
      <>
        <H3 label="Client Details" />
        <Grid container>
          <Grid {...gr3}>
            <LabelValue label="Client Name" value="Hamid" />
          </Grid>
          <Grid {...gr2}>
            <LabelValue label="Website" value="robolyx.com" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid {...gr3}>
            <LabelValue label="Location" value="USA" />
          </Grid>
          <Grid {...gr2}>
            <LabelValue label="Address" value="CALIFORNIA, USA" />
          </Grid>
        </Grid>
        <H3 label="Client Contact Details" />
        <Grid container>
          <Grid {...gr3}>
            <LabelValue label="Contact Name" value="Hamid Nawaz" />
          </Grid>
          <Grid {...gr2}>
            <LabelValue label="Email" value="hamid.nawaz@gmail.com" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid {...gr3}>
            <LabelValue label="Phone" value="03876877763" />
          </Grid>
        </Grid>

        <H3 label="Company Details" />
        <Grid container>
          <Grid {...gr3}>
            <LabelValue label="Vendor Name" value="Waqas" />
          </Grid>
          <Grid {...gr2}>
            <LabelValue label="Website" value="robolyx.com" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid {...gr3}>
            <LabelValue label="Location" value="Australia" />
          </Grid>
        </Grid>
        <H3 label="Additional Details" />
        <Grid container>
          <GridInput
            sp="2"
            label="Nature of Bussiness"
            placeholder="Bussiness"
            type="text"
            name="bussinessNature"
          />
          <GridInput
            sp="2"
            label="Account Number"
            placeholder="Enter a number"
            type="text"
            name="accountNumber"
          />
          <GridInput
            sp="2"
            label="Tier"
            placeholder="Tier"
            type="text"
            name="tier"
          />
          <GridInput
            sp="2"
            label="Curreny"
            placeholder="INR"
            type="text"
            name="currency"
          />
          <GridInput
            sp="2"
            label="SC Code"
            placeholder=""
            type="text"
            name="scCode"
          />
          <GridInput
            sp="2"
            label="NA/CS Code"
            placeholder=""
            type="text"
            name="nacsCode"
          />

          <GridInput
            sp="2"
            label="BN Code"
            placeholder=""
            type="text"
            name="bnCode"
          />
          <GridInput
            sp="2"
            label="Tax Reg Number"
            placeholder=""
            type="text"
            name="taxRegNumber"
          />
          <GridInput
            sp="2"
            label="Address"
            placeholder=""
            type="text"
            name="address"
          />
          <GridInput
            sp="2"
            label="Billing Address"
            placeholder=""
            type="text"
            name="billingAddress"
          />
          <GridInput
            sp="2"
            label="DUNS Number"
            placeholder=""
            type="text"
            name="dunsNumber"
          />
        </Grid>
        <H3 label="Bank Details" />
        <Grid container>
          <GridInput
            sp="2"
            label="Account Name"
            placeholder="Sharpen"
            type="text"
            name="accountName"
          />
          <GridInput
            sp="2"
            label="Account Number"
            placeholder="PK56U67"
            type="text"
            name="accountNumber"
          />
          <GridInput
            sp="2"
            label="Bank Name"
            placeholder="R567"
            type="text"
            name="bankName"
          />
          <GridInput
            sp="2"
            label="Bank Number(Routing Code)"
            placeholder="R567"
            type="text"
            name="routingCode"
          />
          <GridInput
            sp="2"
            label="Swift BIC"
            placeholder=""
            type="text"
            name="swiftBic"
          />
          <GridInput
            sp="2"
            label="Email Address for PO"
            placeholder="email@gmail.com"
            type="text"
            name="emailForPo"
          />
          <GridInput
            sp="2"
            label="Email Address for Payment Remittence"
            placeholder="user@gmail.com"
            type="text"
            name="emialForPr"
          />
          <GridInput
            sp="2"
            label="Building No/Name and Street"
            placeholder=""
            type="text"
            name="buildingAddress"
          />
        </Grid>
      </>
    </Formik>
  );
};
export default BoardingForm;
