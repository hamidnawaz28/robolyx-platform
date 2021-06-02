import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NotesDialog from "./NotesDialog";
import { useParams } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },

  subtitle: {
    fontWeight: "600",
    fontSize: "0.9em",
  },
  subtitle2: {
    fontWeight: "600",
    fontSize: "1em",
  },
  marginBott: {
    marginBottom: "0.3em",
  },
});

export default function VendorNotesCard({ note }) {
  const classes = useStyles();
  let { id } = useParams();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ padding: "0px" }}>
        <Grid container>
          <Grid
            item
            sm={9}
            style={{ borderRight: "1px solid #ced4da", padding: "1.2em" }}
          >
            <Grid container direction="column">
              <Grid item className={classes.marginBott}>
                {note.priority == "low" ? (
                  <Chip
                    label="Low"
                    style={{
                      backgroundColor: "#388e3c",
                      color: "#fff",
                      borderRadius: "0.3em",
                    }}
                    size="small"
                  />
                ) : note.priority == "medium" ? (
                  <Chip
                    label="Medium"
                    size="small"
                    style={{
                      backgroundColor: "#ff9800",
                      color: "#fff",
                      borderRadius: "0.3em",
                    }}
                  />
                ) : (
                  <Chip
                    label="High"
                    size="small"
                    style={{
                      backgroundColor: "#f44336",
                      color: "#fff",
                      borderRadius: "0.3em",
                    }}
                  />
                )}
              </Grid>
              <Grid item className={classes.marginBott}>
                <Typography variant="body2">
                  <span className={classes.subtitle2}>Subject:</span>{" "}
                  {note.subject} <br />
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <span className={classes.subtitle2}>Description:</span>{" "}
                  {note.description} <br />
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={3}>
            <Grid container direction="column">
              <Grid item style={{ padding: "1em" }}>
                <Typography variant="body2">
                  <span className={classes.subtitle}>Created at:</span>{" "}
                  {note.created_at} <br />
                </Typography>
                <Typography variant="body2">
                  <span className={classes.subtitle}>Created by:</span>{" "}
                  {note.created_by} <br />
                </Typography>
                <Typography variant="body2">
                  <span className={classes.subtitle}>Description:</span>{" "}
                  {note.category} <br />
                </Typography>
              </Grid>
              <Divider />
              <Grid item>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  style={{ padding: "1em" }}
                >
                  <Grid item>
                    <NotesDialog action="edit" ven_note={note} />
                  </Grid>
                  <Grid item>
                    <DeleteDialog ven_note_id={note.id} venId={id} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
