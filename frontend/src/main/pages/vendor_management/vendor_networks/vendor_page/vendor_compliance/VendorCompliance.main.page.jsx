import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddForm from "./compliance_modal/MainFormikPage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import ComplianceSearchForm from "./ComplianceSearchForm";

import {
  fetchVenComplianceListStart,
  updateCurrentPage,
} from "../../redux/vendorNetworksActions";
import VendorComplianceCard from "./VendorComplianceCard";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  boxborder: {
    border: "1px solid #e5e5e5",
    marginBottom: "1rem",
    borderRadius: "0.25rem",
  },
  boxborderSearch: {
    border: "1px solid #e5e5e5",
    padding: "5px",
    marginBottom: "0.5rem",
    borderRadius: "0.25rem",
  },
}));

function VendorCompliance() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();

  const { complianceQuery, currentPage, perPage, ven_compliance_list } =
    useSelector((state) => state.vendorNetworks);

  let fetchApiData = {
    vendorId: id,
    complianceQuery: JSON.stringify(complianceQuery),
    currentPage: currentPage,
    perPage: perPage,
  };
  console.log("vendors.count", ven_compliance_list);

  useEffect(() => {
    dispatch(fetchVenComplianceListStart({ fetchApiData }));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (event, value) => {
    let currPage = value;
    dispatch(updateCurrentPage(currPage));
    fetchApiData["currentPage"] = currPage;
    dispatch(fetchVenComplianceListStart({ fetchApiData }));
  };

  let overdueCompliance =
    ven_compliance_list.data &&
    ven_compliance_list.data.filter(
      (comp) => comp.completion_status == "overdue"
    );

  let pendingCompliance =
    ven_compliance_list.data &&
    ven_compliance_list.data.filter(
      (comp) => comp.completion_status == "pending"
    );

  let submittedCompliance =
    ven_compliance_list.data &&
    ven_compliance_list.data.filter(
      (comp) => comp.completion_status == "submitted"
    );

  let completedCompliance =
    ven_compliance_list.data &&
    ven_compliance_list.data.filter((comp) => comp.completion_status == "done");

  return (
    <Grid container direction="column">
      <Grid item className={classes.boxborder} sm={12}>
        <Grid container justify="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              size="small"
            >
              Add Compliance
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Add New Performance Review"}
              </DialogTitle>
              <AddForm setOpen={setOpen} />
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.boxborderSearch} sm={12}>
        <ComplianceSearchForm />
      </Grid>
      <Grid item>
        <Grid container>
          <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
            Overdue Tasks
          </Typography>

          {overdueCompliance && overdueCompliance.length ? (
            overdueCompliance.map((ven_compliance) => (
              <VendorComplianceCard ven_compliance={ven_compliance} />
            ))
          ) : (
            <Grid item sm={12} style={{ marginBottom: "1em" }}>
              <Typography variant="caption">
                There are no matching items
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container>
          <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
            Task Awaiting Supplier Submission
          </Typography>

          {pendingCompliance && pendingCompliance.length ? (
            pendingCompliance.map((ven_compliance) => (
              <VendorComplianceCard ven_compliance={ven_compliance} />
            ))
          ) : (
            <Grid item sm={12} style={{ marginBottom: "1em" }}>
              <Typography variant="caption">
                There are no matching items
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item sm={12}>
        <Grid container>
          <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
            Task Awaiting Verification
          </Typography>

          {submittedCompliance && submittedCompliance.length ? (
            submittedCompliance.map((ven_compliance) => (
              <VendorComplianceCard ven_compliance={ven_compliance} />
            ))
          ) : (
            <Grid item sm={12} style={{ marginBottom: "1em" }}>
              <Typography variant="caption">
                There are no matching items
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item sm={12}>
        <Grid container>
          <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
            Completed
          </Typography>

          {completedCompliance && completedCompliance.length ? (
            completedCompliance.map((ven_compliance) => (
              <VendorComplianceCard ven_compliance={ven_compliance} />
            ))
          ) : (
            <Grid item sm={12} style={{ marginBottom: "1em" }}>
              <Typography variant="caption">
                There are no matching items
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item sm={12}>
        <Grid container justify="center" className={classes.paginationComp}>
          <Grid item>
            <Pagination
              count={Math.ceil(ven_compliance_list.count / perPage)}
              page={currentPage}
              onChange={handlePageChange}
              defaultPage={1}
              color="primary"
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VendorCompliance;
