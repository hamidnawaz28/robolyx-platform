import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import {
    SERVER_URL,
    INVOICE_DATA,
} from "./constants";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '200px',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
export default function LoadingModal(props) {
    const classes = useStyles();
    const { formState, formCloseEvent } = props
    return (
        <Dialog open={formState} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <Typography variant="h6" component="h4" align="center" gutterBottom>
                    <Box >
                        Uploading
                    </Box>
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                    <LinearProgress color="primary" />
                </div>
            </DialogContent>
            <Grid container justify="center">
                <DialogActions position="centre">
                    <Button onClick={formCloseEvent} variant="outlined" color="primary">
                        Cancel
                        </Button>
                </DialogActions>
            </Grid>
        </Dialog>
    )
}
