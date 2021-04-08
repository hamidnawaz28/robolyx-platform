import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListStart, fetchUserStart } from "./redux/ticketActions";
import List from "./components/List.component";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TeamWork from "../../../assets/teamwork.png";

import TicketAddModal from "./ticket_add_modal/AddTicketModal.component";

const useStyles = makeStyles((theme) => ({
  mainpage_ticket: {
    minWidth: "87em",
    overflowX: "scroll",
  },
}));

function TicketRegister() {
  const dispatch = useDispatch();
  const listData1 = useSelector((state) => state.tickets.listData.data);
  console.log(listData1);
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchListStart());
    dispatch(fetchUserStart());
  }, []);

  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.mainpage_ticket}>
        <Grid container justify="space-between">
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
        </Grid>

        <Grid item>
          <Grid container justify="center">
            <Grid
              item
              container
              direction="row"
              justify="space-evenly"
              className={classes.listmain}
            >
              {listData1 && listData1.map((list) => <List list={list} />)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TicketRegister;
