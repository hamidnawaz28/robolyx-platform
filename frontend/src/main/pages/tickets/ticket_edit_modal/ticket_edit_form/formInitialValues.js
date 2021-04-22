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
    list_tickets,
    archive,
  },
} = checkoutFormModel;

export default {
  [ticket_title.name]: "",
  [ticket_content.name]: "",
  [ticket_color.name]: "",
  [priority.name]: "",
  [responsible_person.name]: "",
  [ticket_types.name]: "",
  [due_date.name]: "",
  [list_tickets.name]: "",
  [archive.name]: "",
};
