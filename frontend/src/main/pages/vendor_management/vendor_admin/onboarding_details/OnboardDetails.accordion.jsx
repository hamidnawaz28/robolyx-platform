import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import MainFormik from './formik_form/Formik.main.page';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(19),
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(12),
		color: theme.palette.text.secondary,
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20,
	},
	details: {
		alignItems: 'center',
	},
	column: {
		flexBasis: '33.33%',
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: theme.spacing(1, 2),
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}));

export default function OnboardDetailsAccordion({ vendor }) {
	const classes = useStyles();

	return (
		<Grid className={classes.root}>
			<Accordion defaultExpanded={false}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1c-content'
					id='panel1c-header'
				>
					<Grid className={classes.column}>
						<Typography variant='h1' className={classes.heading}>
							{vendor.vendor_name}
						</Typography>
						<Typography variant='body1'>Vendor ID: {vendor.id}</Typography>
					</Grid>
					<Grid className={classes.column}>
						<Typography className={classes.secondaryHeading}>
							Contact Name: {vendor.contact_name}
						</Typography>
						<Typography className={classes.secondaryHeading}>
							Email: {vendor.contact_email}
						</Typography>
					</Grid>
				</AccordionSummary>
				<AccordionDetails className={classes.details}>
					{/* //formhere */}
					<MainFormik vendor={vendor} />
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
}
