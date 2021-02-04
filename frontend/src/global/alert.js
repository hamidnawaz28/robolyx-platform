import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
const useStyles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class DialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
   
    render() {
        const { classes } = this.props;
        return <>
                <div>
                    <Dialog fullScreen open={this.props.dialogState} onClose={this.props.dialogCloseEvent} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={this.props.dialogCloseEvent} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    New Rule Test
                                </Typography>
                                <Button autoFocus color="inherit" onClick={this.props.dialogCloseEvent}>
                                    Close
                                </Button>
                            </Toolbar>
                        </AppBar>
                        {this.props.table}
                    </Dialog>
                </div>
        </>
    }
}
// export default DialogBox;
export default withStyles(useStyles)(DialogBox);
