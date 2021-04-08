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

export default {
	[ticket_title.name]: '',
	[ticket_content.name]: '',
	[ticket_number.name]: '',
	[lst_id.name]: '',
	[ticket_color.name]: '',
	[created_by.name]: '',
	[creation_date.name]: '',
	[last_updated.name]: '',
	[priority.name]: '',
	[archive.name]: '',
	[responsible_person.name]: '',
	[ticket_types.name]: '',
	[due_date.name]: '',
	[status.name]: '',
};
