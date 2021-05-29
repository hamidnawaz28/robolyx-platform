import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddForm from './review_modal/MainFormikPage';

const useStyles = makeStyles((theme) => ({
	boxborder: {
		border: '1px solid #e5e5e5',
		marginBottom: '1rem',
		borderRadius: '0.25rem',
	},
}));

function VendorReviews() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
			<Grid item className={classes.boxborder}>
				<Grid container justify='flex-end'>
					<Grid item>
						<Button size='small' variant='contained' color='primary'>
							Add Review
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.boxborder}>
				<Grid container justify='flex-end'>
					<Grid item>
						<Button size='small' variant='contained' color='primary'>
							Add Review
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default VendorReviews;
