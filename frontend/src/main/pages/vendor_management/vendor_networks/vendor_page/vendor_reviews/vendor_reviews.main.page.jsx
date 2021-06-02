import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddForm from './review_modal/MainFormikPage';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import VendorReviewSearch from './ReviewSearchQuery';

import {
	fetchVenReviewlistStart,
	updateCurrentPage,
} from '../../redux/vendorNetworksActions';
import VendorReviewCard from './ven_review_card';

const useStyles = makeStyles((theme) => ({
	boxborder: {
		border: '1px solid #e5e5e5',
		marginBottom: '1rem',
		borderRadius: '0.25rem',
	},
	boxborderSearch: {
		border: '1px solid #e5e5e5',
		padding: '0px',
		marginBottom: '0.5rem',
		borderRadius: '0.25rem',
	},
}));

function VendorReviews() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	let { id } = useParams();

	const { searchVenReview, currentPage, perPage, ven_review_templates } =
		useSelector((state) => state.vendorNetworks);

	let fetchApiData = {
		vendorId: id,
		searchVenReview: JSON.stringify(searchVenReview),
		currentPage: currentPage,
		perPage: perPage,
	};
	console.log('vendors.count', ven_review_templates);

	useEffect(() => {
		dispatch(fetchVenReviewlistStart({ fetchApiData }));
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handlePageChange = (event, value) => {
		let currPage = value;
		dispatch(updateCurrentPage(currPage));
		fetchApiData['currentPage'] = currPage;
		dispatch(fetchVenReviewlistStart({ fetchApiData }));
	};
	return (
		<Grid container direction='column' spacing={5}>
			<Grid item className={classes.boxborder}>
				<Grid container justify='flex-end'>
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							onClick={handleClickOpen}
							size='small'
						>
							Add Review
						</Button>
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby='alert-dialog-title'
							aria-describedby='alert-dialog-description'
						>
							<DialogTitle id='alert-dialog-title'>
								{'Add New Performance Review'}
							</DialogTitle>
							<AddForm setOpen={setOpen} />
						</Dialog>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.boxborderSearch} sm={12}>
				<VendorReviewSearch />
			</Grid>
			<Grid item className={classes.boxborder}>
				{ven_review_templates.data &&
					ven_review_templates.data.map((review_ven) => (
						<VendorReviewCard review_ven={review_ven} />
					))}
			</Grid>
			<Grid item>
				<Grid container justify='center' className={classes.paginationComp}>
					<Grid item>
						<Pagination
							count={Math.ceil(ven_review_templates.count / perPage)}
							page={currentPage}
							onChange={handlePageChange}
							defaultPage={1}
							color='primary'
							size='small'
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default VendorReviews;
