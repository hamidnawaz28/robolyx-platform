import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Ticket from './Ticket.component';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
	listmain: {
		border: '1px solid f8f9fa',
		paddingLeft: '1em',
		paddingRight: '1em',
		paddingBottom: '1em',
		//minWidth: '25em',
		borderRadius: '1%',
		backgroundColor: '#e9ecef',
		// boxSizing: "borderBox",
		// marginRight: "0.3em",
		//backgroundColor: "#fff",
	},
	listheading: {
		backgroundColor: '#15616d',
		fontSize: '1.1em',
		padding: '0em',
		marginBottom: '1em',
		borderRadius: '2%',
		height: '3em',
		color: '#fff',
	},
}));

function List({ list, tickets }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { list_title, name } = list;

	console.log('tickets', tickets);

	return (
		<React.Fragment>
			<div className={classes.listmain}>
				<Grid
					container
					justify='center'
					className={classes.listheading}
					alignContent='center'
				>
					<Grid item>
						<h3>{list_title}</h3>
					</Grid>
				</Grid>
				<Droppable droppableId={name}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{tickets &&
								tickets.map((ticket, index) => (
									<Ticket
										key={ticket.display_id}
										ticket={ticket}
										index={index}
									/>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</React.Fragment>
	);
}

export default List;
