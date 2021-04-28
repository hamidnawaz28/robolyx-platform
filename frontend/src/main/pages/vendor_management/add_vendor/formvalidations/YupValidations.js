import * as Yup from "yup";
export const stringRequired = Yup.string().required("Required");
export const emailSchema = Yup
.string("Must be a string")
.email("Email Required")
.required("Required");
