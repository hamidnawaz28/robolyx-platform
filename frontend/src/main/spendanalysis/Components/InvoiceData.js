import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import TableData from "../../../global/TableComplete"
import { connect } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import FormPopup from '../../../global/InvoiceForm'
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import EditIcon from '@material-ui/icons/Edit'; 
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'; 
import {
    SERVER_URL,
    DATA_COLUMNS,
    INVOICE_DATA,
    DATA_ATTRIBUTES_FOR_COLUMNS
} from "../../../global/constants";

const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});
function queryData(self) {
    let currentUserProject = self.props.store.taxonomyandinvoicestore.user.project;
    let queryData = self.state.queryData;
    let query = {}
    for (let key in queryData) {
        if (queryData[key] != '') {
            query[key] = queryData[key]
        }
    }
    axios
        .get(SERVER_URL + INVOICE_DATA,
            {
                params:
                {
                    project: currentUserProject,
                    query: query,
                    currentPage: self.state.tableCurrentPage,
                    perPage: self.state.tablePerPage
                }
            })
        .then(res => {
            debugger;
            self.setState({ tableTotalRows: res.data.count })
            let queryOutputData = JSON.parse(res.data.queryData)
            for (let index in queryOutputData) {
                queryOutputData[index]['IsChecked'] = false
            }
            self.setState({ invoiceData: queryOutputData })
        }
        )
        .catch(err => console.log(err));
}
class InvoiceData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Table States
            tableTotalRows: 0,
            tablePerPage: 5,
            tableCurrentPage: 0,
            selectAllStatus: false,
            actionType: '',
            formState:false,
            invoiceData: {},
            selectedRow : '',
            queryData: {
                INVOICE_ID: '',
                GL_DATE: '',
                INV_ORGINE: '',
                INV_DATE: '',
                INV_SOURCE: '',
                INV_NUMBER: '',
                VENDOR_NUMBER: '',
                VENDOR_NAME: '',
                VENDOR_TYPE: '',
                INV_TERMS: '',
                LINE_NUMBER: '',
                LINE_TYPE: '',
                LINE_DESCRIPTION: '',
                LINE_QUANTITY: '',
                LINE_UNIT_PRICE: '',
                LINE_UNIT_OF_MEASURE: '',
                LINE_AMOUNT: '',
                GENERAL_LEDGER: '',
                LOCATION: '',
                DEPARTMENT: '',
                ACCOUNT: '',
                PO_NUMBER: '',
                CREATION_DATE: ''
            }
        }
    }
    changePageHandle(event) {
        let prevState = this.state.tableCurrentPage;
        event.currentTarget.ariaLabel == "Next page" ? this.state.tableCurrentPage = prevState + 1 : this.state.tableCurrentPage = prevState - 1
        queryData(this)
    }
    changeRowsPerPageHandle(event) {
        let newTablePerPage = event.target.value;
        newTablePerPage = parseInt(newTablePerPage)
        this.state.tablePerPage = newTablePerPage;
        this.state.tableCurrentPage = 0;
        queryData(this)
    }
    selectAllHandle(event) {
        this.setState({ selectAllStatus: event.target.checked })
        let invoiceData = this.state.invoiceData;
        let updatedData = [];
        for (let index in invoiceData) {
            let item = invoiceData[index];
            item['IsChecked'] = event.target.checked
            updatedData.push(item)
        }
        this.setState({ invoiceData: updatedData })
    }
    singleSelectHandle(event) {
        let pk = event.target.parentElement.parentElement.getAttribute("pk")
        if(pk ==null){
            pk = event.target.parentElement.getAttribute("pk")
        }
        let invoiceData = this.state.invoiceData;
        for (let index in invoiceData) {
            if (invoiceData[index]['pk'] == pk) {
                invoiceData[index]['IsChecked'] = !invoiceData[index]['IsChecked']
            }
        }
        this.setState({ invoiceData: invoiceData})
    }
    fieldSelectHandle(event,field) {
        debugger
        let value = event.target.value;
        let queryData = this.state.queryData; 
        let newQueryData = {}
        for(let data in queryData){
            if(data==field){
                newQueryData[data] = value
            }
            else{
                newQueryData[data] = queryData[data]
            }
        }
        this.setState({queryData:newQueryData})
    }
    searchQueryHandle(event) {
        this.state.tableCurrentPage = 0;
        queryData(this)
    }
    resetQueryHandle(event) {
        Object.keys(this.state.queryData).map(key => this.state.queryData[key] = '')
        this.setState({})
        this.state.tableCurrentPage = 0;
        queryData(this)
    }
    addNewDataHandle(event) {
        this.setState({formState:true,actionType:"Add"})
    }
    editDataHandle(event) {
        let invoiceData = this.state.invoiceData;
        let outArray = []
        for (let index in invoiceData) {
            if (invoiceData[index]['IsChecked'] == true) {
                outArray.push(invoiceData[index])
            }
        }
        if(outArray.length>1 || outArray.length==0){
            alert("Select A single Row")
        }
        else{
            this.setState({formState:true,actionType:"Edit", selectedRow:outArray[0]})
        }
    }
    formCloseHandle(){
        this.setState({formState:false})
    }
    deleteDataHandle(event) {
        let invoiceData = this.state.invoiceData;
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        let pkArray = [];
        for (let index in invoiceData) {
            if (invoiceData[index]['IsChecked'] == true) {
                pkArray.push(invoiceData[index]['pk'])
            }
        }
        axios
            .delete(SERVER_URL +  INVOICE_DATA,
                {
                    params:
                    {
                        project: currentUserProject,
                        pkList: JSON.stringify(pkArray)
                    }
                })
            .then(res => {
                queryData(this)
                this.state.selectAllStatus = false
                alert(res.data)
                queryData(this)
            }
            )
            .catch(err => console.log(err));
        

    }
    updateDataFunction(){
        this.state.formState=false
        queryData(this)
    }
    componentDidMount() {
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        axios
            .get(SERVER_URL + DATA_COLUMNS + "/", { params: { project: currentUserProject, catagories: this.state.catagoriesSelected } })
            .then(res => {
                let catagories = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
                if (res.data.length == 1 && res.data[0] == '') {
                    this.state["CATAGORY_LEVEL_ONE_Data"] = []
                }
                else {
                    for (let index in catagories) {
                        this.setState({ ["CATAGORY_LEVEL_" + catagories[index] + "_Data"]: res.data["CATAGORY_LEVEL_" + catagories[index]] })
                    }
                }
                this.setState({})
            }
            )
            .catch(err => console.log(err));
        queryData(this)

    }
    render() {
        return <>
            <Grid container spacing={0}>
                <Grid xs={6} sm={6} md={10} lg={10} xl={10} >
                    <Grid container spacing={0}>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INVOICE_ID"
                                        value={this.state.queryData.INVOICE_ID}
                                        onChange={(event) => this.fieldSelectHandle(event, "INVOICE_ID")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3}  >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        label="GL_DATE"
                                        value={this.state.queryData.GL_DATE}
                                        onChange={(event) => this.fieldSelectHandle(event, "GL_DATE")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INV_ORGINE"
                                        value={this.state.queryData.INV_ORGINE}
                                        onChange={(event) => this.fieldSelectHandle(event, "INV_ORGINE")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        label="INV_DATE"
                                        value={this.state.queryData.INV_DATE}
                                        onChange={(event) => this.fieldSelectHandle(event, "INV_DATE")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INV_SOURCE"
                                        value={this.state.queryData.INV_SOURCE}
                                        onChange={(event) => this.fieldSelectHandle(event, "INV_SOURCE")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="INV_NUMBER"
                                        value={this.state.queryData.INV_NUMBER}
                                        onChange={(event) => this.fieldSelectHandle(event, "INV_NUMBER")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="outlined-basic" 
                                        variant="outlined"
                                        style ={{width:"100%"}}
                                        label="VENDOR_NUMBER"
                                        value={this.state.queryData.VENDOR_NUMBER}
                                        onChange={(event) => this.fieldSelectHandle(event, "VENDOR_NUMBER")}
                                    />
                                </Box>
                            </Grid>
                            {/* <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="VENDOR_NAME"
                                        variant="filled"
                                        value={this.state.queryData.VENDOR_NAME}
                                        onChange={(event) => this.fieldSelectHandle(event, "VENDOR_NAME")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="VENDOR_TYPE"
                                        variant="filled"
                                        value={this.state.queryData.VENDOR_TYPE}
                                        onChange={(event) => this.fieldSelectHandle(event, "VENDOR_TYPE")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="INV_TERMS"
                                        variant="filled"
                                        value={this.state.queryData.INV_TERMS}
                                        onChange={(event) => this.fieldSelectHandle(event, "INV_TERMS")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="LINE_NUMBER"
                                        variant="filled"
                                        value={this.state.queryData.LINE_NUMBER}
                                        onChange={(event) => this.fieldSelectHandle(event, "LINE_NUMBER")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="LINE_TYPE"
                                        variant="filled"
                                        value={this.state.queryData.LINE_TYPE}
                                        onChange={(event) => this.fieldSelectHandle(event, "LINE_TYPE")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="LINE_DESCRIPTION"
                                        variant="filled"
                                        value={this.state.queryData.LINE_DESCRIPTION}
                                        onChange={(event) => this.fieldSelectHandle(event, "LINE_DESCRIPTION")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="LINE_QUANTITY"
                                        variant="filled"
                                        value={this.state.queryData.LINE_QUANTITY}
                                        onChange={(event) => this.fieldSelectHandle(event, "LINE_QUANTITY")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        label="LINE_UNIT_PRICE"
                                        variant="filled"
                                        type
                                        value={this.state.queryData.LINE_UNIT_PRICE}
                                        onChange={(event) => this.fieldSelectHandle(event, "LINE_UNIT_PRICE")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="LINE_UNIT_OF_MEASURE"
                                        variant="filled"
                                        value={this.state.queryData.LINE_UNIT_OF_MEASURE}
                                        onChange={(event) => this.fieldSelectHandle(event, "LINE_UNIT_OF_MEASURE")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="standard-number"
                                        type="number"
                                        label="LINE_AMOUNT"
                                        variant="filled"
                                        value={this.state.queryData.LINE_AMOUNT}
                                        onChange={(event) => this.fieldSelectHandle(event, "LINE_AMOUNT")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="GENERAL_LEDGER"
                                        variant="filled"
                                        value={this.state.queryData.GENERAL_LEDGER}
                                        onChange={(event) => this.fieldSelectHandle(event, "GENERAL_LEDGER")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="LOCATION"
                                        variant="filled"
                                        value={this.state.queryData.LOCATION}
                                        onChange={(event) => this.fieldSelectHandle(event, "LOCATION")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="DEPARTMENT"
                                        variant="filled"
                                        value={this.state.queryData.DEPARTMENT}
                                        onChange={(event) => this.fieldSelectHandle(event, "DEPARTMENT")}
                                    />
                                </Box>
                            </Grid>

                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="ACCOUNT"
                                        variant="filled"
                                        value={this.state.queryData.ACCOUNT}
                                        onChange={(event) => this.fieldSelectHandle(event, "ACCOUNT")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="PO_NUMBER"
                                        variant="filled"
                                        value={this.state.queryData.PO_NUMBER}
                                        onChange={(event) => this.fieldSelectHandle(event, "PO_NUMBER")}
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={3} sm={3} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="CREATION_DATE"
                                        variant="filled"
                                        type="date"
                                        value={this.state.queryData.CREATION_DATE}
                                        onChange={(event) => this.fieldSelectHandle(event, "CREATION_DATE")}
                                    />
                                </Box>
                            </Grid> */}
                    </Grid>
                </Grid>
                <Grid xs={6} sm={6} md={10} lg={2} xl={2} >
                    <Box m={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            onClick={() => this.searchQueryHandle()}
                            style={{ margin: "0px 10px 0px 0px" }}
                        >
                            Search
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<RotateLeftIcon />}
                            onClick={() => this.resetQueryHandle()}
                            style={{ margin: "0px 10px 0px 0px" }}
                        >
                            Reset
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Box m={1}>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => this.addNewDataHandle()}
                    style={{ margin: "0px 10px 0px 0px" }}
                >
                    Add
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => this.editDataHandle()}
                    style={{ margin: "0px 10px 0px 0px" }}
                >
                    Edit
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => this.deleteDataHandle()}
                    style={{ margin: "0px 10px 0px 0px" }}
                >
                    Delete
                </Button>
            </Box>
            <TableData
                TableHeaderData={DATA_ATTRIBUTES_FOR_COLUMNS}
                TableDataList={this.state.invoiceData}
                totalRows={this.state.tableTotalRows}
                perPage={this.state.tablePerPage}
                currentPage={this.state.tableCurrentPage}
                selectAllStatus={this.state.selectAllStatus}
                changePageEvent={(event) => this.changePageHandle(event)}
                changeRowsPerPageEvent={(event) => this.changeRowsPerPageHandle(event)}
                SelectAllEvent={(event) => this.selectAllHandle(event)}
                SingleSelectEvent={(event) => this.singleSelectHandle(event)}
                selectOption={true}
                paginationOption={true}
            />
            {
                this.state.formState &&
                    <FormPopup
                        actionType = {this.state.actionType}
                        formState = {this.state.formState}
                        formData =  {this.state.selectedRow}
                        updateDataFunction = {()=>this.updateDataFunction()}
                        formCloseEvent={()=>this.formCloseHandle()}
                    />
            }
        </>
    }

}
export default connect((state) => ({
    store: state
}))(InvoiceData);
