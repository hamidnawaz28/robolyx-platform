import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFileUploadStart } from "../../../redux/ticketActions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteTicket } from "../../../redux/ticketActions";
import GetAppIcon from "@material-ui/icons/GetApp";

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

export default function FileUploadTable({ ticket_id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log("TICKET ID", ticket_id);

  useEffect(() => {
    dispatch(fetchFileUploadStart(ticket_id));
  }, []);

  const fileUploads = useSelector((state) => state.tickets.fileUploadsList);

  console.log("FILE Uploads", fileUploads);

  const handleDelete = (file_id) => {
    dispatch(deleteTicket(file_id));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>ID</TableCell>
            <TableCell className={classes.tableCell} align="center">
              File Title
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Uploaded by
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Uploaded at{" "}
            </TableCell>
            <TableCell className={classes.tableCell} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fileUploads.map((file) => (
            <TableRow key={file.id}>
              <TableCell align="center" className={classes.tableCell}>
                {file.id}
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                {file.file_title}
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                {file.upload_by.username}
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                {file.uploaded_at.split("T")[0]}
              </TableCell>

              <TableCell align="center" className={classes.tableCell}>
                <Grid container>
                  <Grid item>
                    <a href={file.ticket_file} download>
                      <GetAppIcon className={classes.delIcon} />
                    </a>
                  </Grid>
                  <Grid item>
                    <DeleteIcon
                      className={classes.delIcon}
                      onClick={() => handleDelete(file.id)}
                    />
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
