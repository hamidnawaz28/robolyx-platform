import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./components/List.component";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TeamWork from "../../../assets/teamwork.png";
import styled from "styled-components";
import TicketAddModal from "./ticket_add_modal/AddTicketModal.component";
import {
  fetchTicketsStart,
  fetchUserStart,
  PartialUpdateTicket,
} from "./redux/ticketActions";
import ActiveTicketsSearchQuery from "./ActiveTicketsSearchQuery";

//drag m drop import
import { DragDropContext } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  mainpage_ticket: {},
  listmain: {},
}));

const listData = [
  { list_title: "Open Tickets", name: "Open_Tickets" },
  { list_title: "InProgress Tickets", name: "In_Progress_Tickets" },
  { list_title: "Resolved Tickets", name: "Resolved_Tickets" },
];

const TicketList = styled.div`
  padding: "4px";
`;

function TicketRegister() {
  const classes = useStyles();

  let activeQuery1 = {
    ticket_title__icontains: "",
    ticket_number__icontains: "",
    ticket_content__icontains: "",
  };

  const onDragEnd = (result) => {
    // Make sure we have a valid destination
    console.log(result);
    //console.log(("result.draggableId", result.destination.droppableId));
    const { source, destination } = result;
    if (destination === undefined || destination === null) return null;
    console.log(source, destination);
    let fetchApiData = { activeQuery: JSON.stringify(activeQuery1) };
    let data = {
      fetchApiData: fetchApiData,
      id: result.draggableId,
      post_data: { list_tickets: result.destination.droppableId },
    };
    dispatch(PartialUpdateTicket(data));
  };

  const dispatch = useDispatch();
  let fetchApiData = { activeQuery: JSON.stringify(activeQuery1) };

  useEffect(() => {
    dispatch(fetchTicketsStart({ fetchApiData }));
    dispatch(fetchUserStart());
  }, []);

  const ticketsData1 = useSelector((state) => state.tickets.ticketsData);
  console.log(ticketsData1);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid
        container
        direction="column"
        className={classes.mainpage_ticket}
        sm={12}
      >
        <Grid item container justify="space-between">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <img src={TeamWork} alt="ledger" style={{ width: "2.5em" }} />
              </Grid>
              <Grid item>
                <Typography variant="h3">Ticket Register</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TicketAddModal />
          </Grid>
          <Grid item sm={12}>
            <ActiveTicketsSearchQuery />
          </Grid>
        </Grid>

        <Grid item container spacing={4}>
          {ticketsData1.data &&
            listData.map((list) => {
              let tickets = ticketsData1.data.filter((ticket) =>
                ticket.list_tickets.includes(list.name)
              );
              return (
                <Grid item xs={12} lg={4} xl={4}>
                  <TicketList>
                    <List key={list.name} list={list} tickets={tickets}></List>
                  </TicketList>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default TicketRegister;
