import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ReviewQuestion from "./ReviewQuestion.component";
import { Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import axios from "axios";
import localStorage from "../../.././../../common/storage/localStorage";

const useStyles = makeStyles((theme) => ({
  question_form_top_name: {
    border: "1px solid #e1e9f1",
    marginTop: "0.1em",
  },
  form_head: {
    padding: "0.5em",
  },
}));

function AddReviewTemplate() {
  const classes = useStyles();
  const [formName, setFormName] = useState("untitled Form");

  console.log("Form title", formName);

  function handleSaveTemplate() {
    let sec = localStorage.get("section");

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
        if (!error) alert("Template Submitted Successfully");
        else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Grid>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <h2>Add Review Templates</h2>
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
            Save Template
          </Button>
        </Grid>
      </Grid>

      <Grid container className={classes.form_head} alignItems="center">
        <Grid item>
          <Typography variant="h5">Review Template Name : </Typography>
        </Grid>
        <Grid item style={{ marginLeft: "1em" }}>
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

      <ReviewQuestion />
    </Grid>
  );
}

export default AddReviewTemplate;
