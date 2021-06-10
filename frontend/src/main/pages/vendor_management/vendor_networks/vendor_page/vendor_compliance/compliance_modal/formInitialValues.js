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

const formInitialValues = {
  [compliance_template.name]: "",
  [compliance_form_name.name]: "",
  [priority.name]: "",
  [req_status.name]: "",
  [deadline.name]: "",
  [form_type.name]: "",
};

export default formInitialValues;
