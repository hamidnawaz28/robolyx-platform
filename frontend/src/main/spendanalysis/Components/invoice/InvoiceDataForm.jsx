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
import {
  addTableData,
  editTableData,
} from "../../../../global/table/table.actionCreators";
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
    INVOICE_ID: "",
    GL_DATE: "",
    INV_ORIGIN: "",
    INV_DATE: "",
    INV_SOURCE: "",
    INV_NUMBER: "",
    VENDOR_NUMBER: "",
    VENDOR_NAME: "",
    VENDOR_TYPE: "",
    INV_TERMS: "",
    LINE_NUMBER: "",
    LINE_TYPE: "",
    LINE_DESCRIPTION: "",
    LINE_QUANTITY: "",
    LINE_UNIT_PRICE: "",
    LINE_UNIT_OF_MEASURE: "",
    LINE_AMOUNT: "",
    GENERAL_LEDGER: "",
    LOCATION: "",
    DEPARTMENT: "",
    ACCOUNT: "",
    PO_NUMBER: "",
    CREATION_DATE: "",
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
      let payload = {
        apiLink,
        updateApidata,
        fetchApiData,
      };

      dispatch(editTableData(payload));
    } else {
      const payload = {
        credentials: apiLink,
        postApiData: postDataApi,
        fetchApiData: fetchApiData,
      };

      dispatch(addTableData(payload));
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
