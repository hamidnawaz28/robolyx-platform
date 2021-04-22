import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import {
	InputField,
	SelectField,
	DatePickerField,
} from '../../../../../global/FormFields';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const ticket_color_options = [
	{
		value: undefined,
		label: 'None',
	},
	{
		value: 'Red',
		label: 'Red',
	},
	{
		value: 'Blue',
		label: 'Blue',
	},
	{
		value: 'Green',
		label: 'Green',
	},
];

const ticket_priority_options = [
	{
		value: 'low',
		label: 'Low',
	},
	{
		value: 'medium',
		label: 'Medium',
	},
	{
		value: 'high',
		label: 'High',
	},
];

const ticket_type_options = [
	{
		value: 'New_feature',
		label: 'New Feature',
	},
	{
		value: 'Data_Discrepancy',
		label: 'Data Discrepancy',
	},
	{
		value: 'Software_bug',
		label: 'Software Bug',
	},
	{
		value: 'Custom_Analytics_request',
		label: 'Custom Analytics Request',
	},
	{
		value: 'Data_import_export_issue',
		label: 'Data Import Export Issue',
	},
	{
		value: 'other',
		label: 'Other',
	},
];

const ticket_status_options = [
	{
		value: 'resolved',
		label: 'Resolved',
	},
	{
		value: 'pending',
		label: 'Pending',
	},
	{
		value: 'in_progress',
		label: 'In Progress',
	},
];

const ticket_lst_id_options = [
	{
		value: '1',
		label: 'Resolved',
	},
	{
		value: '2',
		label: 'Pending',
	},
	{
		value: '3',
		label: 'In Progress',
	},
];

const ticket_archive_options = [
	{
		value: 'Archive',
		label: 'Archive',
	},
	{
		value: 'Active',
		label: 'Active',
	},
];

const ticket_resp_options = [
	{
		value: 'Archive',
		label: 'Archive',
	},
	{
		value: 'Active',
		label: 'Active',
	},
];

export default function TicketEdit(props) {
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
	} = props;
	return (
		<React.Fragment>
			<Grid container alignItems='center' style={{ marginBottom: '0.7em' }}>
				<Grid item style={{ marginRight: '0.5em' }}>
					<AccountCircleRoundedIcon fontSize='large' />
				</Grid>
				<Grid item>
					<Typography
						variant='h6'
						style={{ fontSize: '1.5em', fontWeight: 'bolder' }}
					>
						Add New Ticket
					</Typography>
				</Grid>
			</Grid>
			<br />

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<InputField
						variant='outlined'
						name={ticket_title.name}
						label={ticket_title.label}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<InputField
						variant='outlined'
						name={ticket_content.name}
						label={ticket_content.label}
						fullWidth
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectField
						name={lst_id.name}
						label={lst_id.label}
						data={ticket_lst_id_options}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectField
						name={ticket_color.name}
						label={ticket_color.label}
						data={ticket_color_options}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<DatePickerField
						variant='outlined'
						name={due_date.name}
						label={due_date.label}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectField
						name={priority.name}
						label={priority.label}
						data={ticket_priority_options}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectField
						name={archive.name}
						label={archive.label}
						data={ticket_archive_options}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectField
						name={responsible_person.name}
						label={responsible_person.label}
						data={ticket_resp_options}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<SelectField
						name={ticket_types.name}
						label={ticket_types.label}
						data={ticket_type_options}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<SelectField
						name={status.name}
						label={status.label}
						data={ticket_status_options}
						fullWidth
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
