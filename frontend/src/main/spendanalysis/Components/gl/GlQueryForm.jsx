import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import DropDownSelect from "../../../../global/dropDownSelect";
import {
  updateFormQuery,
  fetchTableData,
} from "../../../../global/table/table.actionCreators";
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

function GlQueryForm(props) {
  const dispatch = useDispatch();
  const tableStates = useSelector((state) => state.tableStates);
  const { perPage, currentPage, query } = tableStates;
  const { apiLink } = props;
  const classes = useStyles();
  const initialState = {
    LEDGER__icontains: "",
    LEDGER_DESC__icontains: "",
    STATE__icontains: "",
    REGION__icontains: "",
    DIVISION__icontains: "",
    BUSINESS__icontains: "",
  };
  const [formData, setFormData] = useState(initialState);
  const credentials = apiLink;
  let fetchApiData = {
    currentPage: currentPage,
    perPage: perPage,
    project: "1",
  };
  const searchQueryHandle = () => {
    fetchApiData["query"] = JSON.stringify(formData);
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
    <BorderWrapper p={3} mb={3}>
      <Typography variant="h5">Search Options:</Typography>
      <Grid container spacing={0} style={{ marginTop: "0.5em" }}>
        <Grid item sm={8}>
          <Grid container spacing={4}>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                label="LEDGER"
                value={formData.LEDGER__icontains}
                size="small"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    LEDGER__icontains: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
                label="LEDGER_DESC"
                value={formData.LEDGER_DESC__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    LEDGER_DESC__icontains: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                label="STATE"
                value={formData.STATE__icontains}
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, STATE__icontains: e.target.value })
                }
              />
            </Grid>

            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                label="REGION"
                value={formData.REGION__icontains}
                size="small"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    REGION__icontains: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                label="DIVISION"
                value={formData.DIVISION__icontains}
                size="small"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    DIVISION__icontains: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                label="BUSINESS"
                value={formData.BUSINESS__icontains}
                size="small"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    BUSINESS__icontains: e.target.value,
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
export default GlQueryForm;
