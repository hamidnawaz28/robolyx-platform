import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
import DropDownSelect from "../../../../global/dropDownSelect";
import {
  updateFormQuery,
  fetchTableData,
} from "../../../../global/table/table.actionCreators";
import { requestTaxonomyCategories } from "../../../../global/utils/utils.actionsCreators";
import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";
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

function TaxonomyQueryForm(props) {
  const dispatch = useDispatch();
  const tableStates = useSelector((state) => state.tableStates);
  const categoriesData = useSelector((state) => state.utilsData.categoriesData);
  const { perPage, currentPage, query } = tableStates;
  const { apiLink } = props;
  const classes = useStyles();

  const initialState = {
    CATEGORY_LEVEL_ONE: "",
    CATEGORY_LEVEL_TWO: "",
    CATEGORY_LEVEL_THREE: "",
    CATEGORY_LEVEL_FOUR: "",
    CATEGORY_LEVEL_FIVE: "",
  };
  const [categories, setCategories] = useState(initialState);
  const credentials = apiLink;
  let fetchApiData = {
    currentPage: currentPage,
    perPage: perPage,
    project: "1",
  };
  const searchQueryHandle = () => {
    fetchApiData["query"] = JSON.stringify(categories);
    dispatch(updateFormQuery(categories));
    dispatch(fetchTableData({ apiLink: credentials, fetchApiData }));
  };
  const resetQueryHandle = () => {
    fetchApiData["query"] = JSON.stringify(initialState);
    setCategories(initialState);
    dispatch(updateFormQuery(initialState));
    dispatch(fetchTableData({ apiLink: credentials, fetchApiData }));
  };
  useEffect(() => {
    const apiData = {
      project: "1",
    };
    dispatch(requestTaxonomyCategories());
  }, []);
  return (
    <BorderWrapper p={3} mb={3}>
      <Typography variant="h5">Search Options:</Typography>
      <Grid container spacing={0} style={{ marginTop: "0.5em" }}>
        <Grid item sm={8}>
          <Grid container spacing={4}>
            {Object.keys(categories).map((key) => (
              <Grid xs={6} sm={6} md={4} lg={4} xl={4}>
                <Box m={1}>
                  <DropDownSelect
                    dataList={categoriesData[key]}
                    label={key}
                    DataType="ListDataWithCatagory"
                    selectedValue={categories[key]}
                    catagoryLevel={key}
                    onChangeEvent={(e) =>
                      setCategories({ ...categories, [key]: e.target.value })
                    }
                  />
                </Box>
              </Grid>
            ))}
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
export default TaxonomyQueryForm;
