import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenReviewlistStart } from '../../redux/vendorNetworksActions';
import { useParams } from 'react-router-dom';
//import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		marginBottom: '1em',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},

	subtitle: {
		fontWeight: '600',
		fontSize: '0.9em',
	},
	subtitle2: {
		fontWeight: '600',
		fontSize: '1em',
	},
	marginBott: {
		marginBottom: '0.3em',
	},
	deletButton: {
		fontSize: '1.75em',
		'&:hover': {
			cursor: 'pointer',
			color: '#e63946',
		},
	},
});

export default function VendorReviewCard({ review_ven }) {
	const classes = useStyles();
	let { id } = useParams();
	const dispatch = useDispatch();
	console.log(review_ven);
	const { searchVenReview, currentPage, perPage, ven_review_templates } =
		useSelector((state) => state.vendorNetworks);

	let fetchApiData = {
		vendorId: id,
		searchVenReview: JSON.stringify(searchVenReview),
		currentPage: currentPage,
		perPage: perPage,
	};

	const handleDelete = (review_id) => {
		console.log(review_id.review_id);
		var config = {
			method: 'delete',
			url: `http://127.0.0.1:8090/api/vendor_management/review-response-status/${review_id.review_id}`,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axios(config)
			.then((res) => {
				const { data } = res;
				const { error, message } = JSON.stringify(data);
				if (!error) {
					console.log('data', data);
					alert('Vendor Address Deleted Successfully');
					dispatch(fetchVenReviewlistStart({ fetchApiData }));
				} else alert('Error');
				console.log(data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<Card className={classes.root} variant='outlined'>
			<CardContent style={{ padding: '0px' }}>
				<Grid container style={{ padding: '1em' }}>
					<Grid item sm={4}>
						<Grid container direction='column'>
							<Grid item style={{ fontWeight: 'bold' }}>
								Review Name: {review_ven.review_name}
							</Grid>
							<Grid item>Review ID: {review_ven.id}</Grid>
						</Grid>
					</Grid>
					<Grid item sm={4}>
						<Grid container direction='column'>
							<Grid item>Overall Rating : {review_ven.overall_rating}</Grid>
							<Grid item>Created By: {review_ven.created_by.username}</Grid>
						</Grid>
					</Grid>

					<Grid item sm={3}>
						{review_ven.overall_status === 'completed' ? (
							<Chip
								label={review_ven.overall_status}
								style={{
									backgroundColor: '#388e3c',
									color: '#fff',
									borderRadius: '0.5em',
								}}
							/>
						) : review_ven.overall_status === 'submitted' ? (
							<Chip
								label={review_ven.overall_status}
								style={{
									backgroundColor: '#ff9800',
									color: '#fff',
									borderRadius: '0.5em',
								}}
							/>
						) : (
							<Chip
								label={review_ven.overall_status}
								style={{
									backgroundColor: '#f44336',
									color: '#fff',
									borderRadius: '0.5em',
								}}
							/>
						)}
					</Grid>
					<Grid item sm={1}>
						<DeleteForeverIcon
							className={classes.deletButton}
							onClick={() => handleDelete({ review_id: review_ven.id })}
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
