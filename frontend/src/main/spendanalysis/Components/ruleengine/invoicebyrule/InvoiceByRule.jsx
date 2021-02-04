import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import IconButton from '@material-ui/core/IconButton';
import {
    RULE_ENGINE_OPERATORS,
    PRIORITY_LIST,
    SERVER_URL,
    DATA_COLUMNS,
    TAXONOMY_DATA,
    RULE_ENGINE,
    DATA_ATTRIBUTES_WITH_TYPE,
    RULE_ENGINE_DATA,
    INVOICE_BY_RULE,
    DATA_ATTRIBUTES_FOR_COLUMNS,
} from "../../../../../global/constants";
import { queryData } from '../../../../../global/table/table.actions'
import Table from '../../../../../global/table/table.table'
import { 
    updateTaxonomyCategories,
    updateDraftRulesPK,
    updateImplementedRulesPK
 } from '../../../../../global/utils/utils.actions.js'
import DropDownSelect from "../../../../../global/dropDownSelect"
function InvoiceByRule() {
    //////////////////////////////////////Constants//////////////////////
    const CATAGORIES = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
    ////////////////////////////////////// Page States//////////////////////
    let initialState = {
        CATEGORY_LEVEL_ONE: '',
        CATEGORY_LEVEL_TWO: '',
        CATEGORY_LEVEL_THREE: '',
        CATEGORY_LEVEL_FOUR: '',
        CATEGORY_LEVEL_FIVE: '',
        pk: ''
    }
    const [formData, setFormData] = React.useState(initialState);
    const categoriesData = useSelector(state => state.utilsData.categoriesData)
    const implementedRulesPk = useSelector(state => state.utilsData.implementedRulesPk)
    const draftedRulesPk = useSelector(state => state.utilsData.draftedRulesPk)
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage } = tableStates
    const dispatch = useDispatch()
    /////////////////////////////////////////// Form Events/////////////////////////////
    let fetchApiData = {
        currentPage: currentPage,
        perPage: perPage,
        project: '1'
    }
    const resetQueryHandle = () => {
        setFormData(initialState)
        fetchApiData["query"] = JSON.stringify(initialState)
        dispatch(queryData(INVOICE_BY_RULE, fetchApiData))
    }
    const searchQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(formData)
        dispatch(queryData(INVOICE_BY_RULE, fetchApiData))
    }
    const ruleEvent = (e) => {
        fetchApiData["query"] = JSON.stringify(formData)
        formData.pk != ''?
        dispatch(queryData(INVOICE_BY_RULE, fetchApiData)):alert("Select Rule")
    }
    //////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////Life Cycle Events/////////////////////////////
    useEffect(() => {
        dispatch(updateTaxonomyCategories())
        dispatch(updateDraftRulesPK())
        dispatch(updateImplementedRulesPK())
    }, [])
    return (
        <>  
            <Box p={1} style = {{backgroundColor :"white" , marginBottom :"10px"}}>
                <Box p={1}>
                    <Grid container spacing={0}>
                        <Grid style={{ width: "100px" }}>
                            <DropDownSelect
                                dataList={implementedRulesPk}
                                label={"Rules"}
                                DataType="ListData"
                                selectedValue={formData.pk}
                                onChangeEvent=
                                {(e) => setFormData({...initialState,
                                    pk: e.target.value})}
                            />
                        </Grid>
                        <Grid>
                            <IconButton aria-label="search" variant="outlined"  color="primary">
                                <SearchIcon onClick = {(e) => ruleEvent(e)}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid container spacing={0}>
                        <Grid container xs={6} sm={6} md={9} lg={9} xl={9}>
                            {CATAGORIES.map((item, index) =>
                                <Grid xs={6} sm={6} md={2} lg={2} xl={2} >
                                    <Box m={1}>
                                        <DropDownSelect
                                            dataList={categoriesData[`CATEGORY_LEVEL_${item}`]}
                                            label={"LEVEL_" + (index + 1)}
                                            DataType="ListData"
                                            selectedValue={formData[`CATEGORY_LEVEL_${item}`]}
                                            onChangeEvent={(e) => setFormData({ ...formData, [`CATEGORY_LEVEL_${item}`]: e.target.value, pk: '' })}
                                        />
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                        <Grid container xs={6} sm={6} md={3} lg={3} xl={3}>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ margin: "10px 10px 10px 10px" }}
                                    startIcon={<SearchIcon />}
                                    onClick={(e) => searchQueryHandle()}
                                >
                                    Search
                                </Button>
                            </Grid>
                            <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ margin: "10px 10px 10px 10px" }}
                                    startIcon={<RotateLeftIcon />}
                                    onClick={() => resetQueryHandle()}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Table
                tableHeaders={DATA_ATTRIBUTES_FOR_COLUMNS}
                selectOption={false}
                paginationOption={true}
                apiLink={INVOICE_BY_RULE}
            />
        </>
    );
}
export default InvoiceByRule