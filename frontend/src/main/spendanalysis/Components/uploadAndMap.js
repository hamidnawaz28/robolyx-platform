import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import DropDownSelect from '../../../global/dropDownSelect';
import { SERVER_URL, DEFAULT_TEMPLETES, SAVED_TEMPLETES, FILE_IMPORT } from '../../../global/constants';
import axios from 'axios';
import { invoiceAndTaxonomyUploadAndMap } from "../../../global/actions"
import TableData from "../../../components/DataTable"

import { connect } from "react-redux";
import readXlsxFile from 'read-excel-file';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MainModal from "../../../global/modal"

const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

class TaxonomyUpload extends React.Component {
    constructor(props) {
        super(props);
        this.uploadFileHandle = this.uploadFileHandle.bind(this);
        this.state = {
            AttachmnetFileName: "Upload File",
            AttachFileHeaderData: [],
            ExcelFileData: [],
            taxonomyUploadDefaultTempletes: '',
            invoiceUploadDefaultTempletes: '',
            savedTempletes: '',
            invoiceSavedTempletes: "",
            taxonomySavedTempletes: "",
            SelectedDefaultTempleteItems: '',
            newTempleteData: [],
            modalDisplay: false,
            modalMessage: '',
            alertDisplay: false,
            alertMessage: ""
        }
        this.uploadDatahandle = this.uploadDatahandle.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleAlertOpen = this.handleAlertOpen.bind(this);
    }
    uploadFileHandle(e) {
        try {
            this.setState({ AttachmnetFileName: e.target.files[0].name })
            readXlsxFile(e.target.files[0]).then((data) => {
                let AllData = data.slice(1, -1)
                this.setState({ AttachFileHeaderData: data[0], ExcelFileData: AllData });
            })
        }
        catch (err) {
            this.setState({ AttachmnetFileName: this.state.AttachmnetFileName })
        }
    }
    defaultTempleteSelectHandle(event) {
        let selectedIndex = event.target.selectedIndex;
        let defaultTempleteReference = event.target.options[selectedIndex].getAttribute("pk");

        let SelectedDefaultTempleteMapping = '';
        let invoiceUploadDefaultTempletes = this.state["invoice" + "UploadDefaultTempletes"];
        for (let index in invoiceUploadDefaultTempletes) {
            if (invoiceUploadDefaultTempletes[index].pk == defaultTempleteReference) {
                SelectedDefaultTempleteMapping = invoiceUploadDefaultTempletes[index].items
            }
        }
        SelectedDefaultTempleteMapping = JSON.parse(SelectedDefaultTempleteMapping);

        this.setState({ SelectedDefaultTempleteItems: SelectedDefaultTempleteMapping })
        let menu = "invoice";
        this.props["invoiceAndTaxonomyUploadAndMap"]({
            path: menu + "-upload-defaultSelectedTemplete",
            value: defaultTempleteReference
        });
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        axios
            .get(SERVER_URL + SAVED_TEMPLETES, { params: { project: currentUserProject, type: menu, defaultTempleteReference: defaultTempleteReference } })
            .then(res => {
                let newdata = [];
                for (let index in res.data) {
                    let tempdata = '';
                    tempdata = {
                        pk: res.data[index].pk,
                        name: res.data[index].fields.Name,
                        items: res.data[index].fields.Items,
                    }
                    newdata.push(tempdata)
                }
                if ("invoice" == "invoice") {
                    this.setState({ invoiceSavedTempletes: newdata })
                }
                else {
                    this.setState({ taxonomySavedTempletes: newdata })
                }
            }
            )
            .catch(err => console.log(err));
    }
    savedTempleteSelectHandle(event) {
        let selectedIndex = event.target.selectedIndex;
        let SavedTempleteReference = event.target.options[selectedIndex].getAttribute("pk");
        this.props["invoiceAndTaxonomyUploadAndMap"]({
            path: "invoice" + "-upload-savedSelectedTemplete",
            value: SavedTempleteReference
        });
    }
    fileColumnSelectHandle(event) {
        this.props["invoiceAndTaxonomyUploadAndMap"]({
            path: "invoice" + "-map-fileSelectedColumn",
            value: event.target.value
        });
    }
    defaultColumnSelectHandle(event) {
        let selectedIndex = event.target.selectedIndex;
        let selectedData = event.target.options[selectedIndex].getAttribute("data");
        selectedData = selectedData.split(",")
        selectedData = {
            data: selectedData[2],
            datatype: selectedData[1],
            sensitivity: selectedData[0]

        }
        this.props["invoiceAndTaxonomyUploadAndMap"]({
            path: "invoice" + "-map-defaultSelectedColumn",
            value: selectedData
        });
    }
    uploadDatahandle(e) {
        let currentPath = "invoice";
        let savedSelectedTemplete = this.props.store.taxonomyandinvoicestore[currentPath].upload.savedSelectedTemplete;
        let defaultSelectedTemplete = this.props.store.taxonomyandinvoicestore[currentPath].upload.defaultSelectedTemplete;
        let uploadedFileColumns = this.state.AttachFileHeaderData;
        let FileData = this.state.ExcelFileData;
        if (savedSelectedTemplete == "" || defaultSelectedTemplete == "" || FileData.length == 0 || uploadedFileColumns.length == 0) {
            if (savedSelectedTemplete == "") {
                this.setState({ modalDisplay: true, modalMessage: "Select a Mapped templete" })
            }
            if (defaultSelectedTemplete == "") {
                alert("Select a Default templete")
            }
            if (uploadedFileColumns.length == 0) {
                alert("Upload  " + "invoice" + " file")
            }
        }
        else {
            let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
            let SelectedSavedTempleteMapping = '';
            let savedTempletesAll = this.state["invoice" + "SavedTempletes"];
            for (let index in savedTempletesAll) {
                if (savedTempletesAll[index].pk == savedSelectedTemplete) {
                    SelectedSavedTempleteMapping = savedTempletesAll[index].items
                }
            }
            SelectedSavedTempleteMapping = JSON.parse(SelectedSavedTempleteMapping);
            let Senkeys = Object.keys(SelectedSavedTempleteMapping);
            let SenKey;
            let ColumnNames = []
            let ColumnsData = []
            for (SenKey in Senkeys) {
                let SenSiKey = Senkeys[SenKey]
                let SavedColumns = Object.keys(SelectedSavedTempleteMapping[Senkeys[SenKey]]);
                let index
                for (index in SavedColumns) {
                    let key = SavedColumns[index];
                    let allColumns = SelectedSavedTempleteMapping[SenSiKey][key]
                    for (let columnsIndex in allColumns) {
                        let indexInFileColumns = uploadedFileColumns.indexOf(allColumns[columnsIndex])
                        let tcol = getCol(FileData, indexInFileColumns)
                        ColumnNames.push(columnsIndex)
                        ColumnsData.push(tcol)
                    }
                }
            }
            axios
                .post(SERVER_URL + FILE_IMPORT + "/", {
                    type: "invoice",
                    ColumnNames: ColumnNames,
                    ColumnsData: ColumnsData,
                    UserProjectReference: currentUserProject,
                    DefaultTempleteReference: defaultSelectedTemplete,
                    SavedTempleteReference: savedSelectedTemplete
                })
                .then(res => {
                    this.setState({ modalDisplay: true, modalMessage:"invoice"+" Uploaded Successfully" })
                })
                .catch(err => console.log(err))
        }

    }

