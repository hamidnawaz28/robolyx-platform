import * as Yup from "yup";
import { stringRequired } from "./YupValidations";
export const supplierRequestSchema = Yup.object().shape({
  company_name: stringRequired,
  first_name: stringRequired,
  last_name: stringRequired,
  email: stringRequired,
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
  vendor_name: stringRequired,
  contact_name: stringRequired,
  contact_email: stringRequired,
  contact_phone: stringRequired,
  designation: stringRequired,
  department: stringRequired,
  created_by: stringRequired,
});
export const vendorAddressSchema = Yup.object().shape({
  vendor_id: stringRequired,
  address_type: stringRequired,
  street_address: stringRequired,
  postal_code: stringRequired,
  suburb_name: stringRequired,
  city: stringRequired,
  state: stringRequired,
  country: stringRequired,
  billing_status: stringRequired,
  longitude: stringRequired,
  latitude: stringRequired,
  created_by: stringRequired,
  created_at: stringRequired,
});
