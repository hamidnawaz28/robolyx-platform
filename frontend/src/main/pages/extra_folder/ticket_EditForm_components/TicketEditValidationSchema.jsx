import * as Yup from 'yup';
import moment from 'moment';
import ticketEditFormModel from './TicketEditFormModel';
const {
	formField: {
		ticket_title,
		ticket_content,
		ticket_number,
		lst_id,
		ticket_color,
		created_by,
		creation_date,
		last_updated,
		priority,
		archive,
		ticket_types,
		responsible_person,
		due_date,
		status,
	},
} = ticketEditFormModel;

console.log(responsible_person.name);

export default [
	Yup.object().shape({
		[ticket_title.name]: Yup.string().required(
			`${ticket_title.requiredErrorMsg}`
		),
		[ticket_content.name]: Yup.string().required(
			`${ticket_content.requiredErrorMsg}`
		),
		[ticket_number.name]: Yup.string().required(
			`${ticket_number.requiredErrorMsg}`
		),
		[lst_id.name]: Yup.string().required(`${lst_id.requiredErrorMsg}`),
		[ticket_color.name]: Yup.string().required(
			`${ticket_color.requiredErrorMsg}`
		),
		[created_by.name]: Yup.string().required(`${created_by.requiredErrorMsg}`),
		[creation_date.name]: Yup.date().required(
			`${creation_date.requiredErrorMsg}`
		),
		[last_updated.name]: Yup.date().required(
			`${last_updated.requiredErrorMsg}`
		),
		[priority.name]: Yup.string().required(`${priority.requiredErrorMsg}`),
		[archive.name]: Yup.string().required(`${archive.requiredErrorMsg}`),
		[ticket_types.name]: Yup.string().required(
			`${ticket_types.requiredErrorMsg}`
		),
		[responsible_person.name]: Yup.string().required(
			`${responsible_person.requiredErrorMsg}`
		),
		[due_date.name]: Yup.date().required(`${due_date.requiredErrorMsg}`),
		[status.name]: Yup.string().required(`${status.requiredErrorMsg}`),
	}),
];
