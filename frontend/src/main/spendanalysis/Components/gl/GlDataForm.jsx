import { connect } from "react-redux";
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { updateData, postData } from '../../../../global/table/table.actions'
function FormPopUp(props){
    const { actionType, formData, formState, formCloseEvent, updateDataFunction, apiLink , table } = props
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage, query} = tableStates

    const initialState = {
        LEDGER : '',
        LEDGER_DESC : '',
        STATE : '',
        REGION : '',
        DIVISION : '',
        BUSINESS : ''
    }
    const [ popupFormData, setPopupFormData ] =  useState(initialState)
    const credentials = apiLink
    const dispatch = useDispatch()
    let updateApidata = {
        pk : formData.pk,
        payload : JSON.stringify(popupFormData),
    }
    let postDataApi = {
        payload : JSON.stringify(popupFormData),
        project : "1",
    }
    let fetchApiData = {
        query : JSON.stringify(query),
        currentPage : currentPage,
        perPage : perPage,
        project : "1"
    }
    const handleSave = () => {
        if (actionType == "Edit") {
            dispatch( updateData(
                apiLink, updateApidata, fetchApiData
            ));
        }
        else {
            dispatch( postData(
                apiLink, postDataApi, fetchApiData
            ));
        }
        formCloseEvent()
    }
    useEffect( () => {
        if(actionType=="Edit"){
            let updatedData = {}
            Object.keys(initialState).map((element)=>{
                updatedData[element] = formData.fields[element]
            })
            setPopupFormData(updatedData)
        }
    }, [] )
    const textFieldId = 'outlined-basic'
    const textFieldVarient = 'outlined'
    return(
        
        <>
            <div>
                <Dialog open={formState} onClose={formCloseEvent} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            <Box >{actionType} { table }
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
                                        label="LEDGER"
                                        multiline
                                        value={popupFormData.LEDGER}
                                        onChange={(e) => setPopupFormData({...popupFormData, 'LEDGER' : e.target.value})}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="LEDGER_DESC"
                                        value={popupFormData.LEDGER_DESC}
                                        onChange={(e) => setPopupFormData({...popupFormData, 'LEDGER_DESC' : e.target.value})}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="STATE"
                                        value={popupFormData.STATE}
                                        onChange={(e) => setPopupFormData({...popupFormData, 'STATE' : e.target.value})}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="REGION"
                                        value={popupFormData.REGION}
                                        onChange={(e) => setPopupFormData({...popupFormData, 'REGION' : e.target.value})}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="DIVISION"
                                        value={popupFormData.DIVISION}
                                        onChange={(e) => setPopupFormData({...popupFormData, 'DIVISION' : e.target.value})}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="BUSINESS"
                                        value={popupFormData.BUSINESS}
                                        onChange={(e) => setPopupFormData({...popupFormData, 'BUSINESS' : e.target.value})}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Grid container justify="center">
                        <DialogActions position="centre">
                            <Button onClick={() => handleSave()} variant="contained" color="primary">
                                {actionType=="Edit"?"Update":"Save"}
                        </Button>
                            <Button onClick={formCloseEvent} variant={ textFieldVarient } color="primary">
                                Cancel
                        </Button>
                        </DialogActions>
                    </Grid>
                </Dialog>
            </div>
        </>
    )
}

export default FormPopUp;
