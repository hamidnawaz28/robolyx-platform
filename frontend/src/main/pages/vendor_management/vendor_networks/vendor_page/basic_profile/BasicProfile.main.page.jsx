import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MoreIcon from "@material-ui/icons/More";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function BasicProfile() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardContent>
          <Grid container>
            <Grid item sm={12}>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                style={{ paddingBottom: "1em" }}
              >
                <Grid item>
                  <Grid container spacing={2} alignContent="center">
                    <Grid item>
                      <MoreIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">Applied Tags</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button color="secondary" size="small">
                    Apply Tags
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </Grid>

            <Grid item></Grid>
          </Grid>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
