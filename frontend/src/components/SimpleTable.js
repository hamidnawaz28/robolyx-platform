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
  Card,
  Typography,
  Grid,
} from "@material-ui/core";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
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
function TableData({ data, headers }) {
  const classes = useStyles();
  const color = "primary";
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
              {Object.keys(headers).map((SingleHeader) => (
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
                  id={row.id}
                  checked={row.isChecked}
                >
                  {Object.keys(headers).map((key) => (
                    <TableCell className={classes.bodyCells}>
                      {row[headers[key]]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!data.length && (
          <Card className={classes.noData}>
            <Typography component="h2">No Data</Typography>
          </Card>
        )}
      </div>
    </Paper>
  );
}

export default TableData;
