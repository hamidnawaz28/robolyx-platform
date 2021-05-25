import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';
import { SelectMultiField } from '../../../../../../../global/FormFields';
import {
	fetchCategoryStart,
	fetchTagsStart,
	fetchTradesStart,
	fetchDiversityStart,
	fetchPaymentTermStart,
} from '../../../../vendor_admin/redux/approvalActions';

export default function Form({ icon, title, buttonTitle, VendorDetail, id }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoryStart());
		dispatch(fetchTagsStart());
		dispatch(fetchTradesStart());
		dispatch(fetchDiversityStart());
		dispatch(fetchPaymentTermStart());
	}, []);

	const categoryList = useSelector((state) => state.vendorApproval.categories);
	const tagsList = useSelector((state) => state.vendorApproval.tags);
	const tradesList = useSelector((state) => state.vendorApproval.trades);
	const diversityList = useSelector((state) => state.vendorApproval.diversity);
	const paymenttermList = useSelector(
		(state) => state.vendorApproval.paymentterm
	);

	let formArray = {};
	let dataList = [];

	if (icon === 'tags') {
		formArray = {
			name: 'tags',
			label: 'Tags',
		};
	} else if (icon === 'category') {
		formArray = {
			name: 'category',
			label: 'Category',
		};
	} else if (icon === 'payment') {
		formArray = {
			name: 'payment_term',
			label: 'Payment Term',
		};
	} else if (icon === 'trade') {
		formArray = {
			name: 'trades',
			label: 'Trades',
		};
	} else if (icon === 'diversity') {
		formArray = {
			name: 'diversity',
			label: 'Diversity',
		};
	} else {
		formArray = {
			name: 'trades',
			label: 'Trades',
		};
	}

	if (icon === 'tags') {
		dataList = tagsList;
	} else if (icon === 'payment') {
		dataList = paymenttermList;
	} else if (icon === 'trade') {
		dataList = tradesList;
	} else if (icon === 'diversity') {
		dataList = diversityList;
	} else if (icon === 'category') {
		dataList = categoryList;
	} else {
		dataList = tagsList;
	}

	return (
		// SelectMultiField
		<React.Fragment>
			<Grid container justify='space-around'>
				<Grid item sm={12}>
					<SelectMultiField
						name={formArray.name}
						label={formArray.label}
						data={dataList && dataList}
						style={{ width: '80%' }}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
