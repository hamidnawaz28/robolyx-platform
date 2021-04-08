import React, { useState, useEffect } from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import localStorage from '../../../../../common/storage/localStorage';

import { UpdateTicket } from '../../redux/ticketActions';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import { spacing, typography } from '@material-ui/system';

import TicketAdd from './TicketAdd';

import validationSchema from './validationSchema';
import checkoutFormModel from './checkoutFormModel';
import formInitialValues from './formInitialValues';
import CardTravelIcon from '@material-ui/icons/CardTravel';

import useStyles from './styles';
import { Grid } from '@material-ui/core';

const Alert = styled(MuiAlert)(spacing);
const { formId, formField } = checkoutFormModel;

export default function Addtickets({ setOpen, ticket }) {
	const classes = useStyles();
	const [submitError, setSubmitError] = useState('');
	const [errorCheck, setErrorCheck] = useState();

	const dispatch = useDispatch();

	const history = useHistory();

	async function _submitForm(values, actions) {
		console.log(values);

		let post_data = values;

		//let tic_num = 'TIK' + Math.floor(1000 + Math.random() * 90000000);

		post_data.due_date = post_data.due_date.split('T')[0];

		//post_data = JSON.stringify(post_data);

		dispatch(UpdateTicket(post_data));
		setSubmitError('');

		actions.setSubmitting(false);
		// history.push('/admin/sites/');
		setOpen(false);
	}

	function _handleReset() {
		console.log('Fired Reset');
		console.log(formInitialValues);
	}
	console.log(ticket);

	const ticket1 = { ...ticket };
	ticket1['responsible_person'] = ticket.responsible_person.id;
	ticket1['lst_id'] = ticket.lst_id.id;

	return (
		<div style={{ padding: '2em' }}>
			<Grid container direction='column'>
				<Grid item>
					<Grid container justify='space-between'>
						<Grid item>
							<Grid
								container
								alignItems='center'
								spacing={2}
								style={{ marginBottom: '2em' }}
							>
								<Grid item>
									<CardTravelIcon />
								</Grid>
								<Grid item>
									<Typography variant='h4'>
										Ticket No : {ticket.ticket_number}{' '}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Typography variant='body2'>
								Created by : {ticket.created_by.username}{' '}
							</Typography>
							<Typography variant='body1'>
								Creation date : {ticket.creation_date}{' '}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Formik
						initialValues={ticket1 || formInitialValues}
						validationSchema={validationSchema[0]}
						onSubmit={_submitForm}
						enableReinitialize
					>
						{({ isSubmitting }) => (
							<Form id={formId}>
								<TicketAdd formField={formField} />

								<div className={classes.buttons}>
									<Button
										type='reset'
										onClick={_handleReset}
										className={classes.button}
									>
										Reset
									</Button>
									<div className={classes.wrapper}>
										<Button
											disabled={isSubmitting}
											type='submit'
											variant='contained'
											color='primary'
											className={classes.button}
										>
											Save
										</Button>

										{isSubmitting && (
											<CircularProgress
												size={24}
												className={classes.buttonProgress}
											/>
										)}
									</div>
								</div>
								{submitError ? (
									<div>
										<Alert mb={4} severity='error'>
											{submitError}
										</Alert>
									</div>
								) : (
									''
								)}
							</Form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</div>
	);
}
