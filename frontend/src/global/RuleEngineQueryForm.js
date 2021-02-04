import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import DropDownSelect from './dropDownSelect';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import MenuItem from '@material-ui/core/MenuItem';
import {
    RULE_ENGINE_OPERATORS,
    PRIORITY_LIST,
    SERVER_URL,
    DATA_COLUMNS,
    TAXONOMY_DATA,
    DATA_ATTRIBUTES_WITH_TYPE,
    RULE_ENGINE_DATA
} from "./constants";

const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});
function queryData(self) {
    let currentUserProject = self.props.store.taxonomyandinvoicestore.user.project;
    let catagoriesSelected = self.state.catagoriesSelected;
    let query = {}
    for (let key in catagoriesSelected) {
        if (catagoriesSelected[key] != '') {
            query[key] = catagoriesSelected[key]
        }
    }
    axios
        .get(SERVER_URL + TAXONOMY_DATA,
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
            self.setState({ tableTotalRows: res.data.count })
            let queryOutputData = JSON.parse(res.data.queryData)
            for (let index in queryOutputData) {
                queryOutputData[index]['IsChecked'] = false
            }
            self.setState({ taxonomyData: queryOutputData })
        }
        )
        .catch(err => console.log(err));
}
class InvoiceData extends React.Component {
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
            ruleID: "",
            rulesData: [],
            allRulesId: [],
            catagoryLevel: "3",
            CATAGORY_LEVEL_ONE_Data: [],
            CATAGORY_LEVEL_TWO_Data: [],
            CATAGORY_LEVEL_THREE_Data: [],
            CATAGORY_LEVEL_FOUR_Data: [],
            CATAGORY_LEVEL_FIVE_Data: [],
            FIELD_1_Type: 'string',
            FIELD_2_Type: 'string',
            FIELD_3_Type: 'string'
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
            }
            )
            .catch(err => console.log(err));
        axios
        .get(SERVER_URL + RULE_ENGINE_DATA, { params: { project: currentUserProject, type :"AllRules" } })
            .then(res => {                
                this.setState({allRulesId : res.data})
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
        this.setState({ queryData: newQueryData,ruleID:''})
        this.props.onResetClick()
    }
    ruleIdSelectHandle(event) {
        this.setState({ruleID:event.target.value})
        let queryData = this.state.queryData
        let newQueryData = {}
        for (let queryItems in queryData) {
            newQueryData[queryItems] = ''
        }
        this.setState({ queryData: newQueryData })
        debugger;
        this.props.ruleIdSelectEvent(event)

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

            
            <Grid container spacing={0}>
                <Grid xs={6} sm={6} md={9} lg={9} xl={9} >
                    <Grid container spacing={0}>
                        <Grid xs={6} sm={6} md={6} lg={1} xl={1} style={{ width: "100%" }}>
                            <Box m={1}>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e) => this.catagoryLevelChangeHandle(e)}
                                    label="Levels"
                                    value = {this.state.catagoryLevel}
                                >
                                    <MenuItem value={2}>Two</MenuItem>
                                    <MenuItem value={3}>Three</MenuItem>
                                    <MenuItem value={4}>Four</MenuItem>
                                    <MenuItem value={5}>Five</MenuItem>
                                </Select>
                            </Box>
                        </Grid>
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
                        <Grid xs={6} sm={6} md={6} lg={2} xl={2} style={{ width: "100%" }}>
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
                    </Grid>
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3}>
                    <Box m={1}>
                        <DropDownSelect
                            // dataList={this.state.rulesData}
                            dataList={this.state.allRulesId}
                            label="Rule ID"
                            DataType="ListData"
                            selectedValue={this.state.ruleID}
                            onChangeEvent={(event)=>this.ruleIdSelectHandle(event)}
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
                                // startIcon={<AddIcon />}
                                startIcon={this.props.formType=='data'?<RotateLeftIcon />:<SearchIcon/>}
                                onClick={this.props.onSearchClick}
                                style={{ margin: "0px 10px 0px 0px" }}
                                queryData={JSON.stringify(this.state.queryData)}
                            >
                                {this.props.formType == 'data' ? "Test" : "Search"}
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.resetQueryHandle()}
                                style={{ margin: "0px 10px 0px 0px" }}
                            >
                                {this.props.formType == 'data' ? this.props.actionType == 'edit' ? 'Update' : "Add" : "Reset"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

        </>
    }
}
export default connect((state) => ({
    store: state
}))(InvoiceData);
