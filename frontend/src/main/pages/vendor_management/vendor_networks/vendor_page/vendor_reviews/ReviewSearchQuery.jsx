import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Box, TextField, Typography } from '@material-ui/core';
import { Search, RotateLeft } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DropDownSelect from '../../../../../../global/dropDownSelect';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
	updateVenReviewQuery,
	fetchVenReviewlistStart,
} from '../../redux/vendorNetworksActions';
import styled from 'styled-components';
const BorderWrapper = styled(Box)`
	background: white;
`;

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: '1em',
		[theme.breakpoints.down('sm')]: {
			paddingTop: '0.2em',
		},
	},
	formControl: {
		width: '100%',
	},
}));

function VendorReviewSearch(props) {
	const dispatch = useDispatch();
	let { id } = useParams();
	const vendorNetworks = useSelector((state) => state.vendorNetworks);
	const { perPage, currentPage, searchVenReview } = vendorNetworks;
	const { apiLink } = props;
	const classes = useStyles();
	const [priority, setPriority] = React.useState('');

	const handleStatusChange = (event) => {
		setPriority(event.target.value);
		setFormData({
			...formData,
			overall_status__icontains: event.target.value,
		});
	};

	const initialState = {
		review_name__icontains: '',
		overall_status__icontains: '',
	};
	const [formData, setFormData] = useState(initialState);
	const credentials = apiLink;
	let fetchApiData = {
		vendorId: id,
		currentPage: currentPage,
		perPage: perPage,
		project: '1',
	};
	const searchQueryHandle = () => {
		fetchApiData['searchVenReview'] = formData;
		dispatch(updateVenReviewQuery(formData));
		dispatch(fetchVenReviewlistStart({ apiLink: credentials, fetchApiData }));
	};
	const resetQueryHandle = () => {
		fetchApiData['searchVenReview'] = initialState;
		setFormData(initialState);
		dispatch(updateVenReviewQuery(initialState));
		dispatch(fetchVenReviewlistStart({ apiLink: credentials, fetchApiData }));
	};
	// useEffect(()=>{

	// },[])
	return (
		<Grid container spacing={2}>
			<Grid item sm={3}>
				<TextField
					id='outlined-basic'
					variant='outlined'
					style={{ width: '100%' }}
					label='Subject'
					value={formData.review_name__icontains}
					size='small'
					onChange={(e) =>
						setFormData({
							...formData,
							review_name__icontains: e.target.value,
						})
					}
				/>
			</Grid>
			<Grid item sm={3}>
				<FormControl
					variant='outlined'
					size='small'
					className={classes.formControl}
				>
					<InputLabel id='approval-status-label'>Priority</InputLabel>
					<Select
						labelId='approval-status-label'
						id='approval-status'
						value={priority}
						onChange={handleStatusChange}
						label='Priority'
						fullWidth
					>
						<MenuItem value='pending'>Pending</MenuItem>
						<MenuItem value='submitted'>Submitted</MenuItem>
						<MenuItem value='completed'>Completed</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item sm={6}>
				<Grid container spacing={3}>
					<Grid item>
						<Button
							style={{
								backgroundColor: '#232f3e',
								color: '#fff',
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
		</Grid>
	);
}
export default VendorReviewSearch;
