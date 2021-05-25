import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MoreIcon from '@material-ui/icons/More';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BusinessIcon from '@material-ui/icons/Business';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import GrainIcon from '@material-ui/icons/Grain';

import VendorBasicModalBody from './modal_Basic_Info/VendorBasicModalBody';

const useStyles = makeStyles((theme) => ({
	root: { marginBottom: '1em' },
	contact: {
		fontWeight: 'bold',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const CardSample = ({
	icon,
	title,
	buttonTitle,
	VendorDetail,
	id,
	Vendor_full,
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Card className={classes.root} key={id}>
			<CardContent>
				<Grid container>
					<Grid item sm={12}>
						<Grid
							container
							justify='space-between'
							alignItems='center'
							style={{ paddingBottom: '1em' }}
						>
							<Grid item>
								<Grid container spacing={2} alignContent='center'>
									<Grid item>
										{icon === 'tags' ? (
											<MoreIcon />
										) : icon === 'category' ? (
											<AccountTreeIcon />
										) : icon === 'payment' ? (
											<AccountBalanceIcon />
										) : icon === 'trade' ? (
											<BusinessIcon />
										) : icon === 'diversity' ? (
											<GrainIcon />
										) : (
											''
										)}
									</Grid>
									<Grid item>
										<Typography variant='h6'>{title}</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<div>
									<Button color='secondary' size='small' onClick={handleOpen}>
										{buttonTitle}
									</Button>
									<Modal
										aria-labelledby='transition-modal-title'
										aria-describedby='transition-modal-description'
										className={classes.modal}
										open={open}
										onClose={handleClose}
										closeAfterTransition
										BackdropComponent={Backdrop}
										BackdropProps={{
											timeout: 500,
										}}
									>
										<Fade in={open}>
											<div className={classes.paper}>
												<VendorBasicModalBody
													icon={icon}
													title={title}
													VendorDetail={VendorDetail}
													id={id}
													buttonTitle={buttonTitle}
													Vendor_full={Vendor_full}
													setOpen={setOpen}
												/>
											</div>
										</Fade>
									</Modal>
								</div>
							</Grid>
						</Grid>
						<Divider />
					</Grid>

					<Grid item style={{ paddingTop: '1em' }}>
						{VendorDetail &&
							VendorDetail.map((ven) => (
								<React.Fragment key={ven.name}>
									<Chip
										label={ven.name}
										color='primary'
										style={{
											marginRight: '0.5em',
											height: '1.7rem',
											fontSize: '0.75rem',
										}}
									/>
								</React.Fragment>
							))}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default CardSample;
