import FormModel from "./FormModel";
const {
  formField: { review_name, review_template },
} = FormModel;

const formInitialValues = {
  [review_name.name]: "",
  [review_template.name]: "",
};

export default formInitialValues;
