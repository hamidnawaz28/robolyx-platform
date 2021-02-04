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
        INVOICE_ID__icontains : '',
        INV_DATE__gt : '',
        INV_DATE__lt : '',
        INV_NUMBER__icontains : '',
        VENDOR_NAME__icontains : '',
        GENERAL_LEDGER__icontains : '',
        LOCATION__icontains : '',
        PO_NUMBER__icontains : ''
        // CATEGORY_LEVEL_ONE : '',
        // CATEGORY_LEVEL_TWO : '',
        // CATEGORY_LEVEL_THREE : '',
        // CATEGORY_LEVEL_FOUR : '',
        // CATEGORY_LEVEL_FIVE : ''
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
    // useEffect(()=>{
        
    // },[])
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
                                    label="INVOICE_ID"
                                    value={formData.INVOICE_ID__icontains}
                                    onChange={(e) => setFormData({...formData, 'INVOICE_ID__icontains' : e.target.value})}
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
                                    label="INV_DATE"
                                    value={formData.INV_DATE__gt}
                                    onChange={(e) => setFormData({...formData, 'INV_DATE__gt' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="INV_NUMBER"
                                    value={formData.INV_NUMBER__icontains}
                                    onChange={(e) => setFormData({...formData, 'INV_NUMBER__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style = {{width:"100%"}}
                                    label = "VENDOR_NAME"
                                    value={formData.VENDOR_NAME__icontains}
                                    onChange={(e) => setFormData({...formData, 'VENDOR_NAME__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="GENERAL_LEDGER"
                                    value={formData.GENERAL_LEDGER__icontains}
                                    onChange={(e) => setFormData({...formData, 'GENERAL_LEDGER__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                            <Box m={1}>
                                <TextField
                                    id="outlined-basic" 
                                    variant="outlined"
                                    style ={{width:"100%"}}
                                    label="LOCATION"
                                    value={formData.LOCATION__icontains}
                                    onChange={(e) => setFormData({...formData, 'LOCATION__icontains' : e.target.value})}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
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
