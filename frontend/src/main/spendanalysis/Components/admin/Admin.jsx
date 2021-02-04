import React, { useState } from 'react'
import Table from '../../../../global/table/table.table'
import {
    ADMIN_COLUMN,
    ADMIN_DATA
} from '../../../../global/constants'
import DataForm from './DataForm'
import  QueryForm from './QueryForm'
function Admin() {
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
            <QueryForm
                apiLink = { ADMIN_DATA }
            />
            <Table
                tableHeaders = { ADMIN_COLUMN }
                selectOption = { true }
                paginationOption = { true } 
                apiLink = { ADMIN_DATA }
                addNewDataHandle = { addNewDataHandle }
                editDataHandle = { editDataHandle }
            />
            {
                formState &&
                    <DataForm
                        apiLink = { ADMIN_DATA }
                        table = { 'User' }
                        actionType = { actionType }
                        formState = { formState }
                        formData = { selectedRow }
                        formCloseEvent = { () => setFormState(false) }
                    />
            }
        </>
    )
}

export default Admin