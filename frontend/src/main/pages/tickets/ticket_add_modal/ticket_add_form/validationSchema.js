import * as Yup from 'yup';
import moment from 'moment';
import checkoutFormModel from './checkoutFormModel';
const {
    formField: {
        ticket_title,
        ticket_content,
        ticket_color,
        priority,

        ticket_types,
        due_date,
        status,
    },
} = checkoutFormModel;

export default [
    Yup.object().shape({
        [ticket_title.name]: Yup.string().required(
            `${ticket_title.requiredErrorMsg}`
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
    }),
];