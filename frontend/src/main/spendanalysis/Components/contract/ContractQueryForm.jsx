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
function ContractQueryForm(props){
    const dispatch = useDispatch()
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage, query } = tableStates
    const { apiLink } = props  
    const initialState = {
        SUPPLIER_NAME__icontains : '',
        CONTRACT_NUMBER_icontains : '',
        CONTRACT_TITLE__icontains : '',
        STATUS__icontains : '',
        OWNER__icontains : '',
        CONTRACT_EXPIRY_DATE__gte : '',
        CONTRACT_EXPIRY_DATE__lte : '',
    }
    const [ formData, setFormData ] = useState (initialState);
    const credentials = apiLink
    let fetchApiData = {
        currentPage : currentPage,
        perPage : perPage,
        project : "1"
    }
    const searchQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(formData)
        dispatch( updateFormQuery (formData))
        dispatch( queryData ( credentials, fetchApiData ))
    }
    const resetQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(initialState)
        setFormData(initialState)
        dispatch( updateFormQuery (initialState))
        dispatch( queryData ( credentials, fetchApiData ))
    }
    return(
        <BorderWrapper pt={3} mb ={3}>
            <Grid container spacing={0}>
                <Grid xs={6} sm={6} md={10} lg={10} xl={10} >
                    <Grid container spacing={0}>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="SUPPLIER_NAME"
                                    value={formData.SUPPLIER_NAME__icontains}
                                    onChange={(e) => setFormData({...formData, 'SUPPLIER_NAME__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="CONTRACT_NUMBER"
                                    value={formData.CONTRACT_NUMBER_icontains}
                                    onChange={(e) => setFormData({...formData, 'CONTRACT_NUMBER_icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    label = "CONTRACT_TITLE"
                                    value={formData.CONTRACT_TITLE__icontains}
                                    onChange={(e) => setFormData({...formData, 'CONTRACT_TITLE__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="STATUS"
                                    value={formData.STATUS__icontains}
                                    onChange={(e) => setFormData({...formData, 'STATUS__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1} pt ={3}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="OWNER"
                                    value={formData.OWNER__icontains}
                                    onChange={(e) => setFormData({...formData, 'OWNER__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1} pt ={2}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="CONTRACT_EXPIRY_DATE"
                                    value={formData.CONTRACT_EXPIRY_DATE__gte}
                                    onChange={(e) => setFormData({...formData, 'CONTRACT_EXPIRY_DATE__gte' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1} pt ={3}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="CONTRACT_EXPIRY_DATE"
                                    value={formData.CONTRACT_EXPIRY_DATE__lte}
                                    onChange={(e) => setFormData({...formData, 'CONTRACT_EXPIRY_DATE__lte' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={6} sm={6} md={10} lg={2} xl={2} >
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
export default ContractQueryForm
