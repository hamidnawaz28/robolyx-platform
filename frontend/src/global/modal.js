import Modal from '@material-ui/core/Modal';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});
class MainModal extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return <>
            <Modal
                open={this.props.modalDisplay}
                onClose={() => this.props.handleModalClose()}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                // style={{
                //     position: 'absolute', left: '50%', top: '50%',
                //     transform: 'translate(-10%, -10%)'
                // }}
            >
                {
                    <>
                        <Grid container spacing={0} style={{ width: "400px", height: "200px", backgroundColor: "white", borderRadius: "5px",position: 'absolute',align:"centre" }}>
                            <Grid container spacing={0} >
                                <Grid xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <Typography variant="h6" component="h1" align="center" gutterBottom>
                                        <Box color="#7E55D5" >Notification</Box>
                                    </Typography>
                                </Grid>
                                <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <CloseIcon onClick={() => this.props.handleModalClose()} />
                                        </IconButton>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid style={{position:"centre"}}>
                                <CircularProgress position="centre" />
                                <Typography variant="h6" component="h3" align="center" gutterBottom>
                                    <Box color="#7E55D5" >Data Added Successfully</Box>
                                </Typography>
                            </Grid>
                            {/* <Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => this.props.handleModalClose()}
                                >Okay</Button>
                            </Grid> */}
                        </Grid>
                    </>
                }
            </Modal>
        </>
    }
}
export default MainModal;
// export default withStyles(useStyles)(TaxonomyUpload);
