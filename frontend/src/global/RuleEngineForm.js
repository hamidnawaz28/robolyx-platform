import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import TableData from "./TableComplete"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DropDownSelect from './dropDownSelect';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'; 
import {
    RULE_ENGINE_OPERATORS,
    PRIORITY_LIST,
    SERVER_URL,
    DATA_COLUMNS,
    RULE_ENGINE,
    RULE_ENGINE_TEST,
    DATA_ATTRIBUTES_FOR_COLUMNS,
    DATA_ATTRIBUTES_WITH_TYPE
} from "./constants";

const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});

function queryData(self){
    let currentUserProject = self.props.store.taxonomyandinvoicestore.user.project;
        let query = {}
        for(let index= 1 ;index<4;index++){
            query["FIELD_"+index] = self.state.queryData["FIELD_"+index]
            query["OPERATOR_"+index] = self.state.queryData["OPERATOR_"+index]
            query["VALUE_"+index] = self.state.queryData["VALUE_"+index]
        }
        axios
            .get(SERVER_URL + RULE_ENGINE_TEST, { 
                params: { 
                    project: currentUserProject,
                    query: query,
                    currentPage: self.state.tableCurrentPage,
                    perPage: self.state.tablePerPage
                } 
            })
            .then(res => {
                let queryOutputData = JSON.parse(res.data.queryData)
                self.setState({ testRuleEngineData: queryOutputData, tableTotalRows: res.data.count })
            }
            )
            .catch(err => console.log(err));
}

class RuleEngineForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryData: {
                PRIORITY: "",
                CATAGORY_LEVEL_ONE: '',
                CATAGORY_LEVEL_TWO: '',
                CATAGORY_LEVEL_THREE: '',
                CATAGORY_LEVEL_FOUR: '',
                CATAGORY_LEVEL_FIVE: '',
                FIELD_1: "",
                OPERATOR_1: "",
                VALUE_1: "",
                FIELD_2: "",
                OPERATOR_2: "",
                VALUE_2: "",
                FIELD_3: "",
                OPERATOR_3: "",
                VALUE_3: ""
            },
            catagoryLevel: "3",
            CATAGORY_LEVEL_ONE_Data: [],
            CATAGORY_LEVEL_TWO_Data: [],
            CATAGORY_LEVEL_THREE_Data: [],
            CATAGORY_LEVEL_FOUR_Data: [],
            CATAGORY_LEVEL_FIVE_Data: [],
            FIELD_1_Type: 'string',
            FIELD_2_Type: 'string',
            FIELD_3_Type: 'string',
            testRuleEngineData: {},
            tableTotalRows: 0,
            tablePerPage: 3,
            tableCurrentPage: 0,
        }
    }

    componentDidMount() {
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        axios
            .get(SERVER_URL + DATA_COLUMNS + "/", { params: { project: currentUserProject, catagories: this.state.catagoriesSelected } })
            .then(res => {
                debugger
                let catagories = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]
                if (res.data.length == 1 && res.data[0] == '') {
                    this.state["CATAGORY_LEVEL_ONE_Data"] = []
                }
                else {
                    for (let index in catagories) {
                        this.setState({ ["CATAGORY_LEVEL_" + catagories[index] + "_Data"]: res.data["CATAGORY_LEVEL_" + catagories[index]] })
                    }
                }
                if (this.props.actionType == "Edit") {
                    let queryDataPrv = this.state.queryData;
                    let queryDataNew = {}
                    for(let key in queryDataPrv){
                        queryDataNew[key]= this.props.formData.fields[key]
                        }
                    this.setState({queryData:queryDataNew})
                    }    
            }
            )
            .catch(err => console.log(err));
            
    }
    querySelectHandle(event, field) {
        let value = event.target.value
        let queryData = this.state.queryData;
        let newQueryData = {}
        for (let queryItems in queryData) {
            queryItems == field ? newQueryData[queryItems] = value : newQueryData[queryItems] = queryData[queryItems]
        }
        this.setState({ queryData: newQueryData })
    }
    queryFieldSelectHandle(event, field) {
        let selectedIndex = event.target.selectedIndex;
        let dataType = event.target.options[selectedIndex].getAttribute("dataType");
        this.setState({ [field + "_Type"]: dataType })
        let value = event.target.value
        let queryData = this.state.queryData;
        let newQueryData = {}
        for (let queryItems in queryData) {
            queryItems == field ? newQueryData[queryItems] = value : newQueryData[queryItems] = queryData[queryItems]
        }
        this.setState({ queryData: newQueryData })
    }
    catagoryLevelChangeHandle(event) {
        let value = event.target.value
        this.setState({ catagoryLevel: value })
    }
    resetQueryHandle() {
        let queryData = this.state.queryData
        let newQueryData = {}
        for (let queryItems in queryData) {
            newQueryData[queryItems] = ''
        }
        this.setState({ queryData: newQueryData })
        this.props.onResetClick()
    }
    testRuleHandle(){
        queryData(this)
    }
    addEditRuleHandle() {
        let currentUserProject = this.props.store.taxonomyandinvoicestore.user.project;
        let query = this.state.queryData;
        if(this.props.actionType == 'Add'){
            axios
            .post(SERVER_URL + RULE_ENGINE, {
                query: query,
                UserProjectReference: currentUserProject
            })
            .then(res => {
                alert(res.data)
                this.props.formCloseEvent()
            })
            .catch(err => console.log(err))
        }
        else{
            let pk = this.props.formData.pk;
            axios
            .put(SERVER_URL + RULE_ENGINE, {
                query: query,
                pk: pk
            })
            .then(res => {
                alert(res.data)
                this.props.formCloseEvent()
            })
            .catch(err => console.log(err))
        }
    }
    changePageHandle(event){
        let prevState = this.state.tableCurrentPage;
        event.currentTarget.ariaLabel == "Next page" ? this.state.tableCurrentPage = prevState + 1 : this.state.tableCurrentPage = prevState - 1
        queryData(this)
    }
    changeRowsPerPageHandle(event){
        let newTablePerPage = event.target.value;
        newTablePerPage = parseInt(newTablePerPage)
        this.state.tablePerPage = newTablePerPage;
        this.state.tableCurrentPage = 0;
        queryData(this)
    }
    render() {
        const CATAGORIES = { 1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR", 5: "FIVE" }
        let catagoryLevel = this.state.catagoryLevel;
        let levelArray = [];
        catagoryLevel = parseInt(catagoryLevel);
        for (let index = 0; index < catagoryLevel; index++) {
            levelArray.push(index + 1)
        }
        return <>
            <div>
                <Dialog open={this.props.formState}
                    onClose={this.props.formCloseEvent}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth='lg'
                >
                    <DialogTitle id="form-dialog-title">
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            <Box >{this.props.actionType} Rule
                            </Box>
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={0}>
                            <Box m={1}>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    InputProps={{ inputProps: { min: 2, max: 5, shrink: true } }}
                                    onChange={(e) => this.catagoryLevelChangeHandle(e)}
                                    value = {this.state.catagoryLevel}
                                >
                                    <MenuItem value={2}>Two</MenuItem>
                                    <MenuItem value={3}>Three</MenuItem>
                                    <MenuItem value={4}>Four</MenuItem>
                                    <MenuItem value={5}>Five</MenuItem>
                                </Select>
                            </Box>
                            <Grid container spacing={0}>
                                <Grid xs={6} sm={6} md={9} lg={9} xl={9} >
                                    <Grid container spacing={0}>
                                        {levelArray.map(key =>
                                            <Grid xs={6} sm={6} md={3} lg={3} xl={3} >
                                                <Box m={1}>
                                                    <DropDownSelect
                                                        dataList={this.state["CATAGORY_LEVEL_" + CATAGORIES[key] + "_Data"]}
                                                        label={"Catagory Level " + key}
                                                        DataType="ListData"
                                                        catagoryLevel={key}
                                                        selectedValue={this.state.queryData["CATAGORY_LEVEL_" + CATAGORIES[key]]}
                                                        onChangeEvent={(event) => this.querySelectHandle(event, "CATAGORY_LEVEL_" + CATAGORIES[key])}
                                                    />
                                                </Box>
                                            </Grid>
                                        )}
                                        <Grid xs={6} sm={6} md={6} lg={3} xl={3} style={{ width: "100%" }}>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={6} sm={6} md={3} lg={3} xl={3}>
                                    <Box m={1}>
                                        <DropDownSelect
                                            dataList={PRIORITY_LIST}
                                            label="Priority"
                                            DataType="ListData"
                                            selectedValue={this.state.queryData["PRIORITY"]}
                                            onChangeEvent={(event) => this.querySelectHandle(event, "PRIORITY")}
                                        />
                                    </Box>
                                </Grid>

                                <Grid container spacing={0}>

                                    <Grid xs={6} sm={6} md={10} lg={9} xl={9} >
                                        <Grid container spacing={0}>
                                            {
                                                [1, 2, 3].map(item =>
                                                    <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                                                        <Box m={1}>
                                                            <DropDownSelect
                                                                dataList={DATA_ATTRIBUTES_WITH_TYPE}
                                                                label={"Field_" + item}
                                                                DataType="GroupDataWithType"
                                                                selectedValue={this.state.queryData["FIELD_" + item]}
                                                                onChangeEvent={(event) => this.queryFieldSelectHandle(event, "FIELD_" + item)}
                                                            />
                                                        </Box>
                                                        <Box m={1}>
                                                            <DropDownSelect
                                                                dataList={RULE_ENGINE_OPERATORS[this.state["FIELD_" + item + "_Type"]]}
                                                                label={"Operator_" + item}
                                                                DataType="ListData"
                                                                selectedValue={this.state.queryData["OPERATOR_" + item]}
                                                                onChangeEvent={(event) => this.querySelectHandle(event, "OPERATOR_" + item)}
                                                            /></Box>
                                                        <Box m={1}>
                                                            <TextField
                                                                label={"Value_" + item}
                                                                type={this.state["FIELD_" + item + "_Type"]}
                                                                id={this.state["FIELD_" + item + "_Type"]}
                                                                value={this.state.queryData["VALUE_" + item]}
                                                                style={{ width: "100%" }}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                onChange={(event) => this.querySelectHandle(event, "VALUE_" + item)}
                                                            />
                                                        </Box>
                                                    </Grid>

                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid xs={6} sm={6} md={10} lg={3} xl={3} >
                                        <Box m={1} justifyContent="center" alignItems="center" display="flex" css={{ height: 170 }}>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                startIcon={<FindInPageIcon />}
                                                onClick={()=>this.testRuleHandle()}
                                                style={{ margin: "0px 10px 0px 0px" }}
                                                queryData={JSON.stringify(this.state.queryData)}
                                            >
                                                Test
                                    </Button>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                startIcon={<AddCircleOutlineIcon />}
                                                onClick={() => this.addEditRuleHandle()}
                                                style={{ margin: "0px 10px 0px 0px" }}
                                            >
                                                {this.props.actionType == 'Add' ? 'Add' : "Update"}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <TableData
                                TableHeaderData={DATA_ATTRIBUTES_FOR_COLUMNS}
                                TableDataList={this.state.testRuleEngineData}
                                totalRows={this.state.tableTotalRows}
                                perPage={this.state.tablePerPage}
                                currentPage={this.state.tableCurrentPage}
                                changePageEvent={(event) => this.changePageHandle(event)} 
                                changeRowsPerPageEvent={(event) => this.changeRowsPerPageHandle(event)}
                                selectOption={false}
                                paginationOption={true}
                            />
                        </Grid>
                    </DialogContent>
                    <Grid container justify="center">
                        <DialogActions position="centre">
                            <Button onClick={this.props.formCloseEvent} variant="outlined" color="primary">
                                Cancel
                        </Button>
                        </DialogActions>
                    </Grid>
                </Dialog>
            </div>
        </>
    }
}

export default connect((state) => ({
    store: state
}))(RuleEngineForm);
