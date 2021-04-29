import * as Yup from "yup";
export const stringRequired = Yup.string().required("Required");
export const emailSchema = Yup
.string("Must be a string")
.email("Email Required")
.required("Required");
export const passwordSchema = Yup
.string("Must be a string")
.required('No password provided.') 
.min(8, 'Password is too short - should be 8 chars minimum.')
.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')