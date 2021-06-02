import * as Yup from "yup";
import moment from "moment";
import FormModel from "./FormModel";
const {
  formField: { review_name, review_template_id },
} = FormModel;

export default [
  Yup.object().shape({
    [review_name.name]: Yup.string().required(
      `${review_name.requiredErrorMsg}`
    ),
    [review_template_id.name]: Yup.string().required(
      `${review_template_id.requiredErrorMsg}`
    ),
  }),
];
