import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    ticket_title,
    ticket_content,
    ticket_color,
    priority,
    list_tickets,
    ticket_types,
    due_date,
  },
} = checkoutFormModel;

export default {
  [ticket_title.name]: "",
  [ticket_content.name]: "",
  [ticket_color.name]: "",
  [priority.name]: "",
  [list_tickets.name]: "Open_Tickets",
  [ticket_types.name]: "",
  [due_date.name]: "",
};
