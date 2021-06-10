import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { Search, RotateLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import DropDownSelect from "../../../../../../global/dropDownSelect";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  updateVenComplianceQuery,
  fetchVenComplianceListStart,
} from "../../redux/vendorNetworksActions";
import styled from "styled-components";
const BorderWrapper = styled(Box)`
  background: white;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "1em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.2em",
    },
  },
  formControl: {
    width: "100%",
  },
}));

function ComplianceSearchForm(props) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const vendorNetworks = useSelector((state) => state.vendorNetworks);
  const { perPage, currentPage, searchVenReview } = vendorNetworks;
  const { apiLink } = props;
  const classes = useStyles();
  const [complianceStatus, setComplianceStatus] = React.useState("");

  const handleStatusChange = (event) => {
    setComplianceStatus(event.target.value);
    setFormData({
      ...formData,
      compliance_status__exact: event.target.value,
    });
  };

  const initialState = {
    compliance_form_name__icontains: "",
    form_type__icontains: "",
    deadline__icontains: "",
  };
  const [formData, setFormData] = useState(initialState);
  const credentials = apiLink;
  let fetchApiData = {
    vendorId: id,
    currentPage: currentPage,
    perPage: perPage,
  };
  const searchQueryHandle = () => {
    fetchApiData["complianceQuery"] = formData;
    dispatch(updateVenComplianceQuery(formData));
    dispatch(
      fetchVenComplianceListStart({ apiLink: credentials, fetchApiData })
    );
  };
  const resetQueryHandle = () => {
    fetchApiData["complianceQuery"] = initialState;
    setFormData(initialState);
    dispatch(updateVenComplianceQuery(initialState));
    dispatch(
      fetchVenComplianceListStart({ apiLink: credentials, fetchApiData })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              label="Form Name"
              value={formData.compliance_form_name__icontains}
              size="small"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  compliance_form_name__icontains: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              label="Form Type"
              value={formData.form_type__icontains}
              size="small"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  form_type__icontains: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item sm={3}>
            <FormControl
              variant="outlined"
              size="small"
              className={classes.formControl}
            >
              <InputLabel id="approval-status-label">
                Compliance Status
              </InputLabel>
              <Select
                labelId="approval-status-label"
                id="approval-status"
                value={complianceStatus}
                onChange={handleStatusChange}
                label="Compliance Status"
                fullWidth
              >
                <MenuItem value="compliant">Compliant</MenuItem>
                <MenuItem value="non-compliant">Non-compliant</MenuItem>
                <MenuItem value="forced-compliant">Forced Compliant</MenuItem>
                <MenuItem value="forced-non-compliant">
                  Forced Non-compliant
                </MenuItem>
                <MenuItem value="conditional-compliant">
                  Conditional Compliant
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={3}>
            <TextField
              id="date"
              type="date"
              variant="outlined"
              size="small"
              defaultValue="2017-05-24"
              className={classes.textField}
              label="deadline"
              fullWidth
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deadline__icontains: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <Grid container spacing={4} justify="center">
          <Grid item>
            <Button
              style={{
                backgroundColor: "#232f3e",
                color: "#fff",
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
  );
}
export default ComplianceSearchForm;
