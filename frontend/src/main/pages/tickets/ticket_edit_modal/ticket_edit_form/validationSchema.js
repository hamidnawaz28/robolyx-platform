import * as Yup from "yup";
import moment from "moment";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    ticket_title,
    ticket_content,
    ticket_color,
    priority,
    responsible_person,
    ticket_types,
    due_date,
    status,
    list_tickets,
    archive,
  },
} = checkoutFormModel;

export default [
  Yup.object().shape({
    [ticket_title.name]: Yup.string()
      .required(`${ticket_title.requiredErrorMsg}`)
      .test(
        "len",
        "Title must not be greater than 80 characters",
        (val) => val.length <= 80
      ),
    [ticket_content.name]: Yup.string().required(
      `${ticket_content.requiredErrorMsg}`
    ),
    [ticket_color.name]: Yup.string().required(
      `${ticket_color.requiredErrorMsg}`
    ),
    [priority.name]: Yup.string().required(`${priority.requiredErrorMsg}`),

    [ticket_types.name]: Yup.string().required(
      `${ticket_types.requiredErrorMsg}`
    ),
    [due_date.name]: Yup.date().required(`${due_date.requiredErrorMsg}`),
    [responsible_person.name]: Yup.string().required(
      `${responsible_person.requiredErrorMsg}`
    ),
    [list_tickets.name]: Yup.string().required(
      `${list_tickets.requiredErrorMsg}`
    ),
    [archive.name]: Yup.string().required(`${archive.requiredErrorMsg}`),
  }),
];
