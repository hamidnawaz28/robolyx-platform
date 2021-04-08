import checkoutFormModel from './checkoutFormModel';
const {
    formField: {
        ticket_title,
        ticket_content,
        ticket_color,
        priority,

        ticket_types,
        due_date,
    },
} = checkoutFormModel;

export default {
    [ticket_title.name]: '',
    [ticket_content.name]: '',
    [ticket_color.name]: '',
    [priority.name]: '',

    [ticket_types.name]: '',
    [due_date.name]: '',
};