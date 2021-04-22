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
export const crea = Yup.object().shape({});
