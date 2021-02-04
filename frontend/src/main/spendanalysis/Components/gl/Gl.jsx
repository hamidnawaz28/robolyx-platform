import React, { useState } from 'react'
import Table from '../../../../global/table/table.table'
import { 
    GL_COLUMNS, 
    GL_DATA 
} from '../../../../global/constants'
import GlDataForm from './GlDataForm'
import  GlQueryForm from './GlQueryForm'
function Gl() {
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
            < GlQueryForm
                apiLink = { GL_DATA }
            />
            <Table
                tableHeaders = { GL_COLUMNS }
                selectOption = { true }
                paginationOption = { true } 
                apiLink = { GL_DATA }
                addNewDataHandle = { addNewDataHandle }
                editDataHandle = { editDataHandle }
            />
             {
                formState &&
                    <GlDataForm
                        apiLink = { GL_DATA }
                        table = { 'GL' }
                        actionType = { actionType }
                        formState = { formState }
                        formData = { selectedRow }
                        formCloseEvent = { () =>  setFormState(false)}
                    />
            }
        </>
    )
}

export default Gl