import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@material-ui/core/Box';
import {
    OVERWRITTEN_RULES,
    DATA_ATTRIBUTES_FOR_RULE_ENGINE
} from "../../../../../global/constants";
import { 
    updateInvoicesPk
 } from '../../../../../global/utils/utils.actions.js'
import DropDownSelect from "../../../../../global/dropDownSelect"
import { queryData } from '../../../../../global/table/table.actions'
import Table from '../../../../../global/table/table.table'

function OverwrittenRules() {   
    const dispatch = useDispatch()
    const [invoice,setInvoice] = React.useState('')
    const tableStates = useSelector(state => state.tableStates)
    const allInvoicesPk = useSelector(state =>state.utilsData.allInvoicesPk)
    const { perPage, currentPage } = tableStates
    let fetchApiData = {
        currentPage: currentPage,
        perPage: perPage,
        project: '1'
    }
    const invoiceSelectEvent = (e) => {
        e.preventDefault();
        const value =  e.target.value
        setInvoice(value)
        fetchApiData["query"] = JSON.stringify({pk: value})
        dispatch(queryData(OVERWRITTEN_RULES, fetchApiData))
    }
    useEffect(() => {
        dispatch(updateInvoicesPk())
    },[]);
    return (
        <>
            <Box m={1}>
                <DropDownSelect
                    dataList={allInvoicesPk}
                    label={"Invoice"}
                    DataType="ListData"
                    selectedValue={invoice}
                    onChangeEvent=
                    {(e) => invoiceSelectEvent(e)}
                />
            </Box>
            <Table
                tableHeaders={DATA_ATTRIBUTES_FOR_RULE_ENGINE}
                selectOption={false}
                paginationOption={true}
                apiLink={OVERWRITTEN_RULES}
            />
        </>
    );
}
export default OverwrittenRules;
