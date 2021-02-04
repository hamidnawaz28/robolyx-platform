import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Button, Box } from '@material-ui/core'
import { Search, RotateLeft } from '@material-ui/icons'
import DropDownSelect from '../../../../global/dropDownSelect'
import { updateFormQuery } from '../../../../global/table/table.actionCreators'
import { queryData } from '../../../../global/table/table.actions'
import { updateTaxonomyCategories } from '../../../../global/utils/utils.actions.js'
import styled from 'styled-components'
const BorderWrapper = styled(Box)`
    background: white
`
function TaxonomyQueryForm(props){
    const dispatch = useDispatch()
    const tableStates = useSelector(state => state.tableStates)
    const categoriesData  = useSelector(state =>state.utilsData.categoriesData)
    const { perPage, currentPage, query} = tableStates
    const { apiLink } = props  
    const initialState = {
        "CATEGORY_LEVEL_ONE": '',
        "CATEGORY_LEVEL_TWO": '',
        "CATEGORY_LEVEL_THREE": '',
        "CATEGORY_LEVEL_FOUR": '',
        "CATEGORY_LEVEL_FIVE": '',
    }
    const [ categories, setCategories ] = useState (initialState);
    const credentials = apiLink
    let fetchApiData = {
        currentPage : currentPage,
        perPage : perPage,
        project : "1"
    }
    const searchQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(categories)
        dispatch( updateFormQuery (categories))
        dispatch( queryData ( credentials, fetchApiData ))
    }
    const resetQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(initialState)
        setCategories(initialState)
        dispatch( updateFormQuery (initialState))
        dispatch( queryData ( credentials, fetchApiData ))
    }
    useEffect(()=>{
        const apiData = {
            project : "1"
        }
        dispatch(updateTaxonomyCategories(apiData))
    },[])
    return(
        <BorderWrapper  pt={3} mb ={3}>
            <Grid container spacing={0}>
                <Grid xs={6} sm={6} md={10} lg={10} xl={10} >
                    <Grid container spacing={0}>
                        {Object.keys(categories).map(key =>
                            <Grid xs={6} sm={6} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <DropDownSelect
                                        dataList={categoriesData[key]}
                                        label={key}
                                        DataType="ListDataWithCatagory"
                                        selectedValue={categories[key]}
                                        catagoryLevel={key}
                                        onChangeEvent={(e) => setCategories({...categories, [key]:e.target.value})}
                                    />
                                </Box>
                            </Grid>
                        )}
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
export default TaxonomyQueryForm