import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentHistoryStart } from "../../../redux/ticketActions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteTicket } from "../../../redux/ticketActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    fontSize: "1em",
  },
  delIcon: {
    fontSize: "1.5em",
    "&:hover": {
      cursor: "pointer",
      color: "#e63946",
    },
  },
});

export default function ContentHistoryTable({ ticket_id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log("TICKET ID", ticket_id);

  useEffect(() => {
    dispatch(fetchContentHistoryStart(ticket_id));
  }, []);

  const contentHistory = useSelector(
    (state) => state.tickets.contentHistoryList
  );

  console.log("contentHistory", contentHistory);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="center">
              ID
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Item Changed
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Change Type
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Pre value
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Post value
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Modified at
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Modified by
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentHistory.data &&
            contentHistory.data.map((history) => (
              <TableRow key={history.id}>
                <TableCell align="center" className={classes.tableCell}>
                  {history.id}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {history.item_changed}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {history.change_type}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {history.pre_value}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {history.post_value}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {history.modified_at.split("T")[0]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {history.modified_by.username}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
