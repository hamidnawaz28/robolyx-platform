import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
// import {
//   fetchVendorsStart,
//   updateCurrentPage,
// } from "../redux/vendorNetworksActions";
import VendorNotesCard from "./VendorNotesCard";
import VendorNotesSearch from "./VendorNotesSearch";
import NotesDialog from "./NotesDialog";
import Pagination from "@material-ui/lab/Pagination";
import {
  fetchNotesStart,
  updateCurrentPage,
} from "../../redux/vendorNetworksActions";

const useStyles = makeStyles((theme) => ({
  paginationComp: {
    marginTop: "2em",
  },
}));

export default function VendorNotes() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { noteQuery, currentPage, perPage, vendorNotes } = useSelector(
    (state) => state.vendorNetworks
  );

  let fetchApiData = {
    vendorId: id,
    noteQuery: JSON.stringify(noteQuery),
    currentPage: currentPage,
    perPage: perPage,
  };
  console.log("vendors.count", vendorNotes);

  useEffect(() => {
    dispatch(fetchNotesStart({ fetchApiData }));
  }, []);

  const handlePageChange = (event, value) => {
    let currPage = value;
    dispatch(updateCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchNotesStart({ fetchApiData }));
  };

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item>
          <Grid container justify="flex-end">
            <Grid item>
              <NotesDialog action="add" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.searchBar}>
          <VendorNotesSearch />
        </Grid>
        <Grid item style={{ marginTop: "1em" }}>
          {vendorNotes.data &&
            vendorNotes.data.map((note) => <VendorNotesCard note={note} />)}
        </Grid>
        <Grid item>
          <Grid container justify="center" className={classes.paginationComp}>
            <Grid item>
              <Pagination
                count={Math.ceil(vendorNotes.count / perPage)}
                page={currentPage}
                onChange={handlePageChange}
                defaultPage={1}
                color="primary"
                size="small"
                color="secondary"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
