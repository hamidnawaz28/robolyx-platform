import { connect } from "react-redux";

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

import {
    SERVER_URL,
    TAXONOMY_DATA,
} from "./constants";

const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});
function FormPopUp(props){
    const { actionType, formData, formState, formCloseEvent, updateDataFunction } = props
    const { CATEGORY_LEVEL_ONE, setCategoryLevelOne } = React.useState('')
    const { CATEGORY_LEVEL_TWO, setCategoryLevelTwo } = React.useState('')
    const { CATEGORY_LEVEL_THREE, setCategoryLevelThree } = React.useState('')
    const { CATEGORY_LEVEL_FOUR, setCategoryLevelFour } = React.useState('')
    const { CATEGORY_LEVEL_FIVE, setCategoryLevelFive } = React.useState('')

    const handleSave = () => {
        let payload =  {
                CATEGORY_LEVEL_ONE,
                CATEGORY_LEVEL_TWO,
                CATEGORY_LEVEL_THREE,
                CATEGORY_LEVEL_FOUR,
                CATEGORY_LEVEL_FIVE
        }
        if (actionType=="Edit") {
            let pk = formData.pk;
            axios
                .put(SERVER_URL + TAXONOMY_DATA,
                    { 
                        params :
                        {
                            pk : pk ,
                            payload : JSON.stringify(payload)
                        }
                    })
                .then(res => {
                    updateDataFunction()
                    alert("Updated Successfully")
                }
                )
                .catch(err => console.log(err));
        }
        else {
            axios
                .post(SERVER_URL + TAXONOMY_DATA,
                    { 
                        params:
                        {
                            // currentUserProject: currentUserProject,
                            query: JSON.stringify(payload)
                        }
                    })
                .then(res => {
                    updateDataFunction()
                    alert("Added Successfully")
                }
                )
                .catch(err => console.log(err));
        }
    }
    useEffect( () => {
        if(actionType=="Edit"){
            let catagories = ["ONE","TWO","THREE","FOUR","FIVE"]
            for(let key in catagories){
                // this.setState({["CATAGORY_LEVEL_"+catagories[key]] : formData.fields["CATAGORY_LEVEL_"+catagories[key]]})
            }
        }
    }, [] )
    return(
        <>
            <div>
                <Dialog open={formState} onClose={formCloseEvent} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            <Box >{actionType} Taxonomy
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
                                        label="Category Level 1"
                                        multiline
                                        value ={CATEGORY_LEVEL_ONE}
                                        onChange={(e)=>setCategoryLevelOne(e.target.value)}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        label="Category Level 2"
                                        multiline
                                        value ={CATEGORY_LEVEL_TWO}
                                        onChange={(e)=>setCategoryLevelTwo(e.target.value)}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        label="Category Level 3"
                                        multiline
                                        value ={CATEGORY_LEVEL_THREE}
                                        onChange={(e)=>setCategoryLevelThree(e.target.value)}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        label="Category Level 4"
                                        multiline
                                        value ={CATEGORY_LEVEL_FOUR}
                                        onChange={(e)=>setCategoryLevelFour(e.target.value)}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        label="Category Level 5"
                                        multiline
                                        value ={CATEGORY_LEVEL_FIVE}
                                        onChange={(e)=>setCategoryLevelFive(e.target.value)}
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
                            <Button onClick={formCloseEvent} variant="outlined" color="primary">
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
