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
function PoQueryForm(props){
    const dispatch = useDispatch()
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage, query } = tableStates
    const { apiLink } = props  
    const initialState = {
        "SUPPLIER_NAME__icontains" : '',
        "LOCATION_DESC__icontains" : '',
        "PO_NUMBER__icontains" : '',
        "BUYER__icontains" : '',
        "STATE__icontains": '',
        "BUSINESS__icontains" : '',
        "PO_CREATION_DATE__gte" : '',
        "PO_CREATION_DATE__lte" : ''
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
                    <Grid xs={2} sm={2} md={2} lg={2} xl={2} >
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
                        <Grid xs={2} sm={2} md={2} lg={2} xl={2} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="LOCATION_DESC"
                                    value={formData.LOCATION_DESC__icontains}
                                    onChange={(e) => setFormData({...formData, 'LOCATION_DESC__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={2} md={2} lg={2} xl={2} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="PO_NUMBER"
                                    value={formData.PO_NUMBER__icontains}
                                    onChange={(e) => setFormData({...formData, 'PO_NUMBER__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={2} md={2} lg={2} xl={2} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    label = "BUYER"
                                    value={formData.BUYER__icontains}
                                    onChange={(e) => setFormData({...formData, 'BUYER__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={2} md={2} lg={2} xl={2} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="STATE"
                                    value={formData.STATE__icontains}
                                    onChange={(e) => setFormData({...formData, 'STATE__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={2} sm={2} md={2} lg={2} xl={2} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="BUSINESS"
                                    value={formData.BUSINESS__icontains}
                                    onChange={(e) => setFormData({...formData, 'BUSINESS__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1} pt ={2}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style ={{width:"100%"}}
                                        label="PO_CREATION_DATE"
                                        value={formData.PO_CREATION_DATE__gte}
                                        onChange={(e) => setFormData({...formData, 'PO_CREATION_DATE__gte' : e.target.value})}
                                    />
                                </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1} pt ={2}>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style ={{width:"100%"}}
                                        label="PO_CREATION_DATE"
                                        value={formData.PO_CREATION_DATE__lte}
                                        onChange={(e) => setFormData({...formData, 'PO_CREATION_DATE__lte' : e.target.value})}
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
export default PoQueryForm
