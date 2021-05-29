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
import {
  updateNoteQuery,
  fetchNotesStart,
} from "../../redux/vendorNetworksActions";
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
  formControl: {
    width: "100%",
  },
}));

const category_option = [
  { name: "General", value: "General" },
  { name: "Audits", value: "Audits" },
  { name: "Billing", value: "Billing" },
  { name: "Flags", value: "Flags" },
  { name: "Insurance", value: "Insurance" },
  { name: "Client Changes", value: "Client Changes" },
  { name: "Other", value: "Other" },
  { name: "Client Qualification", value: "Client Qualification" },
  { name: "Employee", value: "Employee" },
  { name: "Risk Ranking", value: "Risk Ranking" },
  { name: "Registration", value: "Registration" },
  { name: "Trades", value: "Trades" },
];

function VendorNotesSearch(props) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const vendorNetworks = useSelector((state) => state.vendorNetworks);
  const { perPage, currentPage, noteQuery } = vendorNetworks;
  const { apiLink } = props;
  const classes = useStyles();
  const [priority, setPriority] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
    setFormData({
      ...formData,
      priority__exact: event.target.value,
    });
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setFormData({
      ...formData,
      category__exact: event.target.value,
    });
  };

  const initialState = {
    subject__icontains: "",
    description__icontains: "",
  };
  const [formData, setFormData] = useState(initialState);
  const credentials = apiLink;
  let fetchApiData = {
    vendorId: id,
    currentPage: currentPage,
    perPage: perPage,
    project: "1",
  };
  const searchQueryHandle = () => {
    fetchApiData["noteQuery"] = formData;
    dispatch(updateNoteQuery(formData));
    dispatch(fetchNotesStart({ apiLink: credentials, fetchApiData }));
  };
  const resetQueryHandle = () => {
    fetchApiData["noteQuery"] = initialState;
    setFormData(initialState);
    dispatch(updateNoteQuery(initialState));
    dispatch(fetchNotesStart({ apiLink: credentials, fetchApiData }));
  };
  // useEffect(()=>{

  // },[])
  return (
    <BorderWrapper p={3} mb={3}>
      <Typography variant="h6">Search Options:</Typography>
      <Grid container spacing={4} style={{ marginTop: "0.5em" }}>
        <Grid item sm={12}>
          <Grid container spacing={4}>
            <Grid item md={3} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                label="Subject"
                value={formData.subject__icontains}
                size="small"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject__icontains: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
                label="Description"
                value={formData.description__icontains}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description__icontains: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <FormControl
                variant="outlined"
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="approval-status-label">Priority</InputLabel>
                <Select
                  labelId="approval-status-label"
                  id="approval-status"
                  value={priority}
                  onChange={handlePriorityChange}
                  label="Priority"
                  fullWidth
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3} sm={6} xs={6}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category-outlined"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  {category_option.map((cat) => (
                    <MenuItem value={cat.value}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12}>
          <Grid container spacing={2} justify="center" className={classes.root}>
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
export default VendorNotesSearch;
