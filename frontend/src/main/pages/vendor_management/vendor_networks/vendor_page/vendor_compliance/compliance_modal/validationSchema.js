import * as Yup from "yup";
import moment from "moment";
import FormModel from "./FormModel";
const {
  formField: {
    compliance_template,
    compliance_form_name,
    priority,
    req_status,
    deadline,
    form_type,
  },
} = FormModel;

export default [
  Yup.object().shape({
    [compliance_template.name]: Yup.object().required(
      `${compliance_template.requiredErrorMsg}`
    ),
    [compliance_form_name.name]: Yup.string().required(
      `${compliance_form_name.requiredErrorMsg}`
    ),
    [priority.name]: Yup.string().required(`${priority.requiredErrorMsg}`),
    [req_status.name]: Yup.string().required(`${req_status.requiredErrorMsg}`),
    [deadline.name]: Yup.string().required(`${deadline.requiredErrorMsg}`),
    [form_type.name]: Yup.string().required(`${form_type.requiredErrorMsg}`),
  }),
];
