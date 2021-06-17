import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import ComplianceQuestionTemplate from "../../../../../global/ComplianceQuestionTemplate";
import { Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import localStorage from "../../../../../common/storage/localStorage";
import form_structure from "./jsonformat";
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

function AddComplianceTask() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [formName, setFormName] = useState("Untitled Form");
  const [sections, setSections] = useState([]);
  const [formType, setFormType] = React.useState("auto_answer");
  const [priority, setPriority] = React.useState("low");
  const [reqStatus, setReqStatus] = React.useState("optional");
  const [category, setCategory] = React.useState("");

  //localStorage.set("section", form_structure.sections);

  //console.log("Form title", formName);

  useEffect(() => {
    if (localStorage.get("compliance_task")) {
      let sec = localStorage.get("compliance_task");
      setSections(sec);
    } else {
      localStorage.set("compliance_task", form_structure.sections);
      //setSections(form_structure.sections);
      window.location.reload();
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
    let form_questions = localStorage.get("compliance_task");

    let unselectedAns = 0;

    form_questions.map((sec) =>
      sec.questions.map((q) => (q.answerkey == "" ? (unselectedAns += 1) : ""))
    );

    console.log("unselectedAns", unselectedAns);

    let user = localStorage.get("user");
    let created_by = user.userId;
    let form_name = formName;

    let post_data = {
      form_questions: form_questions,
      form_name: form_name,
      category: category,
      form_type: formType,
      priority: priority,
      req_status: reqStatus,
      status: "active",
      created_by: created_by,
    };

    console.log("Sec and user here", post_data);

    var config = {
      method: "post",
      url: "http://127.0.0.1:8090/api/vendor_management/compliance-task/",
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
          alert("Compliance Task Submitted Successfully");

          localStorage.remove("compliance_task");
          //localStorage.set('section', form_structure.sections);
          setSections([
            {
              section_name: "Section Name",
              section_desp: "section Description",
              section_id: "sec86432769",
              submitted: false,

              questions: [
                {
                  name: "0_4356478543",
                  question_text: "Please enter Question Text here",
                  question_type: "Radio",
                  options: [{ optionText: "Option1 Text" }],
                  answer: false,
                  answerkey: "",
                  checkbox_selected: [false],
                  checkbox_answerkey: [],
                  points: 0,
                  open: false,
                  required: false,
                  selectedAnswer: "",
                },
              ],
            },
          ]);
          setFormName("untitled Form");
        } else alert("Error");
        console.log(data);
        localStorage.set("compliance_task", form_structure.sections);
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
            Add Compliance Task
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
            Save Compliance Task
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item sm={12} xs={12}>
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

      <ComplianceQuestionTemplate
        sections={sections}
        setSections={setSections}
        method="complianceTask"
        formType={formType}
      />
    </Grid>
  );
}

export default AddComplianceTask;
