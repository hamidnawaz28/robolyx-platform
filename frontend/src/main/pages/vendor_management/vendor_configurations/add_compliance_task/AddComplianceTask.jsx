import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ReviewQuestion from "../../../../../global/ReviewQuestion.component";
import { Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import axios from "axios";
import localStorage from "../../../../../common/storage/localStorage";
import form_structure from "./jsonformat";

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
}));

function AddComplianceTask() {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [formName, setFormName] = useState("Untitled Form");
  const [sections, setSections] = useState([]);

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
  }, []);

  function handleSaveTemplate() {
    let sec = localStorage.get("compliance_task");

    let user = localStorage.get("user");
    let created_by = user.userId;
    let name = formName;

    console.log("Sec and user here", sec, created_by);

    let post_data = {
      name: name,
      JSON_fields: sec,
      status: "active",
      created_by: created_by,
    };

    var config = {
      method: "post",
      url: "http://127.0.0.1:8090/api/vendor_management/review-template/",
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
          alert("Template Submitted Successfully");

          localStorage.remove("section");
          //localStorage.set('section', form_structure.sections);
          setSections([
            {
              section_name: "Section Name",
              section_desp: "section Description",

              questions: [
                {
                  question_text: "Please enter Question Text here",
                  question_type: "Radio",
                  options: [{ optionText: "Option1 Text" }],
                  answer: false,
                  answerkey: "",
                  checkbox_answerkey: [false],
                  points: 0,
                  open: false,
                  required: false,
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

      <ReviewQuestion
        sections={sections}
        setSections={setSections}
        method="complianceTask"
      />
    </Grid>
  );
}

export default AddComplianceTask;
