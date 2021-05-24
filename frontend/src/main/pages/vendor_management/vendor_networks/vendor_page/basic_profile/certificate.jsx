import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
	root: { marginBottom: '1em' },
}));

export default function Certificate({ cert }) {
	console.log(cert);
	return (
		<React.Fragment>
			<Grid
				container
				style={{
					border: '1px solid #dee2e6',
					padding: '0.8em',
				}}
			>
				<Grid item style={{ paddingRight: '0.5em' }}>
					<ListAltIcon fontSize='large' />
				</Grid>
				<Grid item>
					<Grid container direction='column'>
						<Grid item>
							<Typography variant='h6' style={{ fontSize: '1em' }}>
								{cert.certificate_name}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='caption'>{cert.aggregation_body}</Typography>
						</Grid>
						<Grid item>
							<Typography variant='caption'>
								{cert.registration_no} . {cert.created_at}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
