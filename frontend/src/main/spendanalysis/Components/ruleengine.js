import React from 'react';
import axios from 'axios';
import { invoiceAndTaxonomyUploadAndMap } from "../../../global/actions"
import { connect } from "react-redux";
import Box from '@material-ui/core/Box';
import TableData from "../../../global/TableComplete"
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import RuleEngineSearchForm from '../../../global/RuleEngineQueryForm';
import RuleEngineForm from '../../../global/RuleEngineForm';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'; 
import DoneIcon from '@material-ui/icons/Done';
import {
    SERVER_URL,
    DATA_COLUMNS,
    RULE_ENGINE,
    RULE_ENGINE_TEST,
    DATA_ATTRIBUTES_FOR_RULE_ENGINE
} from "../../../global/constants";


const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});

function queryData(self) {
    let currentUserProject = self.props.store.taxonomyandinvoicestore.user.project;
    let query = self.state.query
    query["STATUS"] = self.state.ruleStatus;
    axios
        .get(SERVER_URL + RULE_ENGINE, {
            params:
            {
                UserProjectReference: currentUserProject,
                query: JSON.stringify(query)
            }
        })
        .then(res => {
            let queryOutputData = res.data
            self.setState({ tableTotalRows: queryOutputData.length })
            let CATAGORIES = ''
            let AllCatagories = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
            for (let index in queryOutputData) {
                queryOutputData[index]['IsChecked'] = false
                for (let catagoryIndex in AllCatagories) {
                    if (queryOutputData[index].fields["CATAGORY_LEVEL_" + AllCatagories[catagoryIndex]] != '') {
                        CATAGORIES == '' ?
                            CATAGORIES += queryOutputData[index].fields["CATAGORY_LEVEL_" + AllCatagories[catagoryIndex]]
                            : CATAGORIES += ">" + queryOutputData[index].fields["CATAGORY_LEVEL_" + AllCatagories[catagoryIndex]]
                    }

                }
                queryOutputData[index].fields["CATAGORIES"] = CATAGORIES
                CATAGORIES = ''
            }
            self.setState({ ruleEngineData: queryOutputData })
        }
        )
        .catch(err => console.log(err));
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

class RuleEngine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {},
            catagoryLevel: '3',
            tableTotalRows: 0,
            tablePerPage: 10,
            tableCurrentPage: 0,
            selectAllStatus: false,
            selectedRow: '',
            actionType: '',
            formState: false,
            ruleEngineData: {},
            cataoriesData: {
                CATAGORY_LEVEL_ONE: [],
                CATAGORY_LEVEL_TWO: [],
                CATAGORY_LEVEL_THREE: [],
                CATAGORY_LEVEL_FOUR: [],
                CATAGORY_LEVEL_FIVE: [],
            },
            ruleStatus: "draft"
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
        let ruleEngineData = this.state.ruleEngineData;
        let updatedData = [];
        for (let index in ruleEngineData) {
            let item = ruleEngineData[index];
            item['IsChecked'] = event.target.checked
            updatedData.push(item)
        }
        this.setState({ ruleEngineData: updatedData })
    }
    singleSelectHandle(event) {
        let pk = event.target.parentElement.parentElement.getAttribute("pk")
        if(pk ==null){
            pk = event.target.parentElement.getAttribute("pk")
        }
        let ruleEngineData = this.state.ruleEngineData;
        for (let index in ruleEngineData) {
            if (ruleEngineData[index]['pk'] == pk) {
                ruleEngineData[index]['IsChecked'] = !ruleEngineData[index]['IsChecked']
            }
        }
        this.setState({ ruleEngineData: ruleEngineData })
    }
    deleteDataHandle(event) {
        let ruleEngineData = this.state.ruleEngineData;
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        let pkArray = [];
        for (let index in ruleEngineData) {
            if (ruleEngineData[index]['IsChecked'] == true) {
                pkArray.push(ruleEngineData[index]['pk'])
            }
        }
        axios
            .delete(SERVER_URL + RULE_ENGINE,
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
            }
            )
            .catch(err => console.log(err));
    }
    
    
    searchEvent(event, queryDataFun) {
        let queryData = JSON.parse(event.target.parentElement.getAttribute("queryData"))
        if (queryData == null) {
            queryData = JSON.parse(event.target.getAttribute("queryData"))
        }
        let query = {}
        for (let item in queryData) {
            if (queryData[item] != "") {
                query[item] = queryData[item]
            }
        }
        this.state.query = query
        queryDataFun(this)

    }
    resetEvent(queryDataFun) {
        this.state.query = {}
        queryDataFun(this)
    }
    statusChange(event) {
        this.state.ruleStatus = event;
        queryData(this)
    }
    editRuleHandle(){
        let ruleEngineData = this.state.ruleEngineData;
        let outArray = []
        for (let index in ruleEngineData) {
            if (ruleEngineData[index]['IsChecked'] == true) {
                outArray.push(ruleEngineData[index])
            }
        }
        if(outArray.length>1 || outArray.length==0){
            alert("Select A single Row")
        }
        else{
            this.setState({formState:true,actionType:"Edit", selectedRow:outArray[0]})
        }
    }
    addRuleHandle() {
        this.setState({formState:true,actionType:"Add"})
    }
    formCloseHandle(){
        this.setState({ formState: false })
        queryData(this)
    }
    updateDataFunction(){
        this.state.formState=false
        queryData(this)
    }
    ruleIdSelectEvent(event){
        let value = event.target.value
        this.state.query = {value}
        // Add code for rule ID API
    }
    implementRuleHandle(){
        let ruleEngineData = this.state.ruleEngineData;
        let outArray = []
        for (let index in ruleEngineData) {
            if (ruleEngineData[index]['IsChecked'] == true) {
                outArray.push(ruleEngineData[index])
            }
        }
        if(outArray.length>1 || outArray.length==0){
            alert("Select A single Row")
        }
        else{
            this.setState({selectedRow:outArray[0]})
        }
        let pkList = []
        pkList.push(outArray[0].pk)
        axios
            .post(SERVER_URL + RULE_ENGINE_TEST+"/", {
                pkList: pkList
            })
            .then(res => {
                alert(res.data)
                queryData(this)
            })
            .catch(err => console.log(err))
    }
    implementAllRuleHandle(){
        let ruleEngineData = this.state.ruleEngineData;
        let outArray = []
        for (let index in ruleEngineData) {
            if (ruleEngineData[index]['IsChecked'] == true) {
                outArray.push(ruleEngineData[index])
            }
        }
    }
    componentDidMount() {
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        queryData(this)
        axios
            .get(SERVER_URL + DATA_COLUMNS + "/", { params: { project: currentUserProject, catagories: this.state.catagoriesSelected } })
            .then(res => {
                let catagories = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
                if (res.data.length == 1 && res.data[0] == '') {
                    this.state["CATAGORY_LEVEL_ONE_Data"] = []
                }
                else {
                    for (let index in catagories) {
                        this.setState({ ["CATAGORY_LEVEL_" + catagories[index]]: res.data["CATAGORY_LEVEL_" + catagories[index]] })
                    }
                }
                this.setState({})
            }
            )
            .catch(err => console.log(err));
    }
    render() {
        const { classes } = this.props;
        const CATAGORIES = { 1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR", 5: "FIVE" }
        let catagoryLevel = this.state.catagoryLevel;
        let levelArray = [];
        catagoryLevel = parseInt(catagoryLevel);
        for (let index = 0; index < catagoryLevel; index++) {
            levelArray.push(index + 1)
        }

        return <>
            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top" value={this.state.ruleStatus}>
                    <Button
                            color={this.state.ruleStatus == "draft" ? "secondary" : "default"}
                            variant="contained"
                            style={{ border: '1px solid #232f3e', borderRight: '0px', borderRadius: '0px' }}
                            children="Draft"
                            onClick={() => this.statusChange('draft')}
                        />
                    <Button
                            color={this.state.ruleStatus == "implemented" ? "secondary" : "default"}
                            variant="contained"
                            style={{ border: '1px solid #232f3e', borderLeft: '0px', borderRadius: '0px'}}
                            children="Implemented"
                            onClick={() => this.statusChange('implemented')}
                        />
                </RadioGroup>
            </FormControl>
            
            <RuleEngineSearchForm
                onSearchClick={(event) => this.searchEvent(event, queryData)}
                onResetClick={() => this.resetEvent(queryData)}
                ruleIdSelectEvent ={(event)=>this.ruleIdSelectEvent(event)}
            />
            <Box m={1}>
                {this.state.ruleStatus == "draft" ?
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<DoneIcon />}
                        onClick={() => this.implementRuleHandle()}
                        style={{ margin: "0px 10px 0px 0px" }}
                        >
                        Implement
                    </Button>
                    {/* <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.implementAllRuleHandle()}
                        style={{ margin: "0px 10px 0px 0px" }}
                        >
                        Implement All
                    </Button> */}
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => this.addRuleHandle()}
                        style={{ margin: "0px 10px 0px 0px" }}
                        >
                        Add
                    </Button>
                </>
                    : <></>}
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<EditIcon />} 
                    onClick={() => this.editRuleHandle()}
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
                TableHeaderData={DATA_ATTRIBUTES_FOR_RULE_ENGINE}
                TableDataList={this.state.ruleEngineData}
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
            {   this.state.formState &&
                    <RuleEngineForm
                        formState={this.state.formState}
                        actionType = {this.state.actionType}
                        formData =  {this.state.selectedRow}
                        updateDataFunction = {()=>this.updateDataFunction()}
                        formCloseEvent={() => this.formCloseHandle()}
                    />
            }
        </>
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        invoiceAndTaxonomyUploadAndMap: (e) => dispatch(invoiceAndTaxonomyUploadAndMap(e))
    }
}
export default connect((state) => ({
    store: state
}), mapDispatchToProps)(RuleEngine);
