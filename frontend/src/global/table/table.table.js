import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
  CardMedia,
  Card,
  Typography,
} from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  updateTableData,
  updatePerPage,
  updateCurrentPage,
  updateTotalRows,
  selectAll,
} from "./table.actionCreators";
import styled from "styled-components";
import { Button, Box, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { Add, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { implementRule } from "./table.actions";
import { resetStates } from "./table.actionCreators";
import { deleteTableData, fetchTableData } from "./table.actionCreators";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles({
  actionButtons: {
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingLeft: "22px",
  },
  actionButtonsMargin: {
    marginRight: "10px",
    color: "#fff",
    width: "8em",
  },
  actionButtonDelete: {
    marginRight: "10px",
    backgroundColor: "#dc004e",
    color: "#fff",
    width: "8em",
    "&:hover": {
      background: "#99063a",
    },
  },
  actionButtonAdd: {
    marginRight: "10px",
    backgroundColor: "#388e3c",
    color: "#fff",
    width: "8em",
    "&:hover": {
      background: "#307a33",
    },
  },
  tableWrap: {
    maxWidth: "1190px",
    overflow: "auto",
  },
  headRow: {
    borderRadius: "15px 50px 30px 5px",
    height: "10px",
  },
  bodyRows: {
    height: "10px",
    padding: "0px",
  },
  headCells: {
    backgroundColor: "#232f3e",
    color: "#fff",
    fontSize: "12px",
    textAlign: "left",
  },
  bodyCells: {
    fontSize: "0.9em",
    textAlign: "left",
  },
  noData: {
    textAlign: "center",
    margin: "20px",
  },
  headcheck: {
    color: "#fff",
  },
});
const ActionsGrid = styled(Grid)`
    paddingTop : "5px",
    paddingLeft : "22px"
`;
// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//     },
//     table: {
//         minWidth: 700,
//     },
// });
const selRowsArr = (rowsData) => {
  let outArray = [];
  for (let index in rowsData) {
    if (rowsData[index]["IsChecked"] == true) {
      outArray.push(rowsData[index]);
    }
  }
  return outArray;
};
function TableData(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tableStates = useSelector((state) => state.tableStates);
  console.log("tableStates", tableStates);
  const {
    data,
    totalRows,
    perPage,
    currentPage,
    IsAllSelected,
    query,
  } = tableStates;
  const {
    tableHeaders,
    selectOption,
    paginationOption,
    apiLink,
    addNewDataHandle,
    editDataHandle,
    isActionsEnabled,
    ruleImpEnabled,
  } = props;

  const selectAllHandle = (e) => {
    const checkedStatus = e.target.checked;
    dispatch(selectAll(checkedStatus));
    let tableDataPrev = data;
    let updatedData = [];
    for (let index in tableDataPrev) {
      let item = { ...tableDataPrev[index] };
      item["IsChecked"] = checkedStatus;
      updatedData.push(item);
    }
    dispatch(updateTableData(updatedData));
  };
  const singleSelectHandle = (e) => {
    debugger;
    let pk = e.target.parentElement.parentElement.getAttribute("pk");
    if (pk == null) {
      pk = e.target.parentElement.getAttribute("pk");
    }
    let tableDataPrev = data;
    let updatedData = [];
    for (let index in tableDataPrev) {
      let item = { ...tableDataPrev[index] };
      if (item["pk"] == pk) {
        item["IsChecked"] = !item["IsChecked"];
      }
      updatedData.push(item);
    }
    dispatch(updateTableData(updatedData));
  };
  let fetchApiData = {
    query: JSON.stringify(query),
    currentPage: currentPage,
    perPage: perPage,
    project: "1",
  };
  let deleteApiData = {
    project: "1",
  };
  let implementApiData = {
    project: "1",
  };
  let payloadForFetch = { apiLink, fetchApiData };
  const deleteDataHandle = () => {
    let pkArray = [];
    for (let index in data) {
      if (data[index]["IsChecked"] == true) {
        pkArray.push(data[index]["pk"]);
      }
    }
    deleteApiData["pkArray"] = JSON.stringify(pkArray);

    let payload = { apiLink, deleteApiData, fetchApiData };
    pkArray.length > 0
      ? dispatch(deleteTableData(payload))
      : alert("Select Data");
  };
  const editData = () => {
    let outArray = [];
    for (let index in data) {
      if (data[index]["IsChecked"] == true) {
        outArray.push(data[index]);
      }
    }
    outArray.length > 1 || outArray.length == 0
      ? alert("Select A single Row")
      : editDataHandle(outArray[0]);
  };
  const implementRuleHandle = () => {
    let pkArray = [];
    for (let index in data) {
      if (data[index]["IsChecked"] == true) {
        pkArray.push(data[index]["pk"]);
      }
    }
    implementApiData["pkArray"] = JSON.stringify(pkArray);
    fetchApiData["STATUS"] = "draft";
    pkArray.length > 0
      ? dispatch(implementRule(apiLink, implementApiData, fetchApiData))
      : alert("Select Data");
  };
  const changePageHandle = (e) => {
    let currPage = currentPage;
    e.currentTarget.ariaLabel == "Next page"
      ? (currPage += 1)
      : (currPage -= 1);
    dispatch(updateCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchTableData(payloadForFetch));
  };
  const changeRowsPerPageHandle = (e) => {
    let newTablePerPage = e.target.value;
    dispatch(updatePerPage(newTablePerPage));
    dispatch(updateCurrentPage(0));
    fetchApiData["perPage"] = newTablePerPage;
    fetchApiData["currentPage"] = 0;
    dispatch(fetchTableData(payloadForFetch));
  };
  useEffect(() => {
    dispatch(fetchTableData(payloadForFetch));
    return () => {
      dispatch(resetStates());
    };
  }, []);
  const variant = "contained";
  const color = "primary";
  return (
    <Paper>
      {selectOption && (
        <div className={classes.actionButtons}>
          <Box m={1}>
            {ruleImpEnabled && (
              <Button
                color={color}
                variant={variant}
                // startIcon={<DeleteOutline />}
                onClick={() => implementRuleHandle()}
                className={classes.actionButtonsMargin}
              >
                Implement
              </Button>
            )}
            <Button
              color={color}
              variant={variant}
              startIcon={<AddCircleIcon />}
              onClick={() => addNewDataHandle()}
              className={classes.actionButtonAdd}
            >
              Add
            </Button>
            <Button
              color={color}
              variant={variant}
              startIcon={<Edit />}
              onClick={() => editData()}
              className={classes.actionButtonsMargin}
            >
              Edit
            </Button>
            <Button
              variant={variant}
              startIcon={<DeleteIcon />}
              onClick={() => deleteDataHandle()}
              className={classes.actionButtonDelete}
            >
              Delete
            </Button>
          </Box>
        </div>
      )}

      <div className={classes.tableWrap}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
          className={classes.tableWrap}
        >
          <TableHead>
            <TableRow className={classes.headRow}>
              {selectOption && (
                <TableCell className={classes.headCells}>
                  <Checkbox
                    className={classes.headcheck}
                    checked={IsAllSelected}
                    onClick={selectAllHandle}
                  />
                </TableCell>
              )}
              <TableCell className={classes.headCells}>ID</TableCell>
              {Object.keys(tableHeaders).map((SingleHeader) => (
                <TableCell className={classes.headCells}>
                  {SingleHeader}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row) => (
                <TableRow
                  className={classes.bodyRows}
                  hover={true}
                  onClick={selectOption && singleSelectHandle}
                  pk={row.pk}
                  checked={row.IsChecked}
                >
                  {selectOption && (
                    <TableCell>
                      <Checkbox
                        color={color}
                        pk={row.pk}
                        checked={row.IsChecked}
                      />
                    </TableCell>
                  )}
                  {row?.pk && <TableCell>{row.pk}</TableCell>}
                  {Object.keys(tableHeaders).map((key) => (
                    <TableCell className={classes.bodyCells}>
                      {row.fields[tableHeaders[key]]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {data.length == 0 && (
          <Card className={classes.noData}>
            <Typography component="h2">No Data</Typography>
          </Card>
        )}
      </div>
      {paginationOption && (
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25, 50, 100, 500]}
          component="div"
          count={totalRows}
          rowsPerPage={perPage}
          page={currentPage}
          onChangePage={changePageHandle}
          onChangeRowsPerPage={changeRowsPerPageHandle}
        />
      )}
    </Paper>
  );
}

export default TableData;
