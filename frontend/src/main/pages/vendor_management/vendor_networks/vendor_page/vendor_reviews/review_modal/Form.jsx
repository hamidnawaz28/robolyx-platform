import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
	SelectField,
	InputField,
} from '../../../../../../../global/FormFields';
import { fetchReviewlistStart } from '../../../redux/vendorNetworksActions';

export default function Form(props) {
	const {
		formField: { review_name, review_template_id },
	} = props;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchReviewlistStart());
	}, []);

	const reviewTemplates = useSelector(
		(state) => state.vendorNetworks.review_templates
	);

	const reviewTempData = reviewTemplates.map((temp) => ({
		label: temp.name,
		value: temp.id,
	}));
	console.log('Review Template Names', reviewTempData);

	return (
		<React.Fragment>
			<Grid container justify='space-around'>
				<Grid item sm={12}>
					<SelectField
						name={review_template_id.name}
						label={review_template_id.label}
						data={reviewTempData && reviewTempData}
						style={{ width: '80%' }}
					/>
				</Grid>
				<Grid item sm={12}>
					<InputField
						name={review_name.name}
						label={review_name.label}
						style={{ width: '80%' }}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
