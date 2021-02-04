import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Button, Box, TextField } from '@material-ui/core'
import { Search, RotateLeft } from '@material-ui/icons'
import DropDownSelect from '../../../../global/dropDownSelect'
import { updateFormQuery } from '../../../../global/table/table.actionCreators'
import { queryData } from '../../../../global/table/table.actions'
import styled from 'styled-components'
const BorderWrapper = styled(Box)`
    background: white
`
function QueryForm(props){
    const dispatch = useDispatch()
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage, query } = tableStates
    const { apiLink } = props  
    const initialState = {
        Name__icontains : '',
        Email__icontains : '',
        Organization__icontains : '',
        RoleValidity : '',
    }
    const [ formData, setFormData ] = useState (initialState);
    let fetchApiData = {
        currentPage : currentPage,
        perPage : perPage,
        project : "1"
    }
    const searchQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(formData)
        dispatch( updateFormQuery (formData))
        dispatch( queryData ( apiLink, fetchApiData ))
    }
    const resetQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(initialState)
        setFormData(initialState)
        dispatch( updateFormQuery (initialState))
        dispatch( queryData ( apiLink, fetchApiData ))
    }
    // useEffect(()=>{
        
    // },[])
    return(
        <BorderWrapper pt={3} mb ={3}>
            <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={9} lg={9} xl={9} >
                    <Grid container spacing={0}>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Box m={2}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="Name"
                                    value={formData.Name__icontains}
                                    onChange={(e) => setFormData({...formData, 'Name__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={2}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="Email"
                                    value={formData.Email__icontains}
                                    onChange={(e) => setFormData({...formData, 'Email__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={2}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Role Validity"
                                    value={formData.RoleValidity__icontains}
                                    onChange={(e) => setFormData({...formData, 'RoleValidity__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={2}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    label = "Organization"
                                    value={formData.Organization}
                                    onChange={(e) => setFormData({...formData, 'Organization__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container xs={12} sm={12} md={3} lg={3} xl={3} alignContent="center">
                    <Box m={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={ <Search/> }
                            onClick={() => searchQueryHandle()}
                        >
                            Search
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={ <RotateLeft/>}
                            onClick={ () => resetQueryHandle() }
                        >
                            Reset
                        </Button>
                    </Box>
                </Grid>
            
            </Grid>
        </BorderWrapper>
    );
}
export default QueryForm
