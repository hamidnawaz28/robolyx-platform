import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { updateData, postData } from "../../../../global/table/table.actions";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

function FormPopUp(props) {
  const {
    actionType,
    formData,
    formState,
    formCloseEvent,
    updateDataFunction,
    apiLink,
    table,
  } = props;
  const tableStates = useSelector((state) => state.tableStates);
  const { perPage, currentPage, query } = tableStates;

  const initialState = {
    PO_CREATION_DATE: "",
    REQ_APPROVED_DATE: "",
    REQ_DATE: "",
    PO_CLOSED_DATE: "",
    PO_LAST_UPDATE_DATE: "",
    PO_APPROVED_DATE: "",
    PO_NEED_BY_DATE: "",
    ORDER_LINE_CREATION_DATE: "",
    FIRST_RECEIPT_DATE: "",
    LAST_RECEIPT_DATE: "",
    LAST_INV_DATE: "",
    EARLIEST_INV_DATE: "",
    LAST_CREATION_DATE: "",
    EARLIEST_CREATION_DATE: "",
    FIRST_APPROVED_DATE: "",
    HOLD_COUNT: "",
    DEL_LOCATION_ID: "",
    INVENTORY_ITEM_ID: "",
    PO_LINE_NUMBER: "",
    QUANTITY_ORDERED: "",
    QUANTITY_CANCELLED: "",
    UNIT_PRICE: "",
    AMOUNT_ORDERED: "",
    QUANTITY_DELIVERED: "",
    QUANTITY_DUE: "",
    QUANTITY_BILLED: "",
    AMOUNT_BILLED: "",
    AMOUNT_RECEIPT: "",
    AMOUNT_EXPECTED_RECEIPT: "",
    AMOUNT_DUE: "",
    UN_INVOICED_RECEIPT_AMOUNT: "",
    BUYER_ID: "",
    REQ_LINE_NUMBER: "",
    ORDER_CYCLE_TIME_1: "",
    VENDOR_NUMBER: "",
    DISTRIBUTION_NUM: "",
    PO_NUMBER: "",
    PO_CLOSED_FLAG: "",
    SUPPLIER_NAME: "",
    HOLD_FLAG: "",
    LEDGER_DESC: "",
    LOCATION_DESC: "",
    DEPARTMENT_DESC: "",
    RECEIPT_STATUS: "",
    STATE: "",
    BUSINESS: "",
    HOLO_ENTITY_NAME: "",
    BUYER: "",
    REQUISITIONER: "",
    REQUESTER: "",
    PO_REQUESTER: "",
    TRANSACTION_TYPE: "",
    PURCHASING_STATUS: "",
    PO_CONFIRMATION_FLAG: "",
    REQ_NUMBER: "",
    REQ_DESCRIPTION: "",
    REQ_AUTHORISATION_STATUS: "",
    PO_LAST_UPDATED_BY: "",
    PO_LINE_CLOSED_FLAG: "",
    PO_LINE_CLOSED_REASON: "",
    PO_APPROVED_FLAG: "",
    PO_APPROVED_PERIOD: "",
    NINETY_DAYS_OLD: "",
    VENDOR_ID: "",
    SUPPLIER_SITE: "",
    VENDOR_TYPE: "",
    CONTRACTED_SUPPLIER: "",
    CONTRACT_CATEGORY: "",
    CONTRACT_END_DATE: "",
    ON_HOLD: "",
    LATEST_HOLD: "",
    LATEST_HOLD_REASON: "",
    LATEST_HOLD_DATE: "",
    PURCHASING_CATEGORY1: "",
    PURCHASING_CATEGORY2: "",
    PO_ITEM_DESCRIPTION: "",
    SUPPLIER_ITEM: "",
    UOM: "",
    CATALOG_TYPE: "",
    CATALOG_SOURCE: "",
    EXPENDITURE_TYPE: "",
    ORGANISATION_CODE: "",
    EAM_REF_NUMBER: "",
    PO_EAM_REF_NUMBER: "",
    PROJECT_NUMBER: "",
    TASK_NUMBER: "",
    LEDGER: "",
    LOCATION: "",
    DEPARTMENT: "",
    ACCOUNT: "",
    ACCOUNT_DESC: "",
    PROCESS_STATUS: "",
    LAST_RECEIPT_PERIOD: "",
    LAST_INV_NO: "",
    EARLIEST_INV_NO: "",
    DEL_LOCATION_DESC: "",
    NOTE_TO_VENDOR: "",
  };
  const [popupFormData, setPopupFormData] = useState(initialState);
  const credentials = apiLink;
  const dispatch = useDispatch();
  let updateApidata = {
    pk: formData.pk,
    payload: JSON.stringify(popupFormData),
  };
  let postDataApi = {
    payload: JSON.stringify(popupFormData),
    project: "1",
  };
  let fetchApiData = {
    query: JSON.stringify(query),
    currentPage: currentPage,
    perPage: perPage,
    project: "1",
  };
  const handleSave = () => {
    if (actionType == "Edit") {
      dispatch(updateData(apiLink, updateApidata, fetchApiData));
    } else {
      dispatch(postData(apiLink, postDataApi, fetchApiData));
    }
    formCloseEvent();
  };
  useEffect(() => {
    if (actionType == "Edit") {
      let updatedData = {};
      Object.keys(initialState).map((element) => {
        updatedData[element] = formData.fields[element];
      });
      setPopupFormData(updatedData);
    }
  }, []);
  const textFieldId = "outlined-basic";
  const textFieldVarient = "outlined";
  return (
    <>
      <div>
        <Dialog
          open={formState}
          onClose={formCloseEvent}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Grid container alignItems="center">
              <Grid item>
                {actionType == "New" ? (
                  <AddBoxIcon fontSize="large" />
                ) : (
                  <EditIcon fontSize="large" />
                )}
              </Grid>
              <Grid item>
                <Typography variant="h5" component="h2">
                  {actionType == "New" ? "Add New" : "Edit"} {table}
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={0}>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="INVOICE_ID"
                    multiline
                    value={popupFormData.INVOICE_ID}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        INVOICE_ID: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="INV_ORIGIN"
                    value={popupFormData.INV_ORIGIN}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        INV_ORIGIN: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="INV_SOURCE"
                    value={popupFormData.INV_SOURCE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        INV_SOURCE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="INV_NUMBER"
                    value={popupFormData.INV_NUMBER}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        INV_NUMBER: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="INV_TERMS"
                    value={popupFormData.INV_TERMS}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        INV_TERMS: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                    label="GL_DATE"
                    value={popupFormData.GL_DATE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        GL_DATE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                    label="INV_DATE"
                    value={popupFormData.INV_DATE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        INV_DATE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="VENDOR_NUMBER"
                    value={popupFormData.VENDOR_NUMBER}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        VENDOR_NUMBER: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="VENDOR_NAME"
                    value={popupFormData.VENDOR_NAME}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        VENDOR_NAME: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="VENDOR_TYPE"
                    value={popupFormData.VENDOR_TYPE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        VENDOR_TYPE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LINE_NUMBER"
                    value={popupFormData.LINE_NUMBER}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LINE_NUMBER: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LINE_TYPE"
                    value={popupFormData.LINE_TYPE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LINE_TYPE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LINE_DESCRIPTION"
                    value={popupFormData.LINE_DESCRIPTION}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LINE_DESCRIPTION: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LINE_QUANTITY"
                    value={popupFormData.LINE_QUANTITY}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LINE_QUANTITY: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="standard-number"
                    type="number"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LINE_UNIT_PRICE"
                    value={popupFormData.LINE_UNIT_PRICE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LINE_UNIT_PRICE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LINE_UNIT_OF_MEASURE"
                    value={popupFormData.LINE_UNIT_OF_MEASURE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LINE_UNIT_OF_MEASURE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="standard-number"
                    type="number"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LINE_AMOUNT"
                    value={popupFormData.LINE_AMOUNT}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LINE_AMOUNT: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="GENERAL_LEDGER"
                    value={popupFormData.GENERAL_LEDGER}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        GENERAL_LEDGER: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="LOCATION"
                    value={popupFormData.LOCATION}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LOCATION: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="DEPARTMENT"
                    value={popupFormData.DEPARTMENT}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        DEPARTMENT: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="ACCOUNT"
                    value={popupFormData.ACCOUNT}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        ACCOUNT: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    label="PO_NUMBER"
                    value={popupFormData.PO_NUMBER}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        PO_NUMBER: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id="date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                    label="CREATION_DATE"
                    value={popupFormData.CREATION_DATE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        CREATION_DATE: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <Grid container justify="center">
            <DialogActions position="centre">
              <Button
                onClick={() => handleSave()}
                variant="contained"
                color="primary"
              >
                {actionType == "Edit" ? "Update" : "Save"}
              </Button>
              <Button
                onClick={formCloseEvent}
                variant={textFieldVarient}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </div>
    </>
  );
}
export default FormPopUp;
