import React, { useEffect } from 'react'
import TableData from "../../../global/TableComplete"
import RuleEngineSearchForm from '../../../global/RuleEngineQueryForm';
import axios from 'axios';
import {
    SERVER_URL,
    DATA_COLUMNS,
    STATISTICAL_SUMMARY,
    STATISTICAL_SUMMARY_COLUMNS,
    RULE_ENGINE_DATA
} from "../../../global/constants";

function InvoiceByRule() {
    /////////////////////////////////////// Page States /////////////////////
    const [ruleID,setRuleID] = React.useState('')
    const [query,setQuery] = React.useState('query')
    /////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////// Table States//////////////////////
    const [tableData, setTableData] = React.useState({})
    const [tableTotalRows, setTableTotalRows] = React.useState(0)
    const [tablePerPage, setTablePerPage] = React.useState(5)
    const [tableCurrentPage, setTableCurrentPage] = React.useState(0)
    ////////////////////////////////////////////Query Function///////////////////////////
    const queryData = (queryType) => {
        let currentUserProject = "1";
        axios
            .get(SERVER_URL + STATISTICAL_SUMMARY, {
                params:
                {
                    UserProjectReference: currentUserProject,
                    query: JSON.stringify(query),
                    currentPage: tableCurrentPage,
                    perPage: tablePerPage,
                    type: queryType
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
    const ruleSelectEvent = (e) => {
        e.preventDefault();
        debugger
        setRuleID(e.target.value)
        queryData('ruleID')
    }
    const searchEvent=(e)=>{
        setQuery(e.target.parentElement.getAttribute("queryData"))
        queryData('query')
    }
    const resetEvent =(e)=>{
        setQuery({})
        queryData('query')
    }

    //////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////Life Cycle Events/////////////////////////////
    useEffect(() => {
        let currentUserProject = "1";
        axios
            .get(SERVER_URL + DATA_COLUMNS + "/", { params: { project: currentUserProject } })
            .then(res => {
               //
            }
            )
            .catch(err => console.log(err));
        axios
            .get(SERVER_URL + RULE_ENGINE_DATA, { params: { project: currentUserProject, type: "AllRules" } })
            .then(res => {
                // setRulesList(res.data)
            }
            )
            .catch(err => console.log(err));
        queryData('query')
    },
        []);
    // useEffect(() => queryData(), [tablePerPage, tableCurrentPage]);
    return (
        <>
            <RuleEngineSearchForm
                onSearchClick={(event) => searchEvent(event, queryData)}
                onResetClick={() => this.resetEvent(queryData)}
                ruleIdSelectEvent ={(event)=>ruleSelectEvent(event)}
            />
            <TableData
                TableHeaderData={STATISTICAL_SUMMARY_COLUMNS}
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
