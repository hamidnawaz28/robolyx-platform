import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Box, TextField, Typography } from '@material-ui/core';
import { Search, RotateLeft } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import { fetchUserStart } from '../redux/ticketActions';

import {
	updateArchiveTicketFormQuery,
	fetchArhiveTicketsTableData,
} from '../redux/ticketActions';
import styled from 'styled-components';
const BorderWrapper = styled(Box)`
	background: white;
`;

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: '1em',
		paddingTop: '1.2em',
		[theme.breakpoints.down('sm')]: {
			paddingTop: '0.5em',
			paddingBottom: '0.5em',
			paddingLeft: '4em',
		},
	},
	formControl: {
		margin: theme.spacing(1),
		width: '100%',
	},
	mainContainer: {
		[theme.breakpoints.down('md')]: {
			paddingRight: '1em',
		},
	},
}));

function ArchiveTicketsSearchQuery(props) {
	const dispatch = useDispatch();
	const tableStates = useSelector((state) => state.tickets);
	const { perPage, currentPage, archiveQuery } = tableStates;
	const { apiLink } = props;
	const classes = useStyles();

	useEffect(() => {
		dispatch(fetchUserStart());
	}, []);

	const alluser = useSelector((state) => state.tickets.listUser);

	const users_option_data = alluser.map((user) => ({
		id: user.id,
		username: user.username,
	}));

	const initialState = {
		ticket_title__icontains: '',
		ticket_number__icontains: '',
		ticket_content__icontains: '',
		priority__in: [],
		ticket_types__in: [],
		responsible_person__id__in: [],
		created_by__id__in: [],
	};

	const [formData, setFormData] = useState(initialState);
	const credentials = apiLink;
	let fetchApiData = {
		currentPage: currentPage,
		perPage: perPage,
		project: '1',
	};

	const searchQueryHandle = () => {
		console.log(formData);
		let formData1 = {};
		for (const [key, value] of Object.entries(formData)) {
			console.log(key, value);
			console.log(formData[key]);
			if (formData[key] && formData[key].length == 0) {
				console.log('length zero');
			} else {
				console.log('condition not true');
				formData1[key] = value;
			}
		}

		console.log('Form data 1', formData1);

		fetchApiData['archiveQuery'] = JSON.stringify(formData1);
		dispatch(updateArchiveTicketFormQuery(formData));
		dispatch(
			fetchArhiveTicketsTableData({ apiLink: credentials, fetchApiData })
		);
	};

	let resetInitial = {
		ticket_title__icontains: '',
		ticket_number__icontains: '',
		ticket_content__icontains: '',
	};
	const resetQueryHandle = () => {
		fetchApiData['archiveQuery'] = JSON.stringify(resetInitial);
		setFormData(initialState);
		setResponsiblePerson([]);
		setPriority([]);
		setTicketTypes([]);
		setCreatedBy([]);
		dispatch(updateArchiveTicketFormQuery(initialState));
		dispatch(
			fetchArhiveTicketsTableData({ apiLink: credentials, fetchApiData })
		);
	};
	// useEffect(()=>{

	// },[])

	const [priority, setPriority] = React.useState([]);
	const [ticketTypes, setTicketTypes] = React.useState([]);
	const [responsiblePerson, setResponsiblePerson] = React.useState([]);
	const [createdBy, setCreatedBy] = React.useState([]);

	const handlePriorityChange = (event) => {
		console.log('priority val', event.target.value);
		setPriority(event.target.value);
		formData.priority__in = event.target.value;
	};

	const handleTicketTypesChange = (event) => {
		setTicketTypes(event.target.value);
		formData.ticket_types__in = event.target.value;
	};

	const handleResponsiblePersonChange = (event) => {
		setResponsiblePerson(event.target.value);
		formData.responsible_person__id__in = event.target.value;
	};

	const handleCreatedByChange = (event) => {
		setCreatedBy(event.target.value);
		console.log(createdBy);
		formData.created_by__id__in = event.target.value;
	};

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const priorityList = ['low', 'medium', 'high'];

	const ticketTypesList = [
		'New_feature',
		'Data_Discrepancy',
		'Software_bug',
		'Custom_Analytics_request',
		'Data_import_export_issue',
		'other',
	];

	return (
		<BorderWrapper p={1} pb={2} mb={5} style={{ border: '3px solid #eee' }}>
			<Grid
				container
				spacing={4}
				style={{ marginTop: '0em' }}
				className={classes.mainContainer}
			>
				<Grid item sm={12} md={10} style={{ paddingLeft: '1em' }}>
					<Grid container spacing={4}>
						<Grid item lg={3} md={6} sm={6} xs={12}>
							<FormControl className={classes.formControl} variant='outlined'>
								<InputLabel id='priority'>Priority</InputLabel>
								<Select
									labelId='priority-checkbox-label'
									id='priority-checkbox'
									style={{ width: '100%' }}
									multiple
									value={priority}
									onChange={handlePriorityChange}
									input={<Input />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{priorityList.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={priority.indexOf(name) > -1} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item lg={3} md={6} sm={6} xs={12}>
							<FormControl className={classes.formControl}>
								<InputLabel id='ticket-types-checkbox-label'>
									Ticket Types
								</InputLabel>
								<Select
									labelId='ticket-types-checkbox-label'
									id='ticket-types-checkbox'
									multiple
									value={ticketTypes}
									onChange={handleTicketTypesChange}
									input={<Input />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{ticketTypesList.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={ticketTypes.indexOf(name) > -1} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item lg={3} md={6} sm={6} xs={12}>
							<FormControl className={classes.formControl}>
								<InputLabel id='responsible-person-checkbox-label'>
									Responsible Person
								</InputLabel>
								<Select
									labelId='responsible-person-checkbox-label'
									id='responsible-person-checkbox'
									multiple
									value={responsiblePerson}
									onChange={handleResponsiblePersonChange}
									input={<Input />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{users_option_data.map((user) => (
										<MenuItem key={user.id} value={user.id}>
											<Checkbox
												checked={responsiblePerson.indexOf(user.id) > -1}
											/>
											<ListItemText primary={user.username} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item lg={3} md={6} sm={6} xs={12}>
							<FormControl className={classes.formControl}>
								<InputLabel id='created-by-checkbox-label'>
									Created by
								</InputLabel>
								<Select
									labelId='created-by-checkbox-label'
									id='created-by-checkbox'
									multiple
									value={createdBy}
									onChange={handleCreatedByChange}
									input={<Input />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{users_option_data.map((user) => (
										<MenuItem key={user.id} value={user.id}>
											<Checkbox checked={createdBy.indexOf(user.id) > -1} />
											<ListItemText primary={user.username} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item lg={3} md={6} sm={6} xs={6}>
							<TextField
								id='ticket-title'
								variant='outlined'
								style={{ width: '100%' }}
								label='Ticket Title'
								value={formData.ticket_title__icontains || ''}
								size='small'
								onChange={(e) =>
									setFormData({
										...formData,
										ticket_title__icontains: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item lg={3} md={6} sm={6} xs={6}>
							<TextField
								id='ticket-number'
								variant='outlined'
								style={{ width: '100%' }}
								label='Ticket Number'
								value={formData.ticket_number__icontains || ''}
								size='small'
								onChange={(e) =>
									setFormData({
										...Number,
										ticket_number__icontains: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item lg={3} md={6} sm={6} xs={12}>
							<TextField
								id='ticket-content'
								variant='outlined'
								style={{ width: '100%', height: '10%' }}
								label='Search Ticket Content'
								value={formData.ticket_content__icontains || ''}
								size='small'
								onChange={(e) =>
									setFormData({
										...formData,
										ticket_content__icontains: e.target.value,
									})
								}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item sm={2}>
					<Grid
						container
						spacing={2}
						justify='center'
						alignItems='center'
						className={classes.root}
					>
						<Grid item>
							<Button
								style={{
									backgroundColor: '#232f3e',
									color: '#fff',
									width: '7em',
								}}
								variant='contained'
								size='small'
								startIcon={<Search />}
								onClick={() => searchQueryHandle()}
							>
								Search
							</Button>
						</Grid>
						<Grid item>
							<Button
								style={{
									backgroundColor: '#232f3e',
									color: '#fff',
									width: '7em',
								}}
								variant='contained'
								size='small'
								startIcon={<RotateLeft />}
								onClick={() => resetQueryHandle()}
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</BorderWrapper>
	);
}
export default ArchiveTicketsSearchQuery;
