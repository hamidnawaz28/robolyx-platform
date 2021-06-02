import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  deleteFileUpload,
  fetchFileUploadStart,
} from "../../redux/vendorNetworksActions";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadFile } from "../../../../../../hooks";

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

export default function FileUploadTable({ vendor_id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log("Vendor ID", vendor_id);

  useEffect(() => {
    dispatch(fetchFileUploadStart(vendor_id));
  }, []);

  const { vendorUploads } = useSelector((state) => state.vendorNetworks);

  console.log("FILE Uploads", vendorUploads);

  const handleDelete = ({ file_id, ticket_id }) => {
    console.log("from delete func", file_id, ticket_id);
    dispatch(deleteFileUpload({ file_id, vendor_id }));
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="center">
              ID
            </TableCell>
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
          {vendorUploads &&
            vendorUploads.map((file) => (
              <TableRow key={file.id}>
                <TableCell align="center" className={classes.tableCell}>
                  {file.id}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {file.file_name}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {file.uploaded_by.username}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {file.uploaded_at.split("T")[0]}
                </TableCell>

                <TableCell align="center" className={classes.tableCell}>
                  <Grid container>
                    <Grid item>
                      <GetAppIcon
                        onClick={() => downloadFile(file.vendor_file)}
                        className={classes.delIcon}
                      />
                    </Grid>
                    <Grid item>
                      <DeleteIcon
                        className={classes.delIcon}
                        onClick={() =>
                          handleDelete({
                            file_id: file.id,
                            vendor_id: vendor_id,
                          })
                        }
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
