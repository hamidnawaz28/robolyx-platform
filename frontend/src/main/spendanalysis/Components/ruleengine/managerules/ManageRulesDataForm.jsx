import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Search, RotateLeft } from '@material-ui/icons'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid, 
    Button, 
    Box, 
    TextField, 
    FormControl, 
    RadioGroup, 
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem
} from '@material-ui/core'
import {
    RULE_ENGINE_OPERATORS,
    PRIORITY_LIST,
    SERVER_URL,
    DATA_COLUMNS,
    TAXONOMY_DATA,
    DATA_ATTRIBUTES_WITH_TYPE,
    DATA_ATTRIBUTES_FOR_COLUMNS,
    RULE_ENGINE_DATA
} from "../../../../../global/constants";
import { updateData, postData } from '../../../../../global/table/table.actions'
import DropDownSelect from '../../../../../global/dropDownSelect'
import { updateFormQuery } from '../../../../../global/table/table.actionCreators'
import { queryData } from '../../../../../global/table/table.actions'
import { fetchTestRuleData } from './Actions'
import TableData from "../../../../../global/TableComplete"
const BorderWrapper = styled(Box)`
    background: white
`
const useStyles = makeStyles({
    fieldSearchWrap : {
        paddingTop :"7px"
    },
    fieldSearchItems : {
        borderRight : "2px solid rgba(0, 0, 0, 0.1)",
        paddingLeft : "10px",
        paddingRight : "10px"
    },
    searchActions : {
        justifyContent : "center", 
        alignItems : "center",
        display : "flex",
        height : "100%"
    }
});
function FormPopUp(props) {
    const { actionType, formData : editFormData, formState, formCloseEvent, updateDataFunction, apiLink, table } = props
    const tableStates = useSelector(state => state.tableStates)
    const initialState = {
        CATEGORY_LEVEL_ONE: '',
        CATEGORY_LEVEL_TWO: '',
        CATEGORY_LEVEL_THREE: '',
        CATEGORY_LEVEL_FOUR: '',
        CATEGORY_LEVEL_FIVE: '',
        PRIORITY: '',
        FIELD_1: '',
        OPERATOR_1: '',
        VALUE_1: '',
        FIELD_2: '',
        OPERATOR_2: '',
        VALUE_2: '',
        FIELD_3: '',
        OPERATOR_3: '',
        VALUE_3: ''
    }
    const typeInit = {
        FIELD_1_Type: 'string',
        FIELD_2_Type: 'string',
        FIELD_3_Type: 'string'
    }
    const [formData, setFormData] = useState(initialState)
    const [fieldType, setFieldType] = useState(typeInit)
    const [categoryLevel, setCategoryLevel] = useState(3)

    const [tableData, setTableData] = useState({})
    const [tableTotalRows, setTotalRows] = useState(0)
    const [tablePerPage, setPerPage] = useState(5)
    const [tableCurrentPage, setCurrentPage] = useState(0)
    let fetchApiData = {
        query : JSON.stringify(formData),
        currentPage: tableCurrentPage,
        perPage: tablePerPage,
        project: "1"
    }
    const changePageHandle = (e) =>{
        let currPage = tableCurrentPage
        e.currentTarget.ariaLabel == "Next page" ? currPage =+ 1 : currPage =- 1
        setCurrentPage(currPage)
        fetchApiData['currentPage'] = currPage
        dispatch( fetchTestRuleData (fetchApiData, getData))
    }
    const changeRowsPerPageHandle = (e)  =>{
        setPerPage(parseInt(e.target.value))
        setCurrentPage(0)
        fetchApiData['currentPage'] = 0
        fetchApiData['perPage'] = parseInt(e.target.value)
        dispatch( fetchTestRuleData (fetchApiData, getData))
    }
                            
    const dispatch = useDispatch()
    const taxonomyCategories = useSelector(state => state.utilsData.categoriesData)
    const classes = useStyles()
    
    
    const getData = (data) =>{
        setTotalRows(data.count)
        setTableData(JSON.parse(data.queryData))
    }
    const testRuleHandle = () => {
        fetchApiData["query"] = JSON.stringify(formData)
        dispatch( fetchTestRuleData (fetchApiData, getData))
    }
    const resetQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(initialState)
        setCategoryLevel(3)
        setFormData(initialState)
        dispatch( fetchTestRuleData (initialState))
    }
    const queryFieldSelectHandle = (e, field) => {
        let selectedIndex = e.target.selectedIndex;
        let dataType = e.target.options[selectedIndex].getAttribute("dataType");
        setFieldType({...fieldType ,[field + "_Type"]: dataType })
        let value = e.target.value
        let queryData = formData;
        let newQueryData = {}
        for (let queryItems in queryData) {
            queryItems == field ? newQueryData[queryItems] = value : newQueryData[queryItems] = queryData[queryItems]
        }
        setFormData(newQueryData)
    }

    let updateApidata = {
        pk: editFormData.pk,
        payload: JSON.stringify(formData),
    }
    let postDataApi = {
        payload: JSON.stringify(formData),
        project: "1",
    }
    const handleSave = () => {
        fetchApiData["query"] = JSON.stringify({})
        if (actionType == "Edit") {
            dispatch(updateData(
                apiLink, updateApidata, fetchApiData
            ));
        }
        else {
            dispatch(postData(
                apiLink, postDataApi, fetchApiData
            ));
        }
        formCloseEvent()
    }
    useEffect(() => {
        if (actionType == "Edit") {
            let updatedData = {}
            Object.keys(initialState).map((element) => {
                updatedData[element] = editFormData.fields[element]
            })
            setFormData(updatedData)
        }
    }, [])
    const textFieldId = 'outlined-basic'
    const textFieldVarient = 'outlined'
    const CATAGORIES = { 1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR", 5: "FIVE" }
    let levelArray = [];
    for (let index = 0; index < categoryLevel; index++) {
        levelArray.push(index + 1)
    }
    return (

        <>
            <div>
                <Dialog 
                open={formState} 
                onClose={formCloseEvent} 
                aria-labelledby="form-dialog-title"
                fullWidth = { true }
                maxWidth = 'md'
                >
                    <DialogTitle id="form-dialog-title">
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            <Box >
                                {actionType} {table}
                            </Box>
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={0}>
                            <Grid xs={6} sm={6} md={9} lg={9} xl={9}>
                                <Grid container spacing={0}>
                                    <Grid xs={6} sm={6} md={6} lg={1} xl={1} style={{ width: "100%" }}>
                                        <Box m={1}>
                                            <DropDownSelect
                                                dataList={[1, 2, 3, 4, 5]}
                                                label={"Levels"}
                                                DataType="ListData"
                                                selectedValue={categoryLevel}
                                                onChangeEvent={(e) => setCategoryLevel(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>

                                    {levelArray.map(key =>
                                        <Grid xs={6} sm={6} md={3} lg={3} xl={3} >
                                            <Box m={1}>
                                                <DropDownSelect
                                                    // dataList={this.state["CATAGORY_LEVEL_" + CATAGORIES[key] + "_Data"]}
                                                    dataList={taxonomyCategories[`CATEGORY_LEVEL_${CATAGORIES[key]}`]}
                                                    label={"Category Level " + key}
                                                    DataType="ListData"
                                                    catagoryLevel={key}
                                                    selectedValue={formData[`CATEGORY_LEVEL_${CATAGORIES[key]}`]}
                                                    onChangeEvent={(e) => setFormData({ ...formData, [`CATEGORY_LEVEL_${CATAGORIES[key]}`]: e.target.value })}
                                                />
                                            </Box>
                                        </Grid>
                                    )}
                                    <Grid xs={6} sm={6} md={6} lg={2} xl={2} style={{ width: "100%" }}>
                                        <Box m={1}>
                                            <DropDownSelect
                                                dataList={PRIORITY_LIST}
                                                label="Priority"
                                                DataType="ListData"
                                                selectedValue={formData.PRIORITY}
                                                onChangeEvent={(e) => setFormData({ ...formData, ['PRIORITY']: e.target.value })}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid xs={6} sm={6} md={10} lg={9} xl={9} >
                                    <Grid container spacing={0} className={classes.fieldSearchWrap}>
                                        {
                                            [1, 2, 3].map(item =>
                                                <Grid xs={12} sm={12} md={4} lg={4} xl={4} className={classes.fieldSearchItems}>
                                                    <Box m={1}>
                                                        <DropDownSelect
                                                            dataList={DATA_ATTRIBUTES_WITH_TYPE}
                                                            label={"Field_" + item}
                                                            DataType="GroupDataWithType"
                                                            selectedValue={formData["FIELD_" + item]}
                                                            onChangeEvent={(event) => queryFieldSelectHandle(event, "FIELD_" + item)}
                                                        />
                                                    </Box>
                                                    <Box m={1}>
                                                        <DropDownSelect
                                                            dataList={RULE_ENGINE_OPERATORS[fieldType["FIELD_" + item + "_Type"]]}
                                                            label={"Operator_" + item}
                                                            DataType="ListData"
                                                            selectedValue={formData["OPERATOR_" + item]}
                                                            onChangeEvent={(e) => setFormData({ ...formData, ["OPERATOR_" + item]: e.target.value })}
                                                        /></Box>
                                                    <Box m={1}>
                                                        <TextField
                                                            label={"Value_" + item}
                                                            type={fieldType["FIELD_" + item + "_Type"]}
                                                            id={fieldType["FIELD_" + item + "_Type"]}
                                                            value={formData["VALUE_" + item]}
                                                            style={{ width: "100%" }}
                                                            // InputLabelProps={{
                                                            //     shrink: true,
                                                            // }}
                                                            onChange={(e) => setFormData({ ...formData, ["VALUE_" + item]: e.target.value })}
                                                        />
                                                    </Box>
                                                </Grid>

                                            )
                                        }
                                    </Grid>
                                </Grid>
                                <Grid xs={6} sm={6} md={10} lg={3} xl={3} >
                                    <Box m={1} className={classes.searchActions}>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            // startIcon={<AddIcon />}
                                            startIcon={<Search />}
                                            onClick={() => testRuleHandle()}
                                            style={{ margin: "0px 10px 0px 0px" }}
                                        >
                                            Test
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => resetQueryHandle()}
                                            style={{ margin: "0px 10px 0px 0px" }}
                                        >
                                            Reset
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            tableData.length && 
                                <TableData
                                    TableHeaderData={DATA_ATTRIBUTES_FOR_COLUMNS}
                                    TableDataList={tableData}
                                    totalRows={tableTotalRows}
                                    perPage={tablePerPage}
                                    currentPage={tableCurrentPage}
                                    changePageEvent={(e) => changePageHandle(e)}
                                    changeRowsPerPageEvent={(e) => changeRowsPerPageHandle(e)}
                                    selectOption={false}
                                    paginationOption={true}
                                />
                        }
                    </DialogContent>
                    <Grid container justify="center">
                        <DialogActions position="centre">
                            <Button onClick={() => handleSave()} variant="contained" color="primary">
                                {actionType == "Edit" ? "Update" : "Save"}
                            </Button>
                            <Button onClick={formCloseEvent} variant={textFieldVarient} color="primary">
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
