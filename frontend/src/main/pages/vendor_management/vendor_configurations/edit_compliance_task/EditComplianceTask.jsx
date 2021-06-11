import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ComplianceQuestion from "../../../../../global/ComplianceQuestionTemplate";
import { Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import axios from "axios";
import localStorage from "../../../../../common/storage/localStorage";
import form_structure from "../add_compliance_task/jsonformat";
import { fetchCategoriesStart } from "../redux/complianceTaskActions";
//Responsive
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  question_form_top_name: {
    border: "1px solid #e1e9f1",
    marginTop: "0.1em",
  },
  form_head: {
    padding: "0.5em",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "80%",
  },
}));

function EditComplianceTask() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const comp_task_edit = localStorage.get("comp_task_edit");
  console.log("comp_task_edit", comp_task_edit);
  const form_name = comp_task_edit.form_name;
  const status = comp_task_edit.activation_status;

  const [formName, setFormName] = useState(form_name);
  const [sections, setSections] = useState([]);
  const [formType, setFormType] = React.useState(
    comp_task_edit.form_type ? comp_task_edit.form_type : ""
  );
  const [priority, setPriority] = React.useState(
    comp_task_edit.priority ? comp_task_edit.priority : ""
  );
  const [reqStatus, setReqStatus] = React.useState(
    comp_task_edit.req_status ? comp_task_edit.req_status : ""
  );
  const [category, setCategory] = React.useState(
    comp_task_edit.category ? comp_task_edit.category : ""
  );

  console.log("Form title", formName);

  const [activeStatus, setActiveStatus] = React.useState({
    checkedA: status === "active" ? true : false,
  });

  const handleActiveChange = (event) => {
    setActiveStatus({
      ...activeStatus,
      [event.target.name]: event.target.checked,
    });
    //setState({ ...state, [event.target.name]: event.target.checked });
  };

  console.log("activeStatus", activeStatus.checkedA);

  useEffect(() => {
    if (comp_task_edit.form_questions) {
      let sec = localStorage.get("comp_task_temp");
      setSections(sec);
    } else {
      localStorage.set("comp_task_edit", form_structure.sections);
      //setSections(form_structure.sections);
    }
    dispatch(fetchCategoriesStart());
  }, []);

  const catList = useSelector((state) => state.complianceTask.categories);
  console.log(catList);

  const handleFormType = (event) => {
    setFormType(event.target.value);
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleReqStatus = (event) => {
    setReqStatus(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  function handleSaveTemplate() {
    let comp_id = comp_task_edit.id;
    let form_questions = localStorage.get("comp_task_temp");

    let form_name = formName;

    let post_data = {
      form_name: form_name,
      form_questions: form_questions,
      activation_status: activeStatus.checkedA ? "active" : "deactivated",
      category: category,
      form_type: formType,
      priority: priority,
      req_status: reqStatus,
    };

    console.log("console from update func", post_data);

    var config = {
      method: "put",
      url: `http://127.0.0.1:8090/api/vendor_management/compliance-task/${comp_id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: post_data,
      //data: JSON.stringify(data),
    };
    axios(config)
      .then((res) => {
        const { data } = res;
        const { error, message } = JSON.stringify(data);
        if (!error) {
          alert("Compliance Task Updated Successfully");

          localStorage.remove("comp_task_edit");

          //history.push("/vendor-management/invite-vendor");

          history.push({
            pathname: "/vendor-management/vendor-configs",
            value: 2,
          });

          //localStorage.set('section', form_structure.sections);
        } else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Grid>
      <Grid container alignItems="center" justify="space-between">
        <Grid item style={{ marginBottom: "1em" }}>
          <Typography variant={matches ? "h4" : "h2"}>
            Edit Compliance Task
          </Typography>
        </Grid>
        <Grid item style={{ marginRight: "1em" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={handleSaveTemplate}
          >
            Update Compliance Task Template
          </Button>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Grid item>
          <Grid container className={classes.form_head} alignItems="center">
            <Grid item>
              <Typography variant="h5">Compliance Task Name : </Typography>
            </Grid>
            <Grid item style={{ marginLeft: matches ? "0" : "1em" }}>
              <TextField
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder={formName}
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={activeStatus.checkedA}
                onChange={handleActiveChange}
                name="checkedA"
              />
            }
            label="Status"
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item sm={6} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="formType-label">Form Type</InputLabel>
            <Select
              labelId="formType-label"
              id="formType"
              value={formType}
              onChange={handleFormType}
            >
              <MenuItem value="auto_answer">Auto Answer</MenuItem>
              <MenuItem value="to_be_reviewed">To be reviewed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              {catList.map((cat) => (
                <MenuItem key={cat.name} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={priority}
              onChange={handlePriority}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="req_status-label">Required Status</InputLabel>
            <Select
              labelId="req_status-label"
              id="req_status"
              value={reqStatus}
              onChange={handleReqStatus}
            >
              <MenuItem value="optional">Optional</MenuItem>
              <MenuItem value="compulsory">Compulsory</MenuItem>
              <MenuItem value="conditional">Conditional</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <ComplianceQuestion
        sections={sections}
        setSections={setSections}
        method="update-compliance-task"
      />
    </Grid>
  );
}

export default EditComplianceTask;
