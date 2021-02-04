import React, { useEffect } from 'react'
import TableData from "../../../global/TableComplete"
import DropDownSelect from "../../../global/dropDownSelect"
import Box from '@material-ui/core/Box';

import axios from 'axios';
import {
    SERVER_URL,
    OVERWRITTEN_RULES,
    DATA_ATTRIBUTES_FOR_RULE_ENGINE
} from "../../../global/constants";

function InvoiceByRule() {   
    /////////////////////////////////////// Page States /////////////////////
    const [allInvoices, setAllInvoices] = React.useState([])
    const [invoice,setInvoice] = React.useState('')
    /////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////// Table States//////////////////////
    const [tableData, setTableData] = React.useState({})
    const [tableTotalRows, setTableTotalRows] = React.useState(0)
    const [tablePerPage, setTablePerPage] = React.useState(5)
    const [tableCurrentPage, setTableCurrentPage] = React.useState(0)
    ////////////////////////////////////////////Query Function///////////////////////////
    const queryData = (currentPage, perPage, invoiceId) => {
        let currentUserProject = "1";
        axios
            .get(SERVER_URL + OVERWRITTEN_RULES, {
                params:
                {
                    project: currentUserProject,
                    invoiceid: invoiceId,
                    type: 'OverwrittenRules', 
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
    

    /////////////////////////////////////////// Form Events/////////////////////////////
    const invoiceSelectEvent = (e) => {
        e.preventDefault();
        const value =  e.target.value
        setInvoice(value)
        queryData(0, tablePerPage, value)
    }
    //////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////Life Cycle Events/////////////////////////////
    useEffect(() => {
        let currentUserProject = "1";
        axios
            .get(SERVER_URL + OVERWRITTEN_RULES, { params: { project: currentUserProject, type: "invoicesPk" } })
            .then(res => {
                setAllInvoices(res.data)
            }
            )
            .catch(err => console.log(err));
        
        // queryData(tableCurrentPage, tablePerPage)
    },
        []);
    // useEffect(() => queryData(), [tablePerPage, tableCurrentPage]);
    return (
        <>
            <Box m={1}>
                        <DropDownSelect
                            dataList={allInvoices}
                            label={"InvoiceID"}
                            DataType="ListData"
                            selectedValue={invoice}
                            onChangeEvent=
                            {(e) => invoiceSelectEvent(e)}
                        />
                        {/* <TextField 
                            id="outlined-basic" 
                            label="Outlined" 
                            variant="outlined" 
                            value = {}
                            onChange={(e)=>InvoiceSelectEvent(e)}
                        /> */}
            </Box>
            <TableData
                TableHeaderData={DATA_ATTRIBUTES_FOR_RULE_ENGINE}
                TableDataList={tableData}
                totalRows={tableTotalRows}
                perPage={tablePerPage}
                currentPage={tableCurrentPage}
                changePageEvent={(event) => changePageHandle(event)}
                changeRowsPerPageEvent={(event) => changeRowsPerPageHandle(event)}
                selectOption={false}
                paginationOption={true}
            />
        </>
    );
}
export default InvoiceByRule;