    addMapData(event) {
        let newTempleteItem = this.props.store.taxonomyandinvoicestore["invoice"]["map"].defaultSelectedColumn;
        let fileColumn = this.props.store.taxonomyandinvoicestore["invoice"]["map"].fileSelectedColumn;
        let SelectedDefaultTempleteItems = this.state.SelectedDefaultTempleteItems;
        if (fileColumn == "" || newTempleteItem == "") {
            if (fileColumn == "") {
                alert("Select a file column")
            }
            if (newTempleteItem == "") {
                alert("Select a default templete column")
            }
        }
        else {
            //let newTempleteName = this.props.store.taxonomyandinvoicestore["invoice"]["map"].newTempleteName;

            newTempleteItem["fileColumn"] = fileColumn
            newTempleteItem["Ischecked"] = ''
            let newArray = [];
            let sensitivities = Object.keys(SelectedDefaultTempleteItems)
            for (let sensitivityIndex in sensitivities) {
                let sensitivity = SelectedDefaultTempleteItems[Object.keys(SelectedDefaultTempleteItems)[sensitivityIndex]]
                let dataTypes = Object.keys(sensitivity)
                for (let dataTypeIndex in dataTypes) {
                    let datatype = sensitivity[Object.keys(sensitivity)[dataTypeIndex]];

                    for (let dataindex in datatype) {
                        let tempdata = {
                            data: datatype[dataindex],
                            sensitivity: sensitivities[sensitivityIndex],
                            datatype: dataTypes[dataTypeIndex]
                        }
                        newArray.push(tempdata);
                    }
                }
            }
            let arrayLength = newArray.length - 1;
            for (let arrayIndex in newArray) {
                if (newArray[arrayIndex].data == newTempleteItem.data && newArray[arrayIndex].sensitivity == newTempleteItem.sensitivity && newArray[arrayIndex].datatype == newTempleteItem.datatype) {
                    let myIndex = parseInt(arrayIndex) + 1
                    if (arrayIndex == arrayLength) {
                        this.props["invoiceAndTaxonomyUploadAndMap"]({
                            path: "invoice" + "-map-defaultSelectedColumn",
                            value: ""
                        });
                    }
                    else {
                        this.props["invoiceAndTaxonomyUploadAndMap"]({
                            path: "invoice" + "-map-defaultSelectedColumn",
                            value: {
                                data: newArray[myIndex]["data"],
                                datatype: newArray[myIndex]["datatype"],
                                sensitivity: newArray[myIndex]["sensitivity"]
                            }
                        });
                    }
                }

            }
            let prevTempleteData = this.state.newTempleteData;
            prevTempleteData.push(newTempleteItem);
            this.setState({ newTempleteData: prevTempleteData })
            let dataArray = SelectedDefaultTempleteItems[newTempleteItem['sensitivity']][newTempleteItem["datatype"]]
            for (let index in dataArray) {
                if (dataArray[index] == newTempleteItem['data']) {
                    SelectedDefaultTempleteItems[newTempleteItem['sensitivity']][newTempleteItem["datatype"]].splice(index, 1)
                    this.setState({ SelectedDefaultTempleteItems: SelectedDefaultTempleteItems })
                    break;
                }
            }

        }



    }
    SelectAllEventHandle(event) {

        let currentStatus = event.target.checked;
        let newTempleteData = this.state.newTempleteData;
        if (currentStatus && newTempleteData.length > 0) {
            for (let index in newTempleteData) {
                newTempleteData[index].Ischecked = "checked";
            }
        }
        else {
            for (let index in newTempleteData) {
                newTempleteData[index].Ischecked = "unchecked";
            }
        }
        this.setState({ newTempleteData: newTempleteData })
    }
    SingleSelectEventHandle(event) {
        let currentStatus = event.target.checked;
        let selectedData = event.target.getAttribute("data")
        selectedData = selectedData.split(",")
        selectedData = {
            sensitivity: selectedData[0],
            datatype: selectedData[1],
            data: selectedData[2]
        }
        let newTempleteData = this.state.newTempleteData;
        for (let index in newTempleteData) {
            if (newTempleteData[index]["sensitivity"] == selectedData["sensitivity"]
                && newTempleteData[index]["datatype"] == selectedData["datatype"]
                && newTempleteData[index]["data"] == selectedData["data"]
            ) {
                if (currentStatus) {
                    newTempleteData[index].Ischecked = "checked";
                }
                else {
                    newTempleteData[index].Ischecked = "unchecked";
                }
            }
        }
        this.setState({ newTempleteData: newTempleteData })
    }
    DeleteSelectedhandle() {
        let newTempleteData = this.state.newTempleteData;
        let newTempleteUpdateData = [];
        let popedData;
        let poperDataArray = [];
        for (let index in newTempleteData) {
            if (newTempleteData[index].Ischecked == "checked") {
                popedData = {
                    datatype: newTempleteData[index].datatype,
                    sensitivity: newTempleteData[index].sensitivity,
                    data: newTempleteData[index].data
                }
                poperDataArray.push(popedData)
                popedData = '';
            }
            else {
                newTempleteUpdateData.push(newTempleteData[index])
            }
        }
        this.setState({ newTempleteData: newTempleteUpdateData })
        let SelectedDefaultTempleteItems = this.state.SelectedDefaultTempleteItems;
        for (let index in poperDataArray) {
            SelectedDefaultTempleteItems[poperDataArray[index]["sensitivity"]][poperDataArray[index]["datatype"]].push(poperDataArray[index]["data"])
        }
        this.setState({ SelectedDefaultTempleteItems: SelectedDefaultTempleteItems })

    }
    AddNewTempleteHandle(e) {
        let type = "invoice"
        let SelectedDefaultTempleteItems = this.state.SelectedDefaultTempleteItems;
        if (SelectedDefaultTempleteItems == "") {
            alert("Select A default templete")
        }
        else {
            let mandatoryItems = SelectedDefaultTempleteItems["Mandatory"]
            let mandatoryItemsKeys = Object.keys(mandatoryItems)
            let itemsCount = 0;
            let templeteName = this.props.store.taxonomyandinvoicestore[type].map.newTempleteName;
            for (let keyIndex in mandatoryItemsKeys) {
                let length = mandatoryItems[mandatoryItemsKeys[keyIndex]].length;
                itemsCount += length;
            }
            if (itemsCount > 0 || templeteName == '') {
                if (itemsCount > 0) {
                    alert("Select All Mandatory Items")
                }
                if (templeteName == '') {
                    alert("Choose A templeteName")
                }
            }
            else {
                let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
                let defaultSelectedTemplete = this.props.store.taxonomyandinvoicestore[type].upload.defaultSelectedTemplete;
                let newTempleteData = this.state.newTempleteData;
                let sensitivitylevels = [];
                let datatypelevels = []
                let newObj = new Object();
                for (let singledata in newTempleteData) {
                    if (sensitivitylevels.indexOf(newTempleteData[singledata].sensitivity) == -1) {
                        sensitivitylevels.push(newTempleteData[singledata].sensitivity);
                        newObj[newTempleteData[singledata].sensitivity] = {}
                    }
                    let dataKeys = Object.keys(newObj[newTempleteData[singledata]["sensitivity"]]);
                    if (dataKeys.indexOf(newTempleteData[singledata].datatype) == -1) {
                        newObj[newTempleteData[singledata]["sensitivity"]][newTempleteData[singledata]["datatype"]] = {}
                    }

                    newObj[newTempleteData[singledata]["sensitivity"]][newTempleteData[singledata]["datatype"]][newTempleteData[singledata]["data"]] = newTempleteData[singledata]["fileColumn"]
                }
                let newTempleteToSaveData = JSON.stringify(newObj)
                axios
                    .post(SERVER_URL + SAVED_TEMPLETES + "/",
                        {
                            type: type,
                            project: currentUserProject,
                            defaultTempleteReference: defaultSelectedTemplete,
                            SavedTempleteName: templeteName,
                            SavedTempleteColumns: newTempleteToSaveData

                        })
                    .then(res => {
                        this.setState({ modalDisplay: true, modalMessage:"invoice"+" Templete Saved Successfully" })
                    }
                    )
                    .catch(err => console.log(err))
            }
        }




    }
    handleModalClose() {
        this.setState({ modalDisplay: false ,modalMessage:""})
    }
    handleModalOpen() {
        this.setState({ modalDisplay: true, modalMessage:"helooooooooooo" })
    }
    handleAlertClose() {
        this.setState({ alertDisplay: false })
    }
    handleAlertOpen() {
        this.setState({ alertDisplay: true })
    }
    componentDidMount() {
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        let types = ['taxonomy', 'invoice']

        for (let index in types) {
            axios
                .get(SERVER_URL + DEFAULT_TEMPLETES, { params: { project: currentUserProject, type: types[index] } })
                .then(res => {
                    let defaultTempleteDetails = { path: "invoice-upload-defaultTemplete", value: { pk: res.data[0].pk, name: res.data[0].fields.templeteName, items: res.data[0].fields.templeteItems } };
                    let newdata = [];
                    for (let index in res.data) {
                        let tempdata = '';
                        tempdata = {
                            pk: res.data[index].pk,
                            name: res.data[index].fields.Name,
                            items: res.data[index].fields.Items
                        }
                        newdata.push(tempdata)
                    }
                    if (types[index] == 'taxonomy') {
                        this.setState({ taxonomyUploadDefaultTempletes: newdata })
                    }
                    else {
                        this.setState({ invoiceUploadDefaultTempletes: newdata })
                    }
                }
                )
                .catch(err => console.log(err));
        }
    }

