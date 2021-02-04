import React, { useState, useEffect } from 'react'
import TableData from "../../../global/TableComplete"
import DropDownSelect from "../../../global/dropDownSelect"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
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
} from "../../../global/constants";
function InvoiceByRule() {
    //////////////////////////////////////Constants//////////////////////
    const CATAGORIES = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
    ////////////////////////////////////// Page States//////////////////////
    const [ruleID, setRuleID] = React.useState("");
    const [rulesList, setRulesList] = React.useState([]);
    const [catagories, setCatagory] = React.useState({
        CATAGORY_LEVEL_ONE: '',
        CATAGORY_LEVEL_TWO: '',
        CATAGORY_LEVEL_THREE: '',
        CATAGORY_LEVEL_FOUR: '',
        CATAGORY_LEVEL_FIVE: ''
    });
    const [catagoriesData, setCatagoryData] = React.useState({
        CATAGORY_LEVEL_ONE_Data: [],
        CATAGORY_LEVEL_TWO_Data: [],
        CATAGORY_LEVEL_THREE_Data: [],
        CATAGORY_LEVEL_FOUR_Data: [],
        CATAGORY_LEVEL_FIVE_Data: []
    });
    ////////////////////////////////////// Table States//////////////////////
    const [tableData, setTableData] = React.useState({})
    const [tableTotalRows, setTableTotalRows] = React.useState(0)
    const [tablePerPage, setTablePerPage] = React.useState(5)
    const [tableCurrentPage, setTableCurrentPage] = React.useState(0)
    const [selectAllStatus, setSelectAllStatus] = React.useState(false)
    ////////////////////////////////////////////Query Function///////////////////////////
    const queryData = (currentPage, perPage) => {
        let currentUserProject = "1";
        let query = catagories
        query['ruleID'] = ruleID
        axios
            .get(SERVER_URL + INVOICE_BY_RULE, {
                params:
                {
                    UserProjectReference: currentUserProject,
                    query: JSON.stringify(query),
                    currentPage: currentPage,
                    perPage: perPage
                }
            })
            .then(res => {
                if (res.data.count != 0) {
                    let queryOutputData = JSON.parse(res.data.queryData)
                    for (let index in queryOutputData) {
                        queryOutputData[index]['IsChecked'] = false
                    }
                    setTableTotalRows(res.data.count)
                    setTableData(queryOutputData)
                }
                else {
                    setTableTotalRows(0)
                    setTableData({})
                }

            }
            )
            .catch(err => console.log(err));
    }
    //////////////////////////////////////Table Functions////////////////////////////////////
    const changePageHandle = (e) => {
        let currentPage = 0;
        e.currentTarget.ariaLabel == "Next page" ? currentPage+=1 : currentPage-=1
        setTableCurrentPage(currentPage)
        queryData(currentPage, tablePerPage)
    }
    const changeRowsPerPageHandle = (e) => {
        let newTablePerPage = e.target.value;
        setTablePerPage(parseInt(newTablePerPage));
        setTableCurrentPage(0);
        queryData(0, newTablePerPage)
    }
    const selectAllHandle = (e) => {
        setSelectAllStatus(e.target.checked)
        let tableDataPrev = [...tableData];
        let updatedData = [];
        for (let index in tableDataPrev) {
            let item = { ...tableDataPrev[index] };
            item['IsChecked'] = e.target.checked
            updatedData.push(item)
        }
        setTableData(updatedData)
    }
    const singleSelectHandle = (e) => {
        let pk = e.target.parentElement.parentElement.getAttribute("pk")
        if (pk == null) {
            pk = e.target.parentElement.getAttribute("pk")
        }
        let tableDataPrev = [...tableData];
        for (let index in tableDataPrev) {
            if (tableDataPrev[index]['pk'] == pk) {
                tableDataPrev[index]['IsChecked'] = !tableDataPrev[index]['IsChecked']
            }
        }
        setTableData(tableDataPrev)
    }
    /////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////// Form Events/////////////////////////////
    const resetQueryHandle = (e) => {
        setCatagory({
            CATAGORY_LEVEL_ONE: '',
            CATAGORY_LEVEL_TWO: '',
            CATAGORY_LEVEL_THREE: '',
            CATAGORY_LEVEL_FOUR: '',
            CATAGORY_LEVEL_FIVE: ''
        })
        setRuleID('')
        queryData(0, tablePerPage)
    }
    const searchQueryHandle = (e) => {
        queryData(0, tablePerPage)
    }
    const catagorySelect = (e, catagory) => {
        e.preventDefault();
        const value = e.target.value
        if (value && value != null && value != 'undefined') {
            setCatagory((oldState) => ({
                ...oldState,
                ["CATAGORY_LEVEL_" + catagory]: value
            }))
        }
        setRuleID('')
    };
    const ruleEvent = (e) => {
        e.preventDefault();
        setCatagory({
            CATAGORY_LEVEL_ONE: '',
            CATAGORY_LEVEL_TWO: '',
            CATAGORY_LEVEL_THREE: '',
            CATAGORY_LEVEL_FOUR: '',
            CATAGORY_LEVEL_FIVE: ''
        })
        setRuleID(e.target.value)
        queryData(0, tablePerPage)
    }
    //////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////Life Cycle Events/////////////////////////////
    useEffect(() => {
        let currentUserProject = "1";
        axios
            .get(SERVER_URL + DATA_COLUMNS + "/", { params: { project: currentUserProject } })
            .then(res => {
                if (res.data.length == 1 && res.data[0] == '') {
                    this.state["CATAGORY_LEVEL_ONE_Data"] = []
                }
                else {
                    for (let index in CATAGORIES) {
                        setCatagoryData((oldState) => ({
                            ...oldState,
                            ["CATAGORY_LEVEL_" + CATAGORIES[index] + "_Data"]: res.data["CATAGORY_LEVEL_" + CATAGORIES[index]]
                        }))
                    }
                }
            }
            )
            .catch(err => console.log(err));
        axios
            .get(SERVER_URL + RULE_ENGINE_DATA, { params: { project: currentUserProject, type: "AllRules" } })
            .then(res => {
                setRulesList(res.data)
            }
            )
            .catch(err => console.log(err));
        queryData(tableCurrentPage, tablePerPage)
    },
        []);
    // useEffect(() => queryData(), [tablePerPage, tableCurrentPage]);
    return (
        <>
            <Grid container spacing={0}>
                <Grid xs={6} sm={6} md={9} lg={9} xl={9} >
                    <Grid container spacing={0}>
                        {CATAGORIES.map((item, index) =>
                            <Grid xs={6} sm={6} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <DropDownSelect
                                        dataList={catagoriesData["CATAGORY_LEVEL_" + item + "_Data"]}
                                        label={"LEVEL_" + (index + 1)}
                                        DataType="ListData"
                                        selectedValue={catagories["CATAGORY_LEVEL_" + item]}
                                        onChangeEvent={(e) => catagorySelect(e, item)}
                                    />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} >
                    <Box m={1}>
                        <DropDownSelect
                            dataList={rulesList}
                            label={"Rules"}
                            DataType="ListData"
                            selectedValue={ruleID}
                            onChangeEvent=
                            {(e) => ruleEvent(e)}
                        />
                    </Box>
                    {/* <IconButton aria-label="search" variant="outlined"  color="primary">
                        <SearchIcon onClick={()=>queryData()}/>
                    </IconButton> */}
                </Grid>
            </Grid>
            <Grid>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "10px 10px 10px 10px" }}
                    startIcon={<SearchIcon />}
                    onClick={(e) => searchQueryHandle(e)}
                >
                    Search
                </Button>
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
            <TableData
                TableHeaderData={DATA_ATTRIBUTES_FOR_COLUMNS}
                TableDataList={tableData}
                totalRows={tableTotalRows}
                perPage={tablePerPage}
                currentPage={tableCurrentPage}
                selectAllStatus={selectAllStatus}
                changePageEvent={(event) => changePageHandle(event)}
                changeRowsPerPageEvent={(event) => changeRowsPerPageHandle(event)}
                SelectAllEvent={(event) => selectAllHandle(event)}
                SingleSelectEvent={(event) => singleSelectHandle(event)}
                selectOption={false}
                paginationOption={true}
            />
        </>
    );
}
export default InvoiceByRule