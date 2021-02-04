import { connect } from "react-redux";
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
import axios from 'axios';
import {
    SERVER_URL,
    INVOICE_DATA,
} from "./constants";

const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});
class FormPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            queryData: {
                INVOICE_ID: '',
                GL_DATE: '',
                INV_ORGINE: '',
                INV_DATE: '',
                INV_SOURCE: '',
                INV_NUMBER: '',
                VENDOR_NUMBER: '',
                VENDOR_NAME: '',
                VENDOR_TYPE: '',
                INV_TERMS: '',
                LINE_NUMBER: '',
                LINE_TYPE: '',
                LINE_DESCRIPTION: '',
                LINE_QUANTITY: '',
                LINE_UNIT_PRICE: '',
                LINE_UNIT_OF_MEASURE: '',
                LINE_AMOUNT: '',
                GENERAL_LEDGER: '',
                LOCATION: '',
                DEPARTMENT: '',
                ACCOUNT: '',
                PO_NUMBER: '',
                CREATION_DATE: ''
            }
        }
    }
    handleChange(event, field) {
        let value = event.target.value;
        let queryDataPrv = this.state.queryData;
        let queryDataNew = {}
            for(let key in queryDataPrv){
                key==field?queryDataNew[key]=value: queryDataNew[key] = queryDataPrv[key]
                }
        this.setState({queryData:queryDataNew})
    }
    handleSave() {
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        if (this.props.actionType == "Edit") {
            let pk = this.props.formData.pk;
            axios
                .put(SERVER_URL + INVOICE_DATA,
                    {
                        params:
                        {
                            pk: pk,
                            query: JSON.stringify(this.state.queryData)
                        }
                    })
                .then(res => {
                    this.props.updateDataFunction()
                    alert("Updated Successfully")
                }
                )
                .catch(err => console.log(err));
        }
        else {
            axios
                .post(SERVER_URL + INVOICE_DATA,
                    {
                        params:
                        {
                            currentUserProject: currentUserProject,
                            query: JSON.stringify(this.state.queryData)
                        }
                    })
                .then(res => {
                    this.props.updateDataFunction()
                    alert("Added Successfully")
                }
                )
                .catch(err => console.log(err));
        }


    }
    componentDidMount() {
        if (this.props.actionType == "Edit") {
            let queryDataPrv = this.state.queryData;
            debugger;
            let queryDataNew = {}
            for(let key in queryDataPrv){
                queryDataNew[key]= this.props.formData.fields[key]
                }
            this.setState({queryData:queryDataNew})
            debugger;
            }
        }
    render() {
        return <>
            <div>
                <Dialog open={this.props.formState} onClose={this.props.formCloseEvent} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            <Box >{this.props.actionType} Invoice
                            </Box>
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={0}>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INVOICE_ID"
                                        multiline
                                        value={this.state.queryData.INVOICE_ID}
                                        onChange={(event) => this.handleChange(event, "INVOICE_ID")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INV_ORGINE"
                                        value={this.state.queryData.INV_ORGINE}
                                        onChange={(event) => this.handleChange(event, "INV_ORGINE")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INV_SOURCE"
                                        value={this.state.queryData.INV_SOURCE}
                                        onChange={(event) => this.handleChange(event, "INV_SOURCE")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INV_NUMBER"
                                        value={this.state.queryData.INV_NUMBER}
                                        onChange={(event) => this.handleChange(event, "INV_NUMBER")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INV_TERMS"
                                        value={this.state.queryData.INV_TERMS}
                                        onChange={(event) => this.handleChange(event, "INV_TERMS")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6}  >
                                <Box m={1}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style ={{width:"100%"}}
                                        label="GL_DATE"
                                        value={this.state.queryData.GL_DATE}
                                        onChange={(event) => this.handleChange(event, "GL_DATE")}
                                    />
                                </Box>
                            </Grid>
                            
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style ={{width:"100%"}}
                                        label="INV_DATE"
                                        value={this.state.queryData.INV_DATE}
                                        onChange={(event) => this.handleChange(event, "INV_DATE")}
                                    />
                                </Box>
                            </Grid>
                            
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="VENDOR_NUMBER"
                                        value={this.state.queryData.VENDOR_NUMBER}
                                        onChange={(event) => this.handleChange(event, "VENDOR_NUMBER")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="VENDOR_NAME"
                                        value={this.state.queryData.VENDOR_NAME}
                                        onChange={(event) => this.handleChange(event, "VENDOR_NAME")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="VENDOR_TYPE"
                                        value={this.state.queryData.VENDOR_TYPE}
                                        onChange={(event) => this.handleChange(event, "VENDOR_TYPE")}
                                    />
                                </Box>
                            </Grid>
                            
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LINE_NUMBER"
                                        value={this.state.queryData.LINE_NUMBER}
                                        onChange={(event) => this.handleChange(event, "LINE_NUMBER")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LINE_TYPE"
                                        value={this.state.queryData.LINE_TYPE}
                                        onChange={(event) => this.handleChange(event, "LINE_TYPE")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LINE_DESCRIPTION"
                                        value={this.state.queryData.LINE_DESCRIPTION}
                                        onChange={(event) => this.handleChange(event, "LINE_DESCRIPTION")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LINE_QUANTITY"
                                        value={this.state.queryData.LINE_QUANTITY}
                                        onChange={(event) => this.handleChange(event, "LINE_QUANTITY")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LINE_UNIT_PRICE"
                                        value={this.state.queryData.LINE_UNIT_PRICE}
                                        onChange={(event) => this.handleChange(event, "LINE_UNIT_PRICE")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LINE_UNIT_OF_MEASURE"
                                        value={this.state.queryData.LINE_UNIT_OF_MEASURE}
                                        onChange={(event) => this.handleChange(event, "LINE_UNIT_OF_MEASURE")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LINE_AMOUNT"
                                        value={this.state.queryData.LINE_AMOUNT}
                                        onChange={(event) => this.handleChange(event, "LINE_AMOUNT")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="GENERAL_LEDGER"
                                        value={this.state.queryData.GENERAL_LEDGER}
                                        onChange={(event) => this.handleChange(event, "GENERAL_LEDGER")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LOCATION"
                                        value={this.state.queryData.LOCATION}
                                        onChange={(event) => this.handleChange(event, "LOCATION")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="DEPARTMENT"
                                        value={this.state.queryData.DEPARTMENT}
                                        onChange={(event) => this.handleChange(event, "DEPARTMENT")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="ACCOUNT"
                                        value={this.state.queryData.ACCOUNT}
                                        onChange={(event) => this.handleChange(event, "ACCOUNT")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="PO_NUMBER"
                                        value={this.state.queryData.PO_NUMBER}
                                        onChange={(event) => this.handleChange(event, "PO_NUMBER")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style ={{width:"100%"}}
                                        label="CREATION_DATE"
                                        value={this.state.queryData.CREATION_DATE}
                                        onChange={(event) => this.handleChange(event, "CREATION_DATE")}
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <Grid container justify="center">
                        <DialogActions position="centre">
                            <Button onClick={() => this.handleSave()} variant="contained" color="primary">
                                {this.props.actionType == "Edit" ? "Update" : "Save"}
                            </Button>
                            <Button onClick={this.props.formCloseEvent} variant="outlined" color="primary">
                                Cancel
                        </Button>
                        </DialogActions>
                    </Grid>
                </Dialog>
            </div>
        </>
    }
}
export default connect((state) => ({
    store: state
}))(FormPopUp);