    render() {
        const { classes } = this.props;
        let pathDic = {
            "taxonomy": "Taxonomy",
            "invoice": "Invoice"
        }
        return <>
            <Grid container spacing={0} style={{ padding: "0px 5px" }}>
                <Grid xs={12} sm={12} md={4} lg={4} xl={4} >
                    <div style={{ padding: "50px 5px" }}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            <Box color="white" bgcolor="#7E55D5">Upload Data</Box>
                        </Typography>
                        <div style={{ width: "100%", margin: "20px 0px 0px 0px" }}>
                            <DropDownSelect
                                dataList={this.state["invoice" + "UploadDefaultTempletes"]}
                                DataType="KeyValue"
                                label="Default Templete"
                                onChangeEvent={(event) => this.defaultTempleteSelectHandle(event)}
                            />
                        </div>
                        <Button
                            size="large"
                            variant="outlined"
                            component="label"
                            color="primary"
                            style={{ width: "100%", margin: "20px 0px" }}
                            startIcon={<CloudUploadIcon />}
                            onChange={(event) => this.uploadFileHandle(event)}
                        >
                            {this.state.AttachmnetFileName}
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
                        <DropDownSelect
                            dataList={this.state["invoice" + "SavedTempletes"]}
                            DataType="KeyValue"
                            label="Saved Templete"
                            onChangeEvent={(event) => this.savedTempleteSelectHandle(event)}

                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ width: "100%", margin: "20px 0px" }}
                            onClick={this.uploadDatahandle}
                        >{"Upload " + "invoice" + " Data"}</Button>
                    </div>
                </Grid>
                <Grid xs={12} sm={12} md={8} lg={8} xl={8} spacing={10}>
                    <div style={{ padding: "50px 5px" }}>
                        <Grid>
                            <div style={{ width: "100%", margin: "0px 0px 20px 0px" }}>
                                <Typography color="primary" variant="h6" component="h2" align="center" gutterBottom>
                                    <Box color="white" bgcolor="#7E55D5">{pathDic["invoice"] + " Mapping"}</Box>
                                </Typography>
                            </div>
                            <Grid container >
                                <Grid xs={12} sm={12} md={6} lg={6} xl={6} style={{ width: "100%", margin: "0px 0px 20px 0px" }}>
                                    <Grid xs={12} sm={12} md={11} lg={11} xl={11}>
                                        <div >
                                            <DropDownSelect
                                                dataList={this.state.SelectedDefaultTempleteItems}
                                                // dataList={[1,2,3,4]}
                                                label="Default Columns"
                                                DataType="GroupData"
                                                onChangeEvent={(event) => this.defaultColumnSelectHandle(event, 'map-FileColumnSelected', "invoice")}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid xs={0} sm={0} md={1} lg={1} xl={1}>

                                    </Grid>

                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} xl={6} style={{ width: "100%", margin: "0px 0px 20px 0px" }}>
                                    <div >
                                        <DropDownSelect
                                            dataList={this.state.AttachFileHeaderData}
                                            label="File Columns"
                                            DataType="ListData"
                                            onChangeEvent={(event) => this.fileColumnSelectHandle(event, 'map-FileColumnSelected', "invoice")}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div style={{ width: "100%", margin: "0px 0px 25px 0px" }}>
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={(event) => this.addMapData(event)}
                                style={{ margin: "0px 10px 0px 0px" }}
                            >
                                Add
                                    </Button>
                            {/* <Button
                                color="primary"
                                variant="contained"
                                startIcon={<DoneAllIcon />}
                            >
                                Select All
                                    </Button> */}
                            <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                onClick={() => this.DeleteSelectedhandle()}
                            >
                                Delete
                                    </Button>
                        </div>
                        <div>
                            <Grid container mt={5} spacing={0} style={{ "overflow": "auto", "width": "100%" }}>
                                <TableData
                                    TableHeaderData={["Data Columns", "Type", "Sensitivity", "Mapping"]}
                                    TableDataList={this.state.newTempleteData}
                                    SelectAllEvent={(event) => this.SelectAllEventHandle(event)}
                                    SingleSelectEvent={(event) => this.SingleSelectEventHandle(event)}
                                />
                            </Grid>
                        </div>
                        <div >
                            <Grid container spacing={0} style={{ width: "100%" }}>

                                <Grid xs={12} sm={12} md={8} lg={8} xl={8} >
                                    <Grid xs={12} sm={12} md={11} lg={11} xl={11} >
                                        <TextField
                                            label="New Templete Name"
                                            id="outlined-size-small"
                                            defaultValue=""
                                            size="small"
                                            style={{ width: "100%", margin: "20px 0px 0px 0px" }}
                                            onKeyUp={(event) => this.props["invoiceAndTaxonomyUploadAndMap"]({ path: "invoice" + '-' + 'map-newTempleteName', value: event.target.value })}
                                        />
                                    </Grid>
                                    <Grid xs={0} sm={0} md={1} lg={1} xl={1} >

                                    </Grid>
                                </Grid>

                                <Grid xs={12} sm={12} md={4} lg={4} xl={4} >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => this.AddNewTempleteHandle()}
                                        style={{ width: "100%", "alignContent": "centre", margin: "20px 0px 0px 0px" }}
                                    >
                                        Save Templete
                                        </Button>
                                </Grid>
                                <MainModal
                                    // modalDisplay={this.state.modalDisplay}
                                    modalDisplay={this.state.modalDisplay}
                                    message={this.state.modalMessage}
                                    handleModalClose={()=>this.handleModalClose()}
                                />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => this.handleModalOpen()}
                                    style={{ width: "100%", "alignContent": "centre", margin: "20px 0px 0px 0px" }}
                                >
                                    Modal Test
                                        </Button>

                            </Grid>
                        </div>
                    </div>
                </Grid>

            </Grid>

        </>
    }

}
// export default withStyles(useStyles)(TaxonomyUpload);

const mapDispatchToProps = (dispatch) => {
    return {
        invoiceAndTaxonomyUploadAndMap: (e) => dispatch(invoiceAndTaxonomyUploadAndMap(e))
    }
}
export default connect((state) => ({
    store: state
}), mapDispatchToProps)(TaxonomyUpload)

