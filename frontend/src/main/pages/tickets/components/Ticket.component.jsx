import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EventNoteIcon from "@material-ui/icons/EventNote";
import HistoryIcon from "@material-ui/icons/History";

import TicketeditModal from "../ticket_edit_modal/AddTicketModal.component";

const useStyles = makeStyles((theme) => ({
  mainticket: {
    border: "1px solid e9ecef",
    backgroundColor: "#fff",
    marginBottom: "2em",
  },
  lowpriority: {
    color: "green",
  },
  highpriority: {
    color: "red",
  },
  mediumpriority: {
    color: "#96031a",
  },
}));

function Ticket({ ticket }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container item spacing={2} className={classes.mainticket}>
        <Grid item style={{ width: "100%" }}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h4"
                  style={{ color: "#2c4251" }}
                >
                  <Grid container justify="space-between">
                    <Grid item>
                      <Grid container>
                        <Grid item>
                          <SupervisedUserCircleIcon fontSize="default" />
                        </Grid>
                        <Grid item style={{ paddingLeft: "0.1em" }}>
                          {ticket.ticket_title}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TicketeditModal ticket={ticket} />
                    </Grid>
                  </Grid>
                </Typography>
                <Typography
                  variant="button"
                  style={{ color: "#ec4e20" }}
                  component="h6"
                >
                  <Grid container>
                    <Grid item>
                      <EventNoteIcon
                        fontSize="small"
                        style={{ width: "0.86em" }}
                      />
                    </Grid>
                    <Grid item style={{ paddingLeft: "0.3em" }}>
                      Due Date: {ticket.due_date}
                    </Grid>
                  </Grid>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {ticket.ticket_content.length > 200
                    ? `${ticket.ticket_content.substring(0, 200)}...`
                    : ticket.ticket_content}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid
                container
                justify="flex-start"
                spacing={5}
                alignItems="center"
              >
                <Grid item>
                  <HistoryIcon />
                </Grid>
                <Grid item>
                  {" "}
                  <Typography
                    variant="button"
                    className={
                      ticket.priority == "low"
                        ? classes.lowpriority
                        : ticket.priority == "high"
                        ? classes.highpriority
                        : classes.mediumpriority
                    }
                    variant="subtitle2"
                  >
                    Priority {ticket.priority}
                  </Typography>
                  <Typography variant="caption">
                    Ticket Number:{ticket.ticket_number}
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Ticket;
