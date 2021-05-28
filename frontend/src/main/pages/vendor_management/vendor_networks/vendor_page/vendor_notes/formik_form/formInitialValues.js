import FormModel from "./FormModel";
const {
  formField: { category, description, notes_file, priority, subject },
} = FormModel;

export default {
  [subject.name]: "",
  [description.name]: "",
  [category.name]: "General",
  [priority.name]: "",
  [notes_file.name]: "",
};
