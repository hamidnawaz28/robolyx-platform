import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ComplianceTaskCard from './ComplianceTaskCard';

import {
	fetchComplianceTaskStart,
	updateCurrentPage,
} from '../../vendor_configurations/redux/complianceTaskActions';
import ReviewTemplateQueryForm from './ComplianceTaskQueryForm';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	tagIcon: {
		width: '2.5em',
		[theme.breakpoints.down('sm')]: {
			width: '2em',
		},
	},
}));

function ComplianceTaskList(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

	const { query_compliance, currentPage, perPage, complianceTasks, totalRows } =
		useSelector((state) => state.complianceTask);

	let fetchApiData = {
		query_compliance: query_compliance,
		currentPage: currentPage,
		perPage: perPage,
	};
	console.log('vendors.count', complianceTasks);

	useEffect(() => {
		dispatch(fetchComplianceTaskStart({ fetchApiData }));
	}, []);

	const handleChange = (event, value) => {
		let currPage = value;
		dispatch(updateCurrentPage(currPage));
		fetchApiData['currentPage'] = currPage;
		dispatch(fetchComplianceTaskStart({ fetchApiData }));
	};

	return (
		<>
			<Typography
				variant={matches ? 'h3' : 'h2'}
				style={{ marginBottom: '0.5em' }}
			>
				Compliance Tasks
			</Typography>
			<ReviewTemplateQueryForm />

			<Grid container spacing={2}>
				{complianceTasks.data &&
					complianceTasks.data.map((comp_task) => (
						<ComplianceTaskCard
							comp_task={comp_task}
							setValue={props.setValue}
						/>
					))}
			</Grid>
			<Grid container justify='center'>
				<Grid item>
					<Pagination
						count={Math.ceil(complianceTasks.count / perPage)}
						page={currentPage}
						onChange={handleChange}
						defaultPage={1}
						color='primary'
						size='small'
						color='secondary'
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default ComplianceTaskList;
