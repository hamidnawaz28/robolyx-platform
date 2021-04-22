import { Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import EventNoteIcon from '@material-ui/icons/EventNote';

import { Draggable } from 'react-beautiful-dnd';

import TicketeditModal from '../ticket_edit_modal/AddTicketModal.component';

import { Avatar, Chip as MuiChip } from '@material-ui/core';
import styled from 'styled-components';
import { red, green, orange } from '@material-ui/core/colors';

const Chip = styled(MuiChip)`
	height: 25px;
	padding: 2px 0;
	font-size: 85%;
	border-radius: 8%;
	background-color: ${(props) => props.rgbcolor};
	color: ${(props) => props.theme.palette.common.white};
	margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const useStyles = makeStyles((theme) => ({
	mainticket: {
		border: '1px solid #ced0ce',
		backgroundColor: '#fff',
		marginBottom: '2em',
		borderRadius: '4%',
	},
	lowpriority: {
		color: 'green',
	},
	highpriority: {
		color: 'red',
	},
	mediumpriority: {
		color: '#96031a',
	},
	avatarTic: {
		height: '1.3em',
		width: '1.3em',
		backgroundColor: '#000',
		padding: '0.7em',
		[theme.breakpoints.down('xs')]: {
			height: '0.6em',
			width: '0.6em',
			fontSize: '0.8em',
		},
	},
	tik_title: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.8em',
			paddingLeft: '2em',
		},
	},
}));

function Ticket({ ticket, index }) {
	const classes = useStyles();
	return (
		<Draggable draggableId={String(ticket.id)} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Card mb={6} style={{ marginBottom: '1em' }}>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								<Grid container alignItems='center'>
									<Grid item xs={1}>
										<Avatar
											className={classes.avatarTic}
											alt={ticket.created_by.username.toUpperCase()}
											src={'data:image;base64, '}
										/>
									</Grid>
									<Grid
										item
										xs={11}
										style={{ paddingLeft: '0.5em' }}
										className={classes.tik_title}
									>
										{ticket.ticket_title}
									</Grid>
								</Grid>
							</Typography>

							{ticket.priority == 'low' ? (
								<Chip label='Low' rgbcolor={green[500]} />
							) : ticket.priority == 'medium' ? (
								<Chip label='Medium' rgbcolor={orange[500]} />
							) : ticket.priority == 'high' ? (
								<Chip label='High' rgbcolor={red[500]} />
							) : (
								''
							)}

							<Typography mb={4} component='p'>
								{ticket.ticket_content.length > 200
									? `${ticket.ticket_content.substring(0, 200)}...`
									: ticket.ticket_content}
							</Typography>
						</CardContent>
						<CardActions>
							<Grid container justify='space-between'>
								<Grid item>
									<Grid container direction='column'>
										<Grid item>
											<Grid container>
												<Grid item>
													<EventNoteIcon
														fontSize='small'
														style={{ width: '0.86em' }}
													/>
												</Grid>
												<Grid item style={{ paddingLeft: '0.3em' }}>
													<Grid item>Due Date: {ticket.due_date}</Grid>
												</Grid>
											</Grid>
										</Grid>
										<Grid item>
											<Typography
												variant='caption'
												style={{ fontWeight: 'bolder' }}
											>
												Ticket Number:{ticket.ticket_number}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<TicketeditModal ticket={ticket} />
								</Grid>
							</Grid>
						</CardActions>
					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default Ticket;
