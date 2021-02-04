import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Button, Box, TextField } from '@material-ui/core'
import { Search, RotateLeft } from '@material-ui/icons'
import DropDownSelect from '../../../../global/dropDownSelect'
import { updateFormQuery } from '../../../../global/table/table.actionCreators'
import { queryData } from '../../../../global/table/table.actions'
import { updateTaxonomyCategories } from '../../../../global/utils/utils.actions.js'
import styled from 'styled-components'
const BorderWrapper = styled(Box)`
    background: white
`
function InvoiceQueryForm(props){
    const dispatch = useDispatch()
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage, query } = tableStates
    const { apiLink } = props  
    const initialState = {
        DATE_ENTERED: '',
        MappingName__icontains: '',
        DataTableReference: ''
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
                                    label="Data Table"
                                    value={formData.DataTableReference}
                                    onChange={(e) => setFormData({...formData, 'DataTableReference' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="Mapping Name"
                                    value={formData.MappingName__icontains}
                                    onChange={(e) => setFormData({...formData, 'MappingName__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="DATE_ENTERED"
                                    value={formData.DATE_ENTERED}
                                    onChange={(e) => setFormData({...formData, 'DATE_ENTERED' : e.target.value})}
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
export default InvoiceQueryForm
