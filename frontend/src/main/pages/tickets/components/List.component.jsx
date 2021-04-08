import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Ticket from "./Ticket.component";

const useStyles = makeStyles((theme) => ({
  listmain: {
    border: "1px solid f8f9fa",
    paddingLeft: "1em",
    paddingRight: "1em",
    //minWidth: '25em',
    width: "30%",
    borderRadius: "1%",
    backgroundColor: "#e9ecef",
  },
  listheading: {
    backgroundColor: "#81b29a",
    fontSize: "1.1em",
    padding: "0em",
    marginBottom: "1em",
    borderRadius: "2%",
    height: "3em",
  },
}));

function List({ list }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item className={classes.listmain}>
        <Grid
          container
          justify="center"
          className={classes.listheading}
          alignContent="center"
        >
          <Grid item>
            <h3>{list.list_title}</h3>
          </Grid>
        </Grid>

        {list.revlisttickets &&
          list.revlisttickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
      </Grid>
    </React.Fragment>
  );
}

export default List;
