import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Card,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  updateArchiveTicketPerPage,
  updateArchiveTicketCurrentPage,
} from "../redux/ticketActions";

import { makeStyles } from "@material-ui/core/styles";

import {
  resetArchiveTicketStates,
  fetchArhiveTicketsTableData,
} from "../redux/ticketActions";

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
    overflowX: "scroll",
    width: "100%",
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
  headCells_content: {
    backgroundColor: "#232f3e",
    color: "#fff",
    fontSize: "12px",
    textAlign: "left",
    minWidth: "300px",
  },
  bodyCells: {
    fontSize: "0.9em",
    textAlign: "left",
  },
  bodyCells_content: {
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

function ArchiveTicketsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArhiveTicketsTableData(payloadForFetch));
    return () => {
      dispatch(resetArchiveTicketStates());
    };
  }, []);

  const tickets = useSelector((state) => state.tickets);
  console.log("tickets", tickets);
  const { tableData, totalRows, perPage, currentPage, archiveQuery } = tickets;

  console.log("TABLE DATA", tableData);

  const { tableHeaders, paginationOption, apiLink } = props;

  let fetchApiData = {
    archiveQuery: JSON.stringify(archiveQuery),
    currentPage: currentPage,
    perPage: perPage,
  };

  let payloadForFetch = { apiLink, fetchApiData };

  const changePageHandle = (e) => {
    let currPage = currentPage;
    e.currentTarget.ariaLabel === "Next page"
      ? (currPage += 1)
      : (currPage -= 1);
    dispatch(updateArchiveTicketCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchArhiveTicketsTableData(payloadForFetch));
  };
  const changeRowsPerPageHandle = (e) => {
    let newTablePerPage = e.target.value;
    dispatch(updateArchiveTicketPerPage(newTablePerPage));
    dispatch(updateArchiveTicketCurrentPage(0));
    fetchApiData["perPage"] = newTablePerPage;
    fetchApiData["currentPage"] = 0;
    dispatch(fetchArhiveTicketsTableData(payloadForFetch));
  };

  return (
    <Paper>
      <div className={classes.tableWrap}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size="small"
          className={classes.tableWrap}
        >
          <TableHead>
            <TableRow className={classes.headRow}>
              {Object.keys(tableHeaders).map((SingleHeader) => (
                <TableCell
                  className={
                    SingleHeader === "Ticket_Content"
                      ? classes.headCells_content
                      : classes.headCells
                  }
                >
                  {SingleHeader}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.data
              ? tableData.data.map((row) => (
                  <TableRow
                    className={classes.bodyRows}
                    hover={true}
                    pk={row.pk}
                  >
                    {row?.pk && <TableCell>{row.pk}</TableCell>}
                    {Object.keys(tableHeaders).map((key, index) => (
                      //bodyCells_content
                      <TableCell className={classes.bodyCells}>
                        {tableHeaders[key] == "responsible_person" ||
                        tableHeaders[key] == "created_by"
                          ? row[tableHeaders[key]].username
                          : row[tableHeaders[key]]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
        {tableData.length === 0 && (
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

export default ArchiveTicketsTable;
