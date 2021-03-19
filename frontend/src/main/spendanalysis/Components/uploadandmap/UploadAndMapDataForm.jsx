import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import readXlsxFile from 'read-excel-file';
import {
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Publish } from '@material-ui/icons'

import DropDownSelect from '../../../../global/dropDownSelect'
import { fetchDefaultTemplates } from './map/actions'
import { updateData, postData } from '../../../../global/table/table.actions'
import { 
    setMapAttachFileName, 
    setMapAttachFileHeader, 
    setMapSelectedDefaultTemplate, 
    setMapSelectedDefaultTemplateData,
    setNewMappingName
} from './map/actionCreators'


const useStyles = makeStyles({
    sensitivityHead :{
        background : 'grey',
        color : "white",
        marginTop : "30px" 
    },
    itemKeys: {
        display : "flex",
        justifyContent  : "center",
        alignContent : "center",
        transform: "translateY(27px)"
    }
})
function FormPopUp(props){
    const classes = useStyles()
    const dispatch = useDispatch()
    const mapData = useSelector(state => state.mapDataStates)
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage } = tableStates
    const { actionType, formData, formState, formCloseEvent, updateDataFunction, apiLink } = props
    const { 
        defaultTemplates,
        attachFileName,
        selectedDefaultTemplate,
        selectedDefaultTemplateData,
        attachFileHeader,
        newMappingName
    } = mapData

    const uploadFileHandle = (e) =>{
        try {
            dispatch(setMapAttachFileName(e.target.files[0].name))
            readXlsxFile(e.target.files[0]).then((data) => {
                dispatch(setMapAttachFileHeader(data[0]))
            })
        }
        catch (err) {
            dispatch(setMapAttachFileName(attachFileName))
        }
    }
    const handleSave = () => {
        const apiData = {
            templateName: newMappingName, 
            templateMapping: JSON.stringify(selectedDefaultTemplateData),
            fileColumns: JSON.stringify(attachFileHeader), 
            table: selectedDefaultTemplate, 
            project : '1'
        }
        let updateApidata = {
            pk : formData.pk,
            payload : JSON.stringify(apiData),
        }
        let postDataApi = {
            payload : JSON.stringify(apiData),
            project : "1",
        }
        const fetchApiData = {
            query : {},
            currentPage : currentPage,
            perPage : perPage,
            project : "1"
        }
        if (selectedDefaultTemplate == "") {
            alert("Select A default templete")
        }
        else {
            let dataTypes = selectedDefaultTemplateData["Mandatory"]
            let type = Object.keys(dataTypes)
            let itemsCount = 0;
            type.forEach((item)=>{
                for (const [key, value] of Object.entries(dataTypes[item])) {
                    if(value === ""){
                        itemsCount++
                    }
                  }
            })
            if (itemsCount > 0 || newMappingName == '') {
                if (itemsCount > 0) {
                    alert("Select All Mandatory Items")
                }
                if (newMappingName == '') {
                    alert("Choose A Templete Name")
                }
            }
            else {
                if (actionType == "Edit") {
                    dispatch( updateData(
                        apiLink, updateApidata, fetchApiData
                    ));
                }
                else {
                    dispatch( postData(
                        apiLink, postDataApi, fetchApiData
                    ));
                }
                formCloseEvent()
            }
        }
        
    }
    const defaultTempleteSelectHandle=(e)=>{
        let selectedIndex = e.target.selectedIndex;
        let defaultTemplateReference = parseInt(e.target.options[selectedIndex].getAttribute("pk"));
        dispatch(setMapSelectedDefaultTemplate(defaultTemplateReference))
        defaultTemplates.forEach((element)=>{
            if(element.pk===defaultTemplateReference){
                dispatch(setMapSelectedDefaultTemplateData(element.fields.Items))
            }
        })
    }
    const mappingItemSelectHandle = (e, sensitivity, type, element) =>{
        const value = e.target.value
        const templeteData = selectedDefaultTemplateData;
        let updatedTempleteData = {}
        let sensitivities  = {...selectedDefaultTemplateData[sensitivity]}
        let types = { ...sensitivities[type] }
        let elements = { ...types, [element]: value  }
        sensitivities[type] = elements
        updatedTempleteData = {
            ...templeteData, [sensitivity]:sensitivities
        }
        dispatch(setMapSelectedDefaultTemplateData(updatedTempleteData))
    }
    const textFieldId = 'outlined-basic'
    const textFieldVarient = 'outlined'
    useEffect(()=>{
        dispatch(fetchDefaultTemplates())
        if(actionType=="Edit"){
            const { DataTableReference, MappedItems, MappingName, FileColumns  }  = formData.fields
            const mappedItems = JSON.parse(MappedItems)
            const fileColumns = JSON.parse(FileColumns)
            dispatch(setMapAttachFileHeader(fileColumns))
            dispatch(setMapSelectedDefaultTemplate(DataTableReference))
            dispatch(setMapSelectedDefaultTemplateData(mappedItems)) 
            dispatch(setNewMappingName(MappingName))
        }
    },[])
    return(
        <>
            <Dialog open={formState} onClose={formCloseEvent} aria-labelledby="form-dialog-title"  fullWidth={true}
                    maxWidth='sm'>
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h6" component="h2" align="left" gutterBottom>
                        <Box>
                            {actionType}  Mapping
                        </Box>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing = {0}>
                        <Grid xs={5} sm={5} md={5} lg={5} xl={5}>
                            <Box m={1}>
                                <DropDownSelect
                                    dataList={ defaultTemplates }
                                    DataType="WithPkAndFieldName"
                                    fieldName = "TableName"
                                    label="Table"
                                    onChangeEvent={(e) => defaultTempleteSelectHandle(e)}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={7} sm={7} md={7} lg={7} xl={7}>
                            <Box m={1}>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    component="label"
                                    color="primary"
                                    style={{ width: "100%" }}
                                    startIcon={<Publish />}
                                    onChange={(e) => uploadFileHandle(e)}
                                >
                                { attachFileName }
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                />
                                </Button>
                            </Box>
                        </Grid>
                </Grid>
                <Grid container spacing = {0}>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                        { 
                            Object.keys(selectedDefaultTemplateData).map( sensitivity => (
                                <>
                                    <Typography 
                                        variant="h6" 
                                        component="h2" 
                                        align="center" 
                                        gutterBottom
                                        className = { classes.sensitivityHead }
                                    >
                                        <Box >
                                            { sensitivity }
                                        </Box>
                                    </Typography>
                                    {
                                        Object.keys(selectedDefaultTemplateData[sensitivity]).map( type => (
                                            <>
                                                <Box >
                                                    { type }
                                                </Box>
                                                { 
                                                    Object.keys(selectedDefaultTemplateData[sensitivity][type]).map(element=>(
                                                        <Grid container spacing={0}>
                                                            <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <Box
                                                                    className = { classes.itemKeys}
                                                                >
                                                                    { element }
                                                                </Box>
                                                            </Grid>
                                                            <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <DropDownSelect
                                                                    dataList={ attachFileHeader }
                                                                    DataType="ListData"
                                                                    fieldName = "TableName"
                                                                    selectedValue = { selectedDefaultTemplateData[sensitivity][type][element]}
                                                                    label="Select"
                                                                    onChangeEvent={(e)=> mappingItemSelectHandle(e, sensitivity, type, element)}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    ))
                                                }
                                            </>
                                        ))
                                    }
                                </>
                            ))
                        }
                    </Grid>
                </Grid>
                </DialogContent>
                <Grid container justify="center">
                    <DialogActions position="centre">
                        <TextField
                            label="New Templete Name"
                            id="outlined-size-small"
                            size="small"
                            onChange={(e) => dispatch(setNewMappingName(e.target.value))}
                            value = { newMappingName }
                        />
                        <Button onClick={() => handleSave()} variant="contained" color="primary">
                            {actionType=="Edit"?"Update":"Save"}
                        </Button>
                        <Button onClick = { formCloseEvent } variant={ textFieldVarient } color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </>
    )
}

export default FormPopUp;
