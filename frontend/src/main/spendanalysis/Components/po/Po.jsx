import React, { useState } from 'react'
import Table from '../../../../global/table/table.table'
import { PO_COLUMNS, PO_DATA } from '../../../../global/constants'
import PoDataForm from './PoDataForm'
import  PoQueryForm from './PoQueryForm'
function Po() {
    const [selectedRow, setSelectedRow] = useState('');
    const [actionType, setActionType] = useState('');
    const [formState, setFormState] = useState(false);
    const addNewDataHandle = () =>{
        setActionType("New")
        setFormState(true)
    }
    const editDataHandle = (rowData) =>{
        setSelectedRow(rowData)
        setActionType("Edit")
        setFormState(true)
    }
    return (
        <>
            < PoQueryForm
                apiLink = { PO_DATA }
            />
            <Table
                tableHeaders = { PO_COLUMNS }
                selectOption = { true }
                paginationOption = { true } 
                apiLink = { PO_DATA }
                addNewDataHandle = { addNewDataHandle }
                editDataHandle = { editDataHandle }
            />
             {
                formState &&
                    <PoDataForm
                        apiLink = { PO_DATA }
                        table = { 'PO' }
                        actionType = { actionType }
                        formState = { formState }
                        formData = { selectedRow }
                        formCloseEvent = { () => setFormState(false) }
                    />
            }
        </>
    )
}

export default Po