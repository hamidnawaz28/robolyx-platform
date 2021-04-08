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
    LEDGER: "",
    LEDGER_DESC: "",
    STATE: "",
    REGION: "",
    DIVISION: "",
    BUSINESS: "",
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
      //credentials , postApiData
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
      <Grid container alignItems="center">
        <Dialog
          open={formState}
          onClose={formCloseEvent}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ marginTop: "1em" }}>
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
                    label="LEDGER"
                    multiline
                    value={popupFormData.LEDGER}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LEDGER: e.target.value,
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
                    label="LEDGER_DESC"
                    value={popupFormData.LEDGER_DESC}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        LEDGER_DESC: e.target.value,
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
                    label="STATE"
                    value={popupFormData.STATE}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        STATE: e.target.value,
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
                    label="REGION"
                    value={popupFormData.REGION}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        REGION: e.target.value,
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
                    label="DIVISION"
                    value={popupFormData.DIVISION}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        DIVISION: e.target.value,
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
                    label="BUSINESS"
                    value={popupFormData.BUSINESS}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        BUSINESS: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <Grid container justify="center" style={{ marginBottom: "1em" }}>
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
      </Grid>
    </>
  );
}

export default FormPopUp;
