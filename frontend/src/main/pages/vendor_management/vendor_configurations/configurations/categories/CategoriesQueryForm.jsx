import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  updateFormQuery,
  fetchTableData,
} from "../../../../../../global/table/table.actionCreators";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

function CategoriesQueryForm(props) {
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const tableStates = useSelector((state) => state.tableStates);
  const { perPage, currentPage, query } = tableStates;
  const { apiLink } = props;
  const classes = useStyles();
  const initialState = {
    name__icontains: "",
  };
  const [formData, setFormData] = useState(initialState);
  const credentials = apiLink;
  let fetchApiData = {
    currentPage: currentPage,
    perPage: perPage,
    project: "1",
  };
  const searchQueryHandle = () => {
    fetchApiData["query"] = formData;
    dispatch(updateFormQuery(formData));
    dispatch(fetchTableData({ apiLink: credentials, fetchApiData }));
  };
  const resetQueryHandle = () => {
    fetchApiData["query"] = JSON.stringify(initialState);
    setFormData(initialState);
    dispatch(updateFormQuery(initialState));
    dispatch(fetchTableData({ apiLink: credentials, fetchApiData }));
  };
  // useEffect(()=>{

  // },[])
  return (
    <BorderWrapper p={3} mb={matches ? 0 : 3}>
      <Grid
        container
        spacing={0}
        style={{ marginTop: matches ? "0em" : "0.5em" }}
      >
        <Grid item>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            label="Category Name"
            value={formData.name__icontains}
            size="small"
            onChange={(e) =>
              setFormData({
                ...formData,
                name__icontains: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item>
          {matches ? (
            <Search
              onClick={() => searchQueryHandle()}
              style={{
                marginLeft: "0.5em",
                marginTop: "0.2em",
              }}
            />
          ) : (
            <Grid container spacing={2} className={classes.root}>
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
            </Grid>
          )}
        </Grid>
      </Grid>
    </BorderWrapper>
  );
}
export default CategoriesQueryForm;
