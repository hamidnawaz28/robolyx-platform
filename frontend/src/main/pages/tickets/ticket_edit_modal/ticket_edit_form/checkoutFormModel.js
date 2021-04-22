export default {
  formId: "ticketAddForm",
  formField: {
    ticket_title: {
      name: "ticket_title",
      label: "Ticket Title*",
      requiredErrorMsg: "Ticket Title is required",
    },
    ticket_content: {
      name: "ticket_content",
      label: "Ticket Content*",
      requiredErrorMsg: "Ticket Content is required",
    },
    ticket_color: {
      name: "ticket_color",
      label: "Ticket Color*",
      requiredErrorMsg: "Ticket Color is required",
    },
    priority: {
      name: "priority",
      label: "Priority*",
      requiredErrorMsg: "Priority is required",
    },

    ticket_types: {
      name: "ticket_types",
      label: "Ticket Types*",
      requiredErrorMsg: "Ticket Types is required",
    },
    due_date: {
      name: "due_date",
      label: "Due Date",
      requiredErrorMsg: "Due Date is required",
    },
    responsible_person: {
      name: "responsible_person",
      label: "Responsible Person*",
      requiredErrorMsg: "Responsible Person is required",
    },
    list_tickets: {
      name: "list_tickets",
      label: "Current Status*",
      requiredErrorMsg: "Current Status is required",
    },
    archive: {
      name: "archive",
      label: "Archive Info*",
      requiredErrorMsg: "Archive is required",
    },
  },
};
