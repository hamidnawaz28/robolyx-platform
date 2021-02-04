import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Button, Box, TextField, FormControl, RadioGroup } from '@material-ui/core'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/styles'
import DropDownSelect from '../../../../../global/dropDownSelect'
import { updateFormQuery } from '../../../../../global/table/table.actionCreators'
import { queryData } from '../../../../../global/table/table.actions'
import {
    RULE_ENGINE_OPERATORS,
    PRIORITY_LIST,
    DATA_ATTRIBUTES_WITH_TYPE
} from "../../../../../global/constants";
import {
    updateTaxonomyCategories,
    updateDraftRulesPK,
    updateImplementedRulesPK
} from '../../../../../global/utils/utils.actions.js'
const BorderWrapper = styled(Box)`
    background: white
`
const useStyles = makeStyles({
    fieldSearchWrap: {
        paddingTop: "7px"
    },
    fieldSearchItems: {
        borderRight: "2px solid rgba(0, 0, 0, 0.1)",
        paddingLeft: "10px",
        paddingRight: "10px"
    },
    searchActions: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%"
    }
});
function InvoiceQueryForm(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const tableStates = useSelector(state => state.tableStates)
    const taxonomyCategories = useSelector(state => state.utilsData.categoriesData)
    const implementedRulesPk = useSelector(state => state.utilsData.implementedRulesPk)
    const draftedRulesPk = useSelector(state => state.utilsData.draftedRulesPk)
    const { perPage, currentPage, query } = tableStates
    const { apiLink, ruleStatus, isStatusSwitchEn } = props
    const initialState = {
        CATEGORY_LEVEL_ONE__icontains: '',
        CATEGORY_LEVEL_TWO__icontains: '',
        CATEGORY_LEVEL_THREE__icontains: '',
        CATEGORY_LEVEL_FOUR__icontains: '',
        CATEGORY_LEVEL_FIVE__icontains: '',
        PRIORITY: '',
        pk: '',
        FIELD_1: '',
        OPERATOR_1: '',
        VALUE_1: '',
        FIELD_2: '',
        OPERATOR_2: '',
        VALUE_2: '',
        FIELD_3: '',
        OPERATOR_3: '',
        VALUE_3: '',
        STATUS: ruleStatus
    }
    const typeInit = {
        FIELD_1_Type: 'string',
        FIELD_2_Type: 'string',
        FIELD_3_Type: 'string'
    }
    const [formData, setFormData] = useState(initialState);
    const [fieldType, setFieldType] = useState(typeInit)
    const [categoryLevel, setCategoryLevel] = useState(3)
    let fetchApiData = {
        currentPage: currentPage,
        perPage: perPage,
        project: "1"
    }
    const searchQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(formData)
        dispatch(updateFormQuery(formData))
        dispatch(queryData(apiLink, fetchApiData))
    }
    const resetQueryHandle = () => {
        fetchApiData["query"] = JSON.stringify(initialState)
        setCategoryLevel(3)
        setFormData(initialState)
        dispatch(updateFormQuery(initialState))
        dispatch(queryData(apiLink, fetchApiData))
    }
    const queryFieldSelectHandle = (e, field) => {
        let selectedIndex = e.target.selectedIndex;
        let dataType = e.target.options[selectedIndex].getAttribute("dataType");
        setFieldType({ ...fieldType, [field + "_Type"]: dataType })
        let value = e.target.value
        let queryData = formData;
        let newQueryData = {}
        for (let queryItems in queryData) {
            queryItems == field ? newQueryData[queryItems] = value : newQueryData[queryItems] = queryData[queryItems]
        }
        setFormData(newQueryData)
    }
    const statusChange = (status) => {
        let data = { ...formData, STATUS: status }
        setFormData(data)
        fetchApiData["query"] = JSON.stringify(data)
        dispatch(updateFormQuery(formData))
        dispatch(queryData(apiLink, fetchApiData))
    }
    const CATAGORIES = { 1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR", 5: "FIVE" }
    let levelArray = [];
    for (let index = 0; index < categoryLevel; index++) {
        levelArray.push(index + 1)
    }
    useEffect(() => {
        dispatch(updateTaxonomyCategories())
        dispatch(updateDraftRulesPK())
        dispatch(updateImplementedRulesPK())
    }, [])
    return (
        <BorderWrapper pt={3} mb={3}>
            {
                isStatusSwitchEn && <Box pl={4}>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={formData.STATUS}>
                            <Button
                                color={formData.STATUS == "draft" ? "secondary" : "default"}
                                variant="contained"
                                style={{ border: '1px solid #232f3e', borderRight: '0px', borderRadius: '0px ' }}
                                children="Draft"
                                onClick={() => statusChange('draft')}
                            />
                            <Button
                                color={formData.STATUS == "implemented" ? "secondary" : "default"}
                                variant="contained"
                                style={{ border: '1px solid #232f3e', borderLeft: '0px', borderRadius: '0px' }}
                                children="Implemented"
                                onClick={() => statusChange('implemented')}
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            }

            <Grid container spacing={0}>

                <Grid container spacing={0} xs={6} sm={6} md={9} lg={9} xl={9}>

                    <Grid xs={6} sm={6} md={6} lg={1} xl={1} style={{ width: "100%" }}>
                        <Box m={1} pl={3}>
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
                                    selectedValue={formData[`CATEGORY_LEVEL_${CATAGORIES[key]}__icontains`]}
                                    onChangeEvent={(e) => setFormData({ ...formData, [`CATEGORY_LEVEL_${CATAGORIES[key]}__icontains`]: e.target.value })}
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

                <Grid xs={6} sm={6} md={3} lg={3} xl={3}>
                    <Box m={1}>
                        <DropDownSelect
                            // dataList={this.state.rulesData}
                            dataList={formData.STATUS == 'draft' ? draftedRulesPk : implementedRulesPk}
                            label="Rule ID"
                            DataType="ListData"
                            selectedValue={formData.pk}
                            onChangeEvent={(e) => setFormData({ ...formData, ['pk']: e.target.value })}
                        />
                    </Box>
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
                                startIcon={<SearchIcon />}
                                onClick={() => searchQueryHandle()}
                                style={{ margin: "0px 10px 0px 0px" }}
                            >
                                Search
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
        </BorderWrapper>
    );
}
export default InvoiceQueryForm
