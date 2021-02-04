import React, { useState } from 'react'
import Table from '../../../../global/table/table.table'
import { 
    CONTRACT_COLUMNS, 
    CONTRACT_DATA 
} from '../../../../global/constants'
import ContractDataForm from './ContractDataForm'
import  ContractQueryForm from './ContractQueryForm'
function Contract() {
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
            <ContractQueryForm
                apiLink = { CONTRACT_DATA }
            />
            <Table
                tableHeaders = { CONTRACT_COLUMNS }
                selectOption = { true }
                paginationOption = { true } 
                apiLink = { CONTRACT_DATA }
                addNewDataHandle = { addNewDataHandle }
                editDataHandle = { editDataHandle }
            />
            {
                formState &&
                    <ContractDataForm
                        apiLink = { CONTRACT_DATA }
                        table = { 'Contract' }
                        actionType = { actionType }
                        formState = { formState }
                        formData = { selectedRow }
                        formCloseEvent = { () => setFormState(false) }
                    />
            }
        </>
    )
}

export default Contract