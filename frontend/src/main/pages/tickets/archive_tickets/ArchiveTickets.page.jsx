import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArchiveTicketsTable from './ArchiveTickets.table';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ArchiveTicketsSearch from './ArchiveTicketsSearchQuery';
import Archive from '../../../../assets/archive.png';
import {
	ARC_TICKETS_COLUMNS,
	ARC_TICKETS_DATA,
} from '../../../../global/constants';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	tableArchive: {
		maxWidth: '80vw',
		[theme.breakpoints.down('xs')]: {
			maxWidth: '90vw',
		},
	},
}));

export default function FormPropsTextFields() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<Grid container>
				<Grid item>
					<Grid container spacing={2} style={{ marginBottom: '0.5em' }}>
						<Grid item>
							<img src={Archive} alt='ledger' style={{ width: '2.3em' }} />
						</Grid>
						<Grid item>
							<Typography variant='h3'>Search Archive Tickets</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					justify='space-between'
					alignItems='flex-end'
					style={{ marginBottom: '2em' }}
				>
					<ArchiveTicketsSearch apiLink={ARC_TICKETS_DATA} />
				</Grid>
				<Grid item sm={12} className={classes.tableArchive}>
					<ArchiveTicketsTable
						tableHeaders={ARC_TICKETS_COLUMNS}
						paginationOption={true}
						apiLink={ARC_TICKETS_DATA}
					/>
				</Grid>
			</Grid>
		</form>
	);
}
