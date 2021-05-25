import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Divider } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import OnBoardDetailsUpdateForm from './Form';

import useStyles from './styles';
import { partialUpdateVendor } from '../../../../vendor_admin/redux/approvalActions';

const Alert = styled(MuiAlert)(spacing);

export default function MainFormik({
	icon,
	title,
	buttonTitle,
	VendorDetail,
	id,
	Vendor_full,
	setOpen,
}) {
	const classes = useStyles();
	const [submitError, setSubmitError] = useState('');

	console.log('Vendor is here ', VendorDetail);

	const reduxVals = {
		category: Vendor_full.category
			? Vendor_full.category.map((cat) => cat.name)
			: [],
		diversity: Vendor_full.diversity
			? Vendor_full.diversity.map((cat) => cat.name)
			: [],
		payment_term: Vendor_full.payment_term
			? Vendor_full.payment_term.map((cat) => cat.name)
			: [],
		tags: Vendor_full.tags ? Vendor_full.tags.map((cat) => cat.name) : [],
		trades: Vendor_full.trades ? Vendor_full.trades.map((cat) => cat.name) : [],
	};

	const dispatch = useDispatch();

	const history = useHistory();

	const { query_vendor_onboard, currentPage, perPage } = useSelector(
		(state) => state.vendorApproval
	);

	let fetchApiData = {
		query_vendor_onboard: JSON.stringify(query_vendor_onboard),
		currentPage: currentPage,
		perPage: perPage,
	};

	async function _submitForm(values, actions) {
		console.log(values);

		let { category, tags, trades, diversity, payment_term } = values;

		let post_data = values;

		console.log('Hello', post_data);

		let id = Vendor_full.id;

		let submit_data = { post_data, id, fetchApiData };

		dispatch(partialUpdateVendor(submit_data));
		// setSubmitError("");
		setOpen(false);
		// actions.setSubmitting(false);
		// history.push('/admin/sites/');
	}

	function _handleReset() {
		console.log('Fired Reset');
	}

	return (
		<React.Fragment>
			<Formik
				initialValues={reduxVals}
				onSubmit={_submitForm}
				enableReinitialize
			>
				{({ isSubmitting }) => (
					<Form style={{ padding: '1.5em', width: '100%' }}>
						<OnBoardDetailsUpdateForm
							icon={icon}
							title={title}
							buttonTitle={buttonTitle}
							VendorDetail={VendorDetail}
							id={id}
						/>
						<Divider style={{ marginTop: '1em' }} />

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
		</React.Fragment>
	);
}
