import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ReviewQuestion from "../../../../../global/ReviewQuestion.component";
import { Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import localStorage from "../../../../../common/storage/localStorage";
import form_structure from "../add_review_template/jsonformat";

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

function AddReviewTemplate() {
  const classes = useStyles();
  let history = useHistory();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const temp = localStorage.get("temp");
  console.log("temp", temp);
  const form_name = temp.name;
  const status = temp.status;

  const [formName, setFormName] = useState(form_name);
  const [sections, setSections] = useState([]);

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
    if (localStorage.get("section_edit")) {
      let sec = localStorage.get("section_edit");
      setSections(sec);
    } else {
      localStorage.set("section_edit", form_structure.sections);
      //setSections(form_structure.sections);
    }
  }, []);

  function handleSaveTemplate() {
    let temp_id = temp.id;
    let sec = localStorage.get("section_edit");

    let user = localStorage.get("user");
    let name = formName;

    console.log("Sec and user here", sec);

    let post_data = {
      name: name,
      JSON_fields: sec,
      status: activeStatus.checkedA ? "active" : "deactivated",
    };

    console.log("console from updated func", post_data);

    var config = {
      method: "put",
      url: `http://127.0.0.1:8090/api/vendor_management/review-template/${temp_id}/`,
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
          alert("Template Updated Successfully");

          localStorage.remove("section_edit");
          localStorage.remove("temp");

          //history.push("/vendor-management/invite-vendor");

          history.push({
            pathname: "/vendor-management/invite-vendor",
            value: 3,
            query_review_temp: { name__icontains: name },
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
            Edit Review Templates
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
            Update Template
          </Button>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Grid item>
          <Grid container className={classes.form_head} alignItems="center">
            <Grid item>
              <Typography variant="h5">Review Template Name : </Typography>
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

      <ReviewQuestion
        sections={sections}
        setSections={setSections}
        method="update"
      />
    </Grid>
  );
}

export default AddReviewTemplate;
