import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ListAltIcon from "@material-ui/icons/ListAlt";
import CloseIcon from "@material-ui/icons/Close";

import DeleteDialog from "./CertificateDeleteDialog";

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "1em" },
  cross: {
    width: "0.8em",
    "&:hover": {
      cursor: "pointer",
      color: "#e63946",
    },
  },
}));

export default function Certificate({ cert, refreshCert, setRefreshCert }) {
  const classes = useStyles();
  console.log(cert);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Grid
        container
        style={{
          border: "1px solid #dee2e6",
        }}
      >
        <Grid item xs={11}>
          <Grid
            container
            style={{
              padding: "0.3em",
            }}
            direction="row"
            alignItems="center"
          >
            <Grid item style={{ paddingRight: "0.2em" }} xs={2}>
              <ListAltIcon fontSize="large" />
            </Grid>
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6" style={{ fontSize: "0.9em" }}>
                    {cert.certificate_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption" style={{ fontSize: "0.8em" }}>
                    {cert.aggregation_body}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption" style={{ fontSize: "0.8em" }}>
                    {cert.registration_no} . {cert.created_at}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CloseIcon
            fontSize="small"
            className={classes.cross}
            onClick={handleClickOpen}
          />
          <DeleteDialog
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            cert={cert}
            refreshCert={refreshCert}
            setRefreshCert={setRefreshCert}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
