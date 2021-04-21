import * as Yup from "yup";
import { stringRequired } from "./YupValidations";
export const supplierRequestSchema = Yup.object().shape({
  companyName: stringRequired,
  firstName: stringRequired,
  lastName: stringRequired,
  email: stringRequired,
  phoneNumber: stringRequired,
  languages: stringRequired,
  country: stringRequired,
  comment: stringRequired,
  requestingSites: stringRequired,
  deadline: stringRequired,
  requestingContacts: stringRequired,
});
export const createVendorSchema = Yup.object().shape({});
export const crea = Yup.object().shape({});
