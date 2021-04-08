import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
	InputField,
	SelectField,
	DatePickerField,
} from '../../../../../global/FormFields';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const ticket_color_options = [
	{
		value: undefined,
		label: 'None',
	},
	{
		value: 'red',
		label: 'Red',
	},
	{
		value: 'blue',
		label: 'Blue',
	},
	{
		value: 'green',
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

const ticket_archive_options = [
	{
		value: 'Active',
		label: 'Active',
	},
	{
		value: 'Archive',
		label: 'Archive',
	},
];

export default function TicketAdd(props) {
	const alluser = useSelector((state) => state.tickets.listUser);
	const allList = useSelector((state) => state.tickets.listData.data);

	const users_option_data = alluser.map((user) => ({
		value: user.id,
		label: user.username,
	}));

	const list_option_data = allList.map((list) => ({
		value: list.id,
		label: list.list_title,
	}));

	const {
		formField: {
			ticket_title,
			ticket_content,
			ticket_color,
			priority,

			ticket_types,
			due_date,
			status,
			responsible_person,
			lst_id,
			archive,
		},
	} = props;
	return (
		<React.Fragment>
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
						name={ticket_types.name}
						label={ticket_types.label}
						data={ticket_type_options}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectField
						name={responsible_person.name}
						label={responsible_person.label}
						data={users_option_data}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<SelectField
						name={lst_id.name}
						label={lst_id.label}
						data={list_option_data}
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
			</Grid>
		</React.Fragment>
	);
}
