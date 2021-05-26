import FormModel from "./FormModel";
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
} = FormModel;

export default {
  [address_type.name]: "",
  [street_address.name]: "",
  [postal_code.name]: "",
  [suburb_name.name]: "",
  [city.name]: "",
  [state.name]: "",
  [country.name]: "",
  [billing_status.name]: "",
  [longitude.name]: "",
  [latitude.name]: "",
};
