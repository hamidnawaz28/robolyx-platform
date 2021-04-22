import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
//import DropDownSelect from '../../../../global/dropDownSelect'
import {
  updateFormQuery,
  fetchTableData,
} from "../../../../global/table/table.actionCreators";
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

function InvoiceQueryForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tableStates = useSelector((state) => state.tableStates);
  const { perPage, currentPage, query } = tableStates;
  const { apiLink } = props;
  const initialState = {
    INVOICE_ID__icontains: "",
    INV_DATE__gt: "",
    INV_DATE__lt: "",
    INV_NUMBER__icontains: "",
    VENDOR_NAME__icontains: "",
    GENERAL_LEDGER__icontains: "",
    LOCATION__icontains: "",
    PO_NUMBER__icontains: "",
    // CATEGORY_LEVEL_ONE : '',
    // CATEGORY_LEVEL_TWO : '',
    // CATEGORY_LEVEL_THREE : '',
    // CATEGORY_LEVEL_FOUR : '',
    // CATEGORY_LEVEL_FIVE : ''
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
                size="small"
                variant="outlined"
                style={{ width: "100%" }}
                label="INVOICE_ID"
                value={formData.INVOICE_ID__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    INVOICE_ID__icontains: e.target.value,
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
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                label="INV_DATE"
                value={formData.INV_DATE__gt}
                onChange={(e) =>
                  setFormData({ ...formData, INV_DATE__gt: e.target.value })
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                style={{ width: "100%" }}
                label="INV_NUMBER"
                value={formData.INV_NUMBER__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    INV_NUMBER__icontains: e.target.value,
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
                label="VENDOR_NAME"
                value={formData.VENDOR_NAME__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    VENDOR_NAME__icontains: e.target.value,
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
                label="GENERAL_LEDGER"
                value={formData.GENERAL_LEDGER__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    GENERAL_LEDGER__icontains: e.target.value,
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
                label="LOCATION"
                value={formData.LOCATION__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    LOCATION__icontains: e.target.value,
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
                label="PO_NUMBER"
                value={formData.PO_NUMBER__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PO_NUMBER__icontains: e.target.value,
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
export default InvoiceQueryForm;
