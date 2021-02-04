import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DropDownSelect from '../../../global/dropDownSelect';
import axios from 'axios';
import TableData from "../../../global/TableComplete";
import { connect } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import FormPopup from '../../../global/TaxonomyForm'
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft'; 
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'; 
import {
    SERVER_URL,
    DATA_COLUMNS,
    TAXONOMY_DATA,
    TAXONOMY_ATTRIBUTES
} from "../../../global/constants";

const useStyles = theme => ({
    root: {
        margin: "10px"
    },
});

const TaxonomyData = (props) => {
    const [tableCurrentPage, setTableCurrentPage] = useState(0);
    const [tableTotalRows, setTableTotalRows] = useState(0);
    const [tablePerPage, setTablePerPage] = useState(5);
    const [selectAllStatus, setSelectAllStatus] = useState(false);
    const [taxonomyData, setTaxonomyData] = useState({});
    const [selectedRow, setSelectedRow] = useState('');
    const [actionType, setActionType] = useState('');
    const [formState, setFormState] = useState({});
    const [catagoriesSelected, setCatagoriesSelected] = useState({
        "CATAGORY_LEVEL_ONE": '',
        "CATAGORY_LEVEL_TWO": '',
        "CATAGORY_LEVEL_THREE": '',
        "CATAGORY_LEVEL_FOUR": '',
        "CATAGORY_LEVEL_FIVE": '',
        "CATAGORY_LEVEL_ONE_Data": [],
        "CATAGORY_LEVEL_TWO_Data": [],
        "CATAGORY_LEVEL_THREE_Data": [],
        "CATAGORY_LEVEL_FOUR_Data": [],
        "CATAGORY_LEVEL_FIVE_Data": []
    });

    const clearState = () => {
        setTableCurrentPage(0);
        setTableTotalRows(0);
        setTablePerPage(5);
        setSelectAllStatus(false);
        setTaxonomyData({});
        setSelectedRow('');
        setActionType('');
        setFormState({});
        setCatagoriesSelected({
            "CATAGORY_LEVEL_ONE": '',
            "CATAGORY_LEVEL_TWO": '',
            "CATAGORY_LEVEL_THREE": '',
            "CATAGORY_LEVEL_FOUR": '',
            "CATAGORY_LEVEL_FIVE": '',
            "CATAGORY_LEVEL_ONE_Data": [],
            "CATAGORY_LEVEL_TWO_Data": [],
            "CATAGORY_LEVEL_THREE_Data": [],
            "CATAGORY_LEVEL_FOUR_Data": [],
            "CATAGORY_LEVEL_FIVE_Data": []
        });
    }

    function queryData() {
        let currentUserProject = props.store.taxonomyandinvoicestore.user.project;
        let catagoriesSelected = catagoriesSelected;
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
                        currentPage: tableCurrentPage,
                        perPage: tablePerPage
                    }
                })
            .then(res => {
                setTableTotalRows(res.data.count);
                let queryOutputData = JSON.parse(res.data.queryData)
                for (let index in queryOutputData) {
                    queryOutputData[index]['IsChecked'] = false
                }
                setTaxonomyData(queryOutputData);
            }
            )
            .catch(err => console.log(err));
    }

    const changePageHandle = (event) => {
        let prevState = tableCurrentPage;
        event.currentTarget.ariaLabel === "Next page" ? setTableCurrentPage(prevState + 1) : setTableCurrentPage(prevState - 1);
        queryData();
    }

    const changeRowsPerPageHandle = (event) => {
        let newTablePerPage = event.target.value;
        newTablePerPage = parseInt(newTablePerPage)
        setTablePerPage(newTablePerPage);
        setTableCurrentPage(0);
        queryData();
    }

    const selectAllHandle = (event) => {
        setSelectAllStatus(event.target.checked);
        let updatedTaxonomyData = [...taxonomyData];
        let updatedData = [];
        for (let index in updatedTaxonomyData) {
            let item = { ...updatedTaxonomyData[index] };
            item['IsChecked'] = event.target.checked;
            updatedData.push(item);
        }
        setTaxonomyData(updatedData);
    }

    const singleSelectHandle = (event) => {
        debugger;
        let pk = event.target.parentElement.parentElement.getAttribute("pk")
        if(pk ==null){
            pk = event.target.parentElement.getAttribute("pk")
        }
        let updatedTaxonomyData = [...taxonomyData];
        for (let index in updatedTaxonomyData) {
            if (updatedTaxonomyData[index]['pk'] == pk) {
                updatedTaxonomyData[index]['IsChecked'] = !updatedTaxonomyData[index]['IsChecked'] ;
            }
        }
        setTaxonomyData(updatedTaxonomyData);
    }

    const catagorySelectHandle = (event) => {
        let value = event.target.value;
        let selectedIndex = event.target.selectedIndex;
        let selectedCatagory = event.target.options[selectedIndex].getAttribute("catagorylevel");
        setCatagoriesSelected({...catagoriesSelected, ['CATAGORY_LEVEL_' + selectedCatagory]: value});
        clearState();
    }
    const searchQueryHandle = (event) => {
        setTableCurrentPage(0);
        queryData();
    }
    const resetQueryHandle = (event) => {
        ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'].map(key =>  setCatagoriesSelected({...catagoriesSelected, ['CATAGORY_LEVEL_' + key]: ''}));
        clearState();
        setTableCurrentPage(0);
        queryData();
    }

    const addNewDataHandle = (event) => {
        setFormState(true);
        setActionType("Add");
    }
        
    const editDataHandle = (event) => {
        let updateTaxonomyData = [...taxonomyData];
        let outArray = []
        for (let index in updateTaxonomyData) {
            if (updateTaxonomyData[index]['IsChecked'] == true) {
                outArray.push(updateTaxonomyData[index])
            }
        }
        if(outArray.length>1 || outArray.length==0){
            alert("Select A single Row")
        }
        else{
            setFormState(true);
            setActionType("Edit");
            setSelectedRow(outArray[0]);
        }
    }

    const formCloseHandle = () => {
        setFormState(false)
    }

    const deleteDataHandle = (event) => {
        let updatedTaxonomyData = taxonomyData;
        let currentUserProject = props.store.taxonomyandinvoicestore.user.project;
        let pkArray = [];
        for (let index in updatedTaxonomyData) {
            if (updatedTaxonomyData[index]['IsChecked'] == true) {
                pkArray.push(updatedTaxonomyData[index]['pk'])
            }
        }
        axios
            .delete(SERVER_URL + TAXONOMY_DATA,
                {
                    params:
                    {
                        project: currentUserProject,
                        pkList: JSON.stringify(pkArray)
                    }
                })
            .then(res => {
                queryData();
                setSelectAllStatus(false);
                alert(res.data);
            }
            )
            .catch(err => console.log(err));
    }

    const updateDataFunction = () => {
        setFormState(false);
        queryData();
    }

    const catagories = ["CATAGORY_LEVEL_ONE", "CATAGORY_LEVEL_TWO", "CATAGORY_LEVEL_THREE", "CATAGORY_LEVEL_FOUR", "CATAGORY_LEVEL_FIVE"];

    useEffect(() => {
        let currentUserProject = props.store.taxonomyandinvoicestore.user.project;
        axios
            .get(SERVER_URL + DATA_COLUMNS + "/", { params: { project: currentUserProject, catagories: catagoriesSelected } })
            .then(res => {
                if (res.data.length == 1 && res.data[0] == '') {
                    setCatagoriesSelected({...catagoriesSelected, "CATAGORY_LEVEL_ONE_Data": []})
                }
                else {
                    for (let index in catagories) {
                        setCatagoriesSelected({...catagoriesSelected, [catagories[index] + "_Data"]: res.data[catagories[index]]})
                    }
                }
                clearState();
            }
            )
            .catch(err => console.log(err));
        queryData()
      }, []);

        return (<>
            <Grid container spacing={0}>
                <Grid xs={6} sm={6} md={10} lg={10} xl={10} >
                    <Grid container spacing={0}>
                        {catagories.map(key =>
                            <Grid xs={6} sm={6} md={3} lg={3} xl={3} >
                                <Box m={1}>
                                    <DropDownSelect
                                        dataList={catagoriesSelected[key + "_Data"]}
                                        label={"Catagory Level " + key}
                                        DataType="ListDataWithCatagory"
                                        selectedValue={catagoriesSelected[key]}
                                        catagoryLevel={key}
                                        onChangeEvent={(event) => catagorySelectHandle(event)}
                                    />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid xs={6} sm={6} md={10} lg={2} xl={2} >
                    <Box m={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            onClick={() => searchQueryHandle()}
                        >
                            Search
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<RotateLeftIcon />}
                            onClick={() => resetQueryHandle()}
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
                    onClick={() => addNewDataHandle()}
                    style={{ margin: "0px 10px 0px 0px" }}
                >
                    Add
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<EditIcon />} 
                    onClick={() => editDataHandle()}
                    style={{ margin: "0px 10px 0px 0px" }}
                >
                    Edit
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => deleteDataHandle()}
                    style={{ margin: "0px 10px 0px 0px" }}
                >
                    Delete
                </Button>
            </Box>
            <TableData
                TableHeaderData={TAXONOMY_ATTRIBUTES}
                TableDataList={taxonomyData}
                totalRows={tableTotalRows}
                perPage={tablePerPage}
                currentPage={tableCurrentPage}
                selectAllStatus={selectAllStatus}
                changePageEvent={(event) => changePageHandle(event)}
                changeRowsPerPageEvent={(event) => changeRowsPerPageHandle(event)}
                SelectAllEvent={(event) => selectAllHandle(event)}
                SingleSelectEvent={(event) => singleSelectHandle(event)}
                selectOption={true}
                paginationOption={true}
            />
            {formState?
            <FormPopup
                actionType = {actionType}
                formState = {formState}
                formData =  {selectedRow}
                updateDataFunction = {()=>updateDataFunction()}
                formCloseEvent={()=>formCloseHandle()}
            />:<></>}

        </>);
};

export default connect((state) => ({
    store: state
}))(TaxonomyData);
