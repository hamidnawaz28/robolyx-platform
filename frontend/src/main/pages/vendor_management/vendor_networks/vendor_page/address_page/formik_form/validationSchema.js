import * as Yup from "yup";
import moment from "moment";
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

export default [
  Yup.object().shape({
    [address_type.name]: Yup.string().required(
      `${address_type.requiredErrorMsg}`
    ),
    [street_address.name]: Yup.string().required(
      `${street_address.requiredErrorMsg}`
    ),
    [postal_code.name]: Yup.string().required(
      `${postal_code.requiredErrorMsg}`
    ),
    [suburb_name.name]: Yup.string().required(
      `${suburb_name.requiredErrorMsg}`
    ),

    [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
    [state.name]: Yup.string().required(`${state.requiredErrorMsg}`),
    [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
    [billing_status.name]: Yup.string().required(
      `${billing_status.requiredErrorMsg}`
    ),
    [longitude.name]: Yup.string().required(`${longitude.requiredErrorMsg}`),
    [latitude.name]: Yup.string().required(`${latitude.requiredErrorMsg}`),
  }),
];
