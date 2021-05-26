import React from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  InputField,
  SelectField,
} from "../../../../../../../global/FormFields";
import CustomerServiceIcon from "../../../../../../../assets/customer-service.png";

const address_type_options = [
  {
    value: "HO",
    label: "HO",
  },
  {
    value: "SO",
    label: "SO",
  },
];

const billing_options = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

export default function AddressForm(props) {
  const {
    formField: {
      address_type,
      street_address,
      postal_code,
      suburb_name,
      city,
      state,
      country,
      billing_status,
      longitude,
      latitude,
    },
  } = props;

  return (
    <React.Fragment>
      <Grid container alignItems="center" style={{ marginBottom: "0.4em" }}>
        <Grid item style={{ marginRight: "0.4em" }}>
          <img
            src={CustomerServiceIcon}
            alt="Ticket Edit Icon"
            style={{ width: "2em" }}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            style={{ fontSize: "1em", fontWeight: "bolder" }}
          >
            {props.action == "add" ? "Add New Address" : "Edit Address"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item container xs={12} sm={12}>
          <Grid item xs={12} sm={9}>
            <InputField
              variant="outlined"
              name={street_address.name}
              label={street_address.label}
              fullWidth
              multiline
              rows={3}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            variant="outlined"
            name={postal_code.name}
            label={postal_code.label}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            variant="outlined"
            name={suburb_name.name}
            label={suburb_name.label}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            variant="outlined"
            name={city.name}
            label={city.label}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            variant="outlined"
            name={state.name}
            label={state.label}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            variant="outlined"
            name={country.name}
            label={country.label}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputField
            variant="outlined"
            name={longitude.name}
            label={longitude.label}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            variant="outlined"
            name={latitude.name}
            label={latitude.label}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={billing_status.name}
            label={billing_status.label}
            data={billing_options}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name={address_type.name}
            label={address_type.label}
            data={address_type_options}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
