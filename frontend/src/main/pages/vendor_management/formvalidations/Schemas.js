import * as Yup from "yup";
import { stringRequired,emailSchema ,passwordSchema} from "./YupValidations";

export const supplierRequestSchema = Yup.object().shape({
  company_name: stringRequired,
  first_name: stringRequired,
  last_name: stringRequired,
  email: emailSchema,
  phone_no: stringRequired,
  language: stringRequired,
  country: stringRequired,
  extra_comments: stringRequired,
  requesting_site: stringRequired,
  deadline: stringRequired,
  request_contact: stringRequired,
});
export const createVendorSchema = Yup.object().shape({});
export const vendorBasicSchema = Yup.object().shape({
  vendor_name:stringRequired,
  contact_name:stringRequired,
  contact_email:emailSchema, 
  contact_phone:stringRequired,
  designation:stringRequired,
  department:stringRequired,
});
export const vendorAddressSchema = Yup.object().shape({
  address_type:stringRequired,
  street_address:stringRequired, 
  postal_code:stringRequired,
  subhurb_name:stringRequired,
  city:stringRequired,
  state:stringRequired,
  country:stringRequired,
  billing_status:stringRequired,
  longitude:stringRequired,
  lattitude:stringRequired,
});

export const openVendorSchema = Yup.object().shape({
  vendor_name:stringRequired,
  contact_name:stringRequired,
  contact_email:emailSchema, 
  contact_phone:stringRequired,
  designation:stringRequired,
  department:stringRequired,
  password:passwordSchema,
  confirm_password:passwordSchema,

});
export const openVendorAddressSchema = Yup.object().shape({
  address_type:stringRequired,
  street_address:stringRequired, 
  postal_code:stringRequired,
  subhurb_name:stringRequired,
  city:stringRequired,
  state:stringRequired,
  country:stringRequired,
  billing_status:stringRequired,
  longitude:stringRequired,
  lattitude:stringRequired,
});