import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Box, TextField, Typography } from '@material-ui/core';
import { Search, RotateLeft } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
	updateComplianceQuery,
	fetchComplianceTaskStart,
} from '../redux/complianceTaskActions';
import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const BorderWrapper = styled(Box)`
	background: white;
`;

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: '1em',
		[theme.breakpoints.down('sm')]: {
			paddingTop: '0.8em',
		},
	},
}));

function ReviewTemplateQueryForm(props) {
	const dispatch = useDispatch();
	const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	const complianceTask = useSelector((state) => state.complianceTask);
	const { perPage, currentPage, query_compliance } = complianceTask;
	const classes = useStyles();

	const initialState = {
		form_name__icontains: '',
	};

	const [formData, setFormData] = useState(initialState);

	let fetchApiData = {
		currentPage: currentPage,
		perPage: perPage,
	};

	const searchQueryHandle = () => {
		fetchApiData['query_compliance'] = formData;
		fetchApiData['currentPage'] = 1;
		dispatch(updateComplianceQuery(formData));
		dispatch(fetchComplianceTaskStart({ fetchApiData }));
	};

	const resetQueryHandle = () => {
		fetchApiData['query_compliance'] = JSON.stringify(initialState);
		setFormData(initialState);
		dispatch(updateComplianceQuery(initialState));
		dispatch(fetchComplianceTaskStart({ fetchApiData }));
	};

	return (
		<BorderWrapper
			p={matches ? 1 : 3}
			mb={matches ? 0 : 3}
			style={{ marginBottom: matches ? '1em' : '0.5em' }}
		>
			<Grid
				container
				spacing={0}
				style={{ marginTop: matches ? '0em' : '0.5em' }}
				direction='row'
			>
				<Grid item sm={3}>
					<TextField
						id='outlined-basic'
						variant='outlined'
						label={
							matches ? 'Compliance Task' : 'Search by Compliance Task Name'
						}
						style={{ width: matches ? '90%' : '100%' }}
						value={formData.form_name__icontains}
						fullWidth={true}
						size='small'
						onChange={(e) =>
							setFormData({
								...formData,
								form_name__icontains: e.target.value,
							})
						}
					/>
				</Grid>
				{matches ? (
					<Grid item>
						<Search
							onClick={() => searchQueryHandle()}
							style={{
								marginTop: '0.3em',
							}}
						/>
						<RotateLeft
							onClick={() => resetQueryHandle()}
							style={{
								marginLeft: '0.1em',
								marginTop: '0.3em',
							}}
						/>
					</Grid>
				) : (
					<Grid item>
						<Grid container spacing={2} className={classes.root}>
							<Grid item>
								<Button
									style={{
										backgroundColor: '#232f3e',
										color: '#fff',
										width: '10em',
									}}
									variant='contained'
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
										width: '10em',
									}}
									variant='contained'
									startIcon={<RotateLeft />}
									onClick={() => resetQueryHandle()}
								>
									Reset
								</Button>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</BorderWrapper>
	);
}
export default ReviewTemplateQueryForm;
