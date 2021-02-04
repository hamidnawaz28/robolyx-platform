import React, { useEffect } from 'react'
import { Grid, Typography, Box ,Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { shadows } from '@material-ui/system'
import { CloudUpload } from '@material-ui/icons'
import readXlsxFile from 'read-excel-file';
import DropDownSelect from '../../../../global/dropDownSelect'
import { fetchDefaultTemplates, fetchSavedTemplates, uploadFileData } from "./upload/actions"
import IconButton from '@material-ui/core/IconButton';
import PageviewIcon from '@material-ui/icons/Pageview';
import { 
    setSelectedDefaultTemplate, 
    setSelectedDefaultTemplateData, 
    setSelectedSavedTemplate, 
    setSelectedSavedTemplateData,
    setAttachFileName,
    setAttachFileHeader,
    setAttachFileData,
    resetUploadStates
} from './upload/actionCreators'
import styled from 'styled-components'
const BorderWrapper = styled(Box)`
    background: white;
`
const getCol = (matrix, col)=> {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

function Upload() {
    const dispatch = useDispatch()
    const uploadData = useSelector(state => state.uploadDataStates)
    const {
        defaultTemplates,
        selectedDefaultTemplate,
        selectedDefaultTemplateData,
        savedTemplates,
        selectedSavedTemplate,
        selectedSavedTemplateData,
        attachFileName,
        attachFileHeader,
        attachFileData
    } = uploadData

    
    const defaultTempleteSelectHandle = (e)=>{
        let selectedIndex = e.target.selectedIndex;
        let defaultTemplateReference = parseInt(e.target.options[selectedIndex].getAttribute("pk"));
        dispatch(setSelectedDefaultTemplate(defaultTemplateReference))
        defaultTemplates.forEach((element)=>{
            if(element.pk===defaultTemplateReference){
                dispatch(setSelectedDefaultTemplateData(element.fields.Items))
            }
        })
        dispatch(fetchSavedTemplates({defaultTemplateReference, project : "1"}))
    }


    const savedTempleteSelectHandle = (e) =>{
        let selectedIndex = e.target.selectedIndex;
        let savedTemplateReference = parseInt(e.target.options[selectedIndex].getAttribute("pk"));
        dispatch(setSelectedSavedTemplate(savedTemplateReference))
        savedTemplates.forEach((element)=>{
            if(element.pk===savedTemplateReference){
                dispatch(setSelectedSavedTemplateData(element.fields.MappedItems))
            }
        })
    }


    const uploadFileHandle = (e) =>{
        try {
            dispatch(setAttachFileName(e.target.files[0].name))
            readXlsxFile(e.target.files[0]).then((data) => {
                let allData = data.slice(1, -1)
                dispatch(setAttachFileHeader(data[0]))
                dispatch(setAttachFileData(allData))
            })
        }
        catch (err) {
            dispatch(setAttachFileName(attachFileName))
        }
    }


    const uploadDatahandle = () =>{
        if (selectedSavedTemplate == "" || selectedDefaultTemplateData == "" || attachFileData.length == 0 || attachFileHeader.length == 0) {
            if (selectedSavedTemplate == "") {
                alert("!Select a Mapped Templete" )
            }
            if (selectedDefaultTemplateData == "") {
                alert("!Select a Default Templete")
            }
            if (attachFileHeader.length == 0) {
                alert("!Upload A File")
            }
        }
        else {
            let columnsName = []
            let columnsData = []
            let sensitivityTypes = Object.keys(selectedSavedTemplateData)
            sensitivityTypes.forEach((sensitivityType)=>{
                let dataTypes = Object.keys(selectedSavedTemplateData[sensitivityType]);
                dataTypes.forEach((dataType)=>{
                    let allColumnsKeys = Object.keys(selectedSavedTemplateData[sensitivityType][dataType])
                    allColumnsKeys.forEach((dbColumn)=>{
                        let fileColumn =selectedSavedTemplateData[sensitivityType][dataType][dbColumn]
                        let indexInFileColumns = attachFileHeader.indexOf(fileColumn)
                        if( indexInFileColumns != -1){
                            let tcol = getCol(attachFileData, indexInFileColumns)
                            columnsName.push(dbColumn)
                            columnsData.push(tcol)
                        }
                    })
                })
            })
            const uploadApiData = {
                project : '1',
                columnsName,
                columnsData,
                table : selectedDefaultTemplate
            }
            dispatch(uploadFileData(uploadApiData))
        }
    }
    useEffect(()=>{
        dispatch(fetchDefaultTemplates())
    },[])
    return (
        <BorderWrapper mb={3} p={2} boxShadow= {3}>
            <Grid container spacing={0}>
                {/* <Grid xs={12} sm={12} md={12} lg={12} xl={12} >
                    <Typography variant="h6" component="h5" align="left" gutterBottom>
                        <Box color="grey">Upload Data</Box>
                    </Typography>
                </Grid> */}
                <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
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
                <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box m={1}>
                        <DropDownSelect
                            dataList={ savedTemplates }
                            DataType="WithPkAndFieldName"
                            fieldName = "MappingName"
                            label="Saved Templete"
                            onChangeEvent={(e) => savedTempleteSelectHandle(e)}

                        />
                    </Box>
                </Grid>
                {/* <Grid xs={12} sm={12} md={1} lg={1} xl={1}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PageviewIcon />
                    </IconButton>    
                </Grid> */}
                <Grid xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Box m={1}>
                        <Button
                            size="large"
                            variant="outlined"
                            component="label"
                            color="primary"
                            style={{ width: "100%" }}
                            startIcon={<CloudUpload />}
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
                <Grid xs={12} sm={12} md={1} lg={1} xl={1}>
                    <Box m={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ width: "100%" }}
                            onClick={uploadDatahandle}
                        > Upload
                        </Button>
                    </Box>
                </Grid>

            </Grid>
            </BorderWrapper>
    )
}

export default Upload
