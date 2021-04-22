import { connect, useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

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
    CATEGORY_LEVEL_ONE: "",
    CATEGORY_LEVEL_TWO: "",
    CATEGORY_LEVEL_THREE: "",
    CATEGORY_LEVEL_FOUR: "",
    CATEGORY_LEVEL_FIVE: "",
  };
  const [categories, setCategories] = useState(initialState);
  const credentials = apiLink;
  const dispatch = useDispatch();
  let updateApidata = {
    pk: formData.pk,
    payload: JSON.stringify(categories),
  };
  let postDataApi = {
    payload: JSON.stringify(categories),
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
      setCategories(updatedData);
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
                    id={textFieldId}
                    style={{ width: "100%" }}
                    variant={textFieldVarient}
                    label="Category Level 1"
                    multiline
                    value={categories["CATEGORY_LEVEL_ONE"]}
                    onChange={(e) =>
                      setCategories({
                        ...categories,
                        [`CATEGORY_LEVEL_ONE`]: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id={textFieldId}
                    style={{ width: "100%" }}
                    variant={textFieldVarient}
                    label="Category Level 2"
                    multiline
                    value={categories["CATEGORY_LEVEL_TWO"]}
                    onChange={(e) =>
                      setCategories({
                        ...categories,
                        [`CATEGORY_LEVEL_TWO`]: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id={textFieldId}
                    style={{ width: "100%" }}
                    variant={textFieldVarient}
                    label="Category Level 3"
                    multiline
                    value={categories["CATEGORY_LEVEL_THREE"]}
                    onChange={(e) =>
                      setCategories({
                        ...categories,
                        [`CATEGORY_LEVEL_THREE`]: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id={textFieldId}
                    style={{ width: "100%" }}
                    variant={textFieldVarient}
                    label="Category Level 4"
                    multiline
                    value={categories["CATEGORY_LEVEL_FOUR"]}
                    onChange={(e) =>
                      setCategories({
                        ...categories,
                        [`CATEGORY_LEVEL_FOUR`]: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                <Box m={1}>
                  <TextField
                    id={textFieldId}
                    style={{ width: "100%" }}
                    variant={textFieldVarient}
                    label="Category Level 5"
                    multiline
                    value={categories["CATEGORY_LEVEL_FIVE"]}
                    onChange={(e) =>
                      setCategories({
                        ...categories,
                        [`CATEGORY_LEVEL_FIVE`]: e.target.value,
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
