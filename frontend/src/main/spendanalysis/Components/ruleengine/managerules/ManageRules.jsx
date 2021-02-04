import React, { useState } from 'react'
import Table from '../../../../../global/table/table.table'
import { DATA_ATTRIBUTES_FOR_RULE_ENGINE, RULE_ENGINE } from '../../../../../global/constants'
import ManageRulesDataForm from './ManageRulesDataForm'
import  ManageRulesQueryForm from './ManageRulesQueryForm'
import { updateTaxonomyCategories } from '../../../../../global/utils/utils.actions'
import { useEffect } from 'react'
import { useDispatch } from "react-redux"
function ManageRules() {
    const [selectedRow, setSelectedRow] = useState('');
    const [actionType, setActionType] = useState('');
    const [formState, setFormState] = useState(false);
    const dispatch = useDispatch()
    const addNewDataHandle = () =>{
        setActionType("New")
        setFormState(true)
    }
    const editDataHandle = (rowData) =>{
        setSelectedRow(rowData)
        setActionType("Edit")
        setFormState(true)
    }
    const apiData = {
        project : "1"
    }
    useEffect(()=>{
        dispatch(updateTaxonomyCategories(apiData))
    },
    [])
    return (
        <>
            < ManageRulesQueryForm
                apiLink = { RULE_ENGINE }
                ruleStatus = 'draft'
                isStatusSwitchEn = { true }
            />
            <Table
                tableHeaders = { DATA_ATTRIBUTES_FOR_RULE_ENGINE }
                selectOption = { true }
                ruleImpEnabled = { true }
                paginationOption = { true } 
                apiLink = { RULE_ENGINE }
                addNewDataHandle = { addNewDataHandle }
                editDataHandle = { editDataHandle }
            />
             {
                formState &&
                    <ManageRulesDataForm
                        apiLink = { RULE_ENGINE }
                        table = { 'Rule' }
                        actionType = { actionType }
                        formState = { formState }
                        formData = { selectedRow }
                        formCloseEvent = { () => setFormState(false) }
                    />
            }
        </>
    )
}

export default ManageRules