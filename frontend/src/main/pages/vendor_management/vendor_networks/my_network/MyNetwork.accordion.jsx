import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginBottom: '1em',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: '600',
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(11),
		color: theme.palette.text.secondary,
	},
	circleIcon: {
		color: '#388e3c',
	},
	triIcon: {
		color: '#f4a261',
	},
	noCircleIcon: {
		color: '#e63946',
	},
	pendingIcon: {
		color: '#8d99ae',
	},
	chip: {
		height: '1.3rem',
		fontSize: '0.7rem',
		borderRadius: '0.3rem',
	},
}));

export default function VendorAccordion({ vendor }) {
	const classes = useStyles();
	let history = useHistory();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const ChipNew = ({ label, error }) =>
		error ? (
			<Chip
				size='small'
				label={label}
				variant='outlined'
				style={{ color: '#eb1808ed' }}
				className={classes.chip}
			/>
		) : (
			<Chip
				size='small'
				label={label}
				style={{
					marginRight: '0.5em',
					borderColor: '#15616d',
				}}
				className={classes.chip}
				variant='outlined'
			/>
		);

	return (
		<div className={classes.root}>
			<Accordion
				expanded={expanded === 'panel1'}
				onChange={handleChange('panel1')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1bh-content'
					id='panel1bh-header'
					style={{ padding: '0.5em 2em' }}
				>
					<Grid container>
						<Grid item sm={4}>
							{' '}
							<Typography className={classes.heading} color='primary'>
								<a
									className={classes.anchor}
									onClick={() =>
										history.push({
											pathname: `/vendor-management/vendor/${vendor.id}`,
											vendor: vendor,
										})
									}
								>
									{vendor.vendor_name}
								</a>
							</Typography>
							<Typography variant='caption'>Vendor ID: {vendor.id}</Typography>
						</Grid>
						<Grid item sm={8}>
							<Grid container spacing={4}>
								<Grid item>
									{/* Start */}
									<Grid container alignContent='center' spacing={1}>
										<Grid item>
											<FiberManualRecordIcon
												fontSize='small'
												className={classes.circleIcon}
											/>
										</Grid>
										<Grid item>
											<Typography
												variant='caption'
												className={classes.secondaryHeading}
											>
												0 Compliant
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									{/* Start */}
									<Grid container alignContent='center' spacing={1}>
										<Grid item>
											<ChangeHistoryIcon
												fontSize='small'
												className={classes.triIcon}
											/>
										</Grid>
										<Grid item>
											<Typography
												variant='caption'
												className={classes.secondaryHeading}
											>
												1 Conditional
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									{/* Start */}
									<Grid container alignContent='center' spacing={1}>
										<Grid item>
											<NotInterestedIcon
												fontSize='small'
												className={classes.noCircleIcon}
											/>
										</Grid>
										<Grid item>
											<Typography
												variant='caption'
												className={classes.secondaryHeading}
											>
												0 Non-Compliant
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								{/* End */}
								<Grid item>
									{/* Start */}
									<Grid container alignContent='center' spacing={1}>
										<Grid item>
											<RadioButtonUncheckedIcon
												fontSize='small'
												className={classes.pendingIcon}
											/>
										</Grid>
										<Grid item>
											<Typography
												variant='caption'
												className={classes.secondaryHeading}
											>
												0 Pending
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								{/* End */}

								<Grid container spacing={4}>
									<Grid item>
										{/* Start */}
										<Grid container alignContent='center' spacing={1}>
											<Grid item>
												<AccountTreeIcon fontSize='small' color='primary' />
											</Grid>
											<Grid item>
												<Typography
													variant='caption'
													className={classes.secondaryHeading}
												>
													1 Site Connection
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									{/* End */}
									<Grid item>
										{/* Start */}
										<Grid container alignContent='center' spacing={1}>
											<Grid item>
												<MenuBookIcon fontSize='small' color='primary' />
											</Grid>
											<Grid item>
												<Typography
													variant='caption'
													className={classes.secondaryHeading}
												>
													1 Trade
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									{/* End */}
									<Grid item>
										{/* Start */}
										<Grid container alignContent='center' spacing={1}>
											<Grid item>
												<LocationCityIcon fontSize='small' color='primary' />
											</Grid>
											<Grid item>
												<Typography
													variant='caption'
													className={classes.secondaryHeading}
												>
													1 Location
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									{/* End */}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container>
						<Grid item sm={6}>
							<Typography style={{ fontWeight: 'bold' }}>Tags:</Typography>
							{vendor.tags.length ? (
								vendor.tags.map((tag) => (
									<React.Fragment>
										<ChipNew label={tag} error={false} />
									</React.Fragment>
								))
							) : (
								<ChipNew label='No Tags Applied' error={true} />
							)}
						</Grid>
						<Grid item sm={6}>
							<Typography style={{ fontWeight: 'bold' }}>
								Categories:
							</Typography>
							{vendor.category.length ? (
								vendor.category.map((cat) => (
									<ChipNew label={cat} error={false} />
								))
							) : (
								<ChipNew label='No Category Applied' error={true} />
							)}
						</Grid>
						<Grid item sm={6}>
							<Typography style={{ fontWeight: 'bold' }}>Trades:</Typography>
							{vendor.trades.length ? (
								vendor.trades.map((trade) => (
									<ChipNew label={trade} error={false} />
								))
							) : (
								<ChipNew label='No Trades Applied' error={true} />
							)}
						</Grid>
						<Grid item sm={6}>
							<Typography style={{ fontWeight: 'bold' }}>
								Payment Term:
							</Typography>
							{vendor.payment_term.length ? (
								vendor.payment_term.map((payterm) => (
									<ChipNew label={payterm} error={false} />
								))
							) : (
								<ChipNew label='No Payment Term Applied' error={true} />
							)}
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
