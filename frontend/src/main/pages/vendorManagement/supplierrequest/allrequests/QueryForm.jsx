import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
//import DropDownSelect from '../../../../global/dropDownSelect'
import {
  updateFormQuery,
  fetchTableData,
} from "../../../../../global/table/table.actionCreators";
import { queryData } from "../../../../../global/table/table.actions";
//import { updateTaxonomyCategories } from '../../../../global/utils/utils.actions.js'
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const BorderWrapper = styled(Box)`
  background: white;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "1em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.8em",
    },
  },
}));

function SupplierQueryForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tableStates = useSelector((state) => state.tableStates);
  const { perPage, currentPage, query } = tableStates;
  const { apiLink } = props;
  const initialState = {
    company_name: "",
    request_contact: "",
    request_status: "",
  };
  const [formData, setFormData] = useState(initialState);
  const credentials = apiLink;
  let fetchApiData = {
    currentPage: currentPage,
    perPage: perPage,
    project: "1",
  };
  const objectFilter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});
  const searchQueryHandle = () => {
    let queryData = objectFilter(formData, (item) => item != "");
    fetchApiData["query"] = queryData;
    dispatch(updateFormQuery(formData));
    dispatch(fetchTableData({ apiLink: credentials, fetchApiData }));
  };
  const resetQueryHandle = () => {
    fetchApiData["query"] = objectFilter(initialState, (item) => item != "");
    setFormData(initialState);
    dispatch(updateFormQuery(initialState));
    dispatch(fetchTableData({ apiLink: credentials, fetchApiData }));
  };
  return (
    <BorderWrapper p={3} mb={3}>
      <Typography variant="h5">Search Options:</Typography>
      <Grid container spacing={0} style={{ marginTop: "0.5em" }}>
        <Grid item sm={8}>
          <Grid container spacing={4}>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                style={{ width: "100%" }}
                label="Company Name"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company_name: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                style={{ width: "100%" }}
                label="Request Contract"
                value={formData.request_contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    request_contact: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                style={{ width: "100%" }}
                label="Request Status"
                value={formData.request_status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    request_status: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={4}>
          <Grid
            container
            direction="column"
            spacing={2}
            align="flex-start"
            className={classes.root}
          >
            <Grid item>
              <Button
                style={{
                  backgroundColor: "#232f3e",
                  color: "#fff",
                  width: "10em",
                }}
                variant="contained"
                startIcon={<Search />}
                onClick={() => searchQueryHandle()}
              >
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  backgroundColor: "#232f3e",
                  color: "#fff",
                  width: "10em",
                }}
                variant="contained"
                startIcon={<RotateLeft />}
                onClick={() => resetQueryHandle()}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BorderWrapper>
  );
}
export default SupplierQueryForm;
