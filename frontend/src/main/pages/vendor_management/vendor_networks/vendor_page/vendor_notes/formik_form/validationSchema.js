import * as Yup from "yup";
import moment from "moment";
import FormModel from "./FormModel";
const {
  formField: { category, description, notes_file, priority, subject },
} = FormModel;

export default [
  Yup.object().shape({
    [category.name]: Yup.string().required(`${category.requiredErrorMsg}`),
    [description.name]: Yup.string().required(
      `${description.requiredErrorMsg}`
    ),
    [priority.name]: Yup.string().required(`${priority.requiredErrorMsg}`),
    [subject.name]: Yup.string().required(`${subject.requiredErrorMsg}`),
  }),
];
