import React, { useState } from 'react'
import Table from '../../../../global/table/table.table'
import { TEMPLATES_COLUMNS, MANAGE_TEMPLATES } from '../../../../global/constants'
import  Progress from '../../../../global/progress/Progress'
import UploadAndMapDataForm from './UploadAndMapDataForm'
import  UploadAndMapQueryForm from './UploadAndMapQueryForm'
import Upload from './Upload'
function Invoice() {
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
            <Upload/>
            <UploadAndMapQueryForm
                apiLink = { MANAGE_TEMPLATES }
            />
            <Table
                tableHeaders = { TEMPLATES_COLUMNS }
                selectOption = { true }
                paginationOption = { true } 
                apiLink = { MANAGE_TEMPLATES }
                addNewDataHandle = { addNewDataHandle }
                editDataHandle = { editDataHandle }
            />
             {
                formState &&
                    <UploadAndMapDataForm
                        apiLink = { MANAGE_TEMPLATES }
                        table = { 'Mapping' }
                        actionType = { actionType }
                        formState = { formState }
                        formData = { selectedRow }
                        formCloseEvent = { () => setFormState(false) }
                    />
            }
            {
                <Progress/>
            }
        </>
    )
}

export default Invoice