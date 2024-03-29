import React, { useState, useEffect } from "react";
import moment from "moment";
// Icons

import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import BackupIcon from "@material-ui/icons/Backup";
import EventIcon from "@material-ui/icons/Event";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";

import Switch from "@material-ui/core/Switch";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
//bring trash icon from material ui

import { IconButton } from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import CropRotateIcon from "@material-ui/icons/CropRotate";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
//Accordin
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//json structure
import form_structure from "../main/pages/vendor_management/vendor_admin/add_review_template/jsonformat";
import { Typography } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import localStorage from "../common/storage/localStorage";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

//Responsive
import useMediaQuery from "@material-ui/core/useMediaQuery";

//Drag and Drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

console.log(form_structure.sections);
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accord_summary: {
    width: "100%",
  },
  section_cont: {
    backgroundColor: "#15616d",
    color: "#fff",
  },
  input: {
    color: "#fff",
  },
  underline: {
    "&::after": {
      border: "1px solid #fff",
    },
  },
  textfield: {
    color: "#fff",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  add_border: {
    borderLeft: "6px solid #4285f4",
  },
  saved_questions: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px 2px",
    textTransform: "capitalize",
    display: "flex",
    flexDirection: "column",
  },
  Accordion_summ_Ques: {
    fontSize: "15px",
    fontWeight: "600",
    letterSpacing: ".1px",
    lineHeight: "24px",
    paddingBottom: "8px",
  },
  Accordion_summ_option: {
    fontFamily: " Roboto,Arial,sans-serif",
    fontSize: " 13px",
    fontWeight: "400",
    letterSpacing: ".2px",
    lineHeight: "20px",
    color: "#202124",
  },
  quesText: {
    marginBottom: "1em",
  },
  text_input: {
    "&:hover": {
      borderBottom: "1px solid #d3d3d3",
    },
    "&.Mui-focused": {
      borderBottom: "2px solid black",
    },
  },
  answerInput: {
    "&.Mui-disabled": {
      backgroundColor: "#f4f4f4",
      color: "#000",
      fontWeight: "600",
    },
    "&.MuiFilledInput-input": {
      padding: "12px 12px 10px",
    },
  },
  accordion_contain: {
    marginBottom: "1em",
  },
}));

function ComplianceQuestionTemplate({
  sections,
  setSections,
  method,
  formType,
}) {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const [expanded, setExpanded] = React.useState(false);

  //localStorage.set("section", form_structure.sections);

  console.log(sections);

  function changesectionname(text, i) {
    let sections_temp = [...sections];
    sections_temp[i].section_name = text;
    setSections(sections_temp);

    method === "update"
      ? localStorage.set("section_edit", sections)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections)
      : localStorage.set("section", sections);
  }

  function restoreForm() {
    method === "update"
      ? localStorage.remove("section_edit")
      : method === "complianceTask"
      ? localStorage.remove("compliance_task")
      : method === "update-compliance-task"
      ? localStorage.remove("comp_task_temp")
      : localStorage.remove("section");

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
            question_text: "Please write question text here",
            question_type: "Radio",
            options: [{ optionText: "Option1 Text" }],
            answer: false,
            answerkey: "",
            checkbox_selected: [false],
            checkbox_answerkey: [],
            points: 0,
            open: false,
            validationProps: {
              required: "",
            },
            required: false,
            selectedAnswer: "",
          },
        ],
      },
    ]);
  }

  function changesectiondesp(text, i) {
    let sections_temp = [...sections];
    sections_temp[i].section_desp = text;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections)
      : localStorage.set("section", sections);
  }

  function deleteQuestion(i, k) {
    let sec = [...sections];
    if (sections[i].questions.length > 1) {
      sec[i].questions.splice(k, 1);
    }
    setSections(sec);

    method === "update"
      ? localStorage.set("section_edit", sections)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections)
      : localStorage.set("section", sections);
  }

  function handleQuestionValue(text, i, k) {
    var sections_temp = [...sections];
    sections_temp[i].questions[k].question_text = text;
    setSections(sections_temp);

    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function addQuestionType(i, k, type) {
    let sections_temp = [...sections];
    sections_temp[i].questions[k].question_type = type;
    sections_temp[i].questions[k].answerkey = "";
    sections_temp[i].questions[k].checkbox_answerkey = [];
    sections_temp[i].questions[k].checkbox_selected.fill(false);
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function addMoreQuestionField(i) {
    let sections_temp = [...sections];
    let len = sections_temp[i].questions.length + 1;
    let randomNum = Math.floor(Math.random() * 1000000000);
    console.log("length of ques array", len);
    let quesName = String(len) + "_" + String(randomNum);
    console.log(quesName);

    sections_temp[i].questions.push({
      name: quesName,
      question_text: "Please write question text here",
      question_type: "Radio",
      options: [{ optionText: "Option1 Text" }],
      answer: false,
      answerkey: "",
      checkbox_selected: [false],
      checkbox_answerkey: [],
      points: 0,
      open: false,
      validationProps: {
        required: "",
      },
      required: false,
      selectedAnswer: "",
    });
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function addSectionField() {
    let sections_temp = [...sections];

    let randomNum = Math.floor(Math.random() * 100000000);
    let secId = "sec" + randomNum;

    sections_temp.push({
      section_name: "Section Name",
      section_desp: "section Description",
      section_id: secId,
      submitted: false,

      questions: [
        {
          name: "checkbox_0_4356478543",
          question_text: "Please write question text here",
          question_type: "Radio",
          options: [{ optionText: "Option1 Text" }],
          answer: false,
          answerkey: "",
          checkbox_selected: [false],
          checkbox_answerkey: [],
          points: 0,
          open: false,
          validationProps: {
            required: "",
          },
          required: false,
          selectedAnswer: "",
        },
      ],
    });
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function handleOptionValue(text, i, k, p) {
    let sections_temp = [...sections];
    sections_temp[i].questions[k].options[p].optionText = text;
    //newMembersEmail[i]= email;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function adddeleteSection(i) {
    let sections_temp = [...sections];
    if (sections_temp.length > 1) {
      sections_temp.splice(i, 1);
      setSections(sections_temp);
      method === "update"
        ? localStorage.set("section_edit", sections_temp)
        : method === "complianceTask"
        ? localStorage.set("compliance_task", sections_temp)
        : method === "update-compliance-task"
        ? localStorage.set("comp_task_temp", sections_temp)
        : localStorage.set("section", sections_temp);
    } else {
      method === "update"
        ? localStorage.set("section_edit", form_structure.sections)
        : method === "complianceTask"
        ? localStorage.set("compliance_task", form_structure.sections)
        : method === "update-compliance-task"
        ? localStorage.set("comp_task_temp", form_structure.sections)
        : localStorage.set("section", form_structure.sections);

      setSections(form_structure.sections);
    }
    //console.log(optionsOfQuestion);
  }

  function addOption(i, k) {
    let sections_temp = [...sections];
    if (sections_temp[i].questions[k].options.length < 5) {
      sections_temp[i].questions[k].options.push({
        optionText:
          "Option " + (sections_temp[i].questions[k].options.length + 1),
      });
      sections_temp[i].questions[k].checkbox_selected.push(false);
    } else {
      alert("Max 5 options are allowed");
    }
    //console.log(optionsOfQuestion);
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function addAnswer(i, k) {
    let sections_temp = [...sections];
    sections_temp[i].questions[k].answer =
      !sections_temp[i].questions[k].answer;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function resetAnswers(i, k) {
    let sections_temp = [...sections];
    sections_temp[i].questions[k].answerkey = "";
    sections_temp[i].questions[k].checkbox_answerkey = [];
    sections_temp[i].questions[k].checkbox_selected.fill(false);

    sections_temp[i].questions[k].answer =
      !sections_temp[i].questions[k].answer;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function handleBack(i, k) {
    let sections_temp = [...sections];

    sections_temp[i].questions[k].answer =
      !sections_temp[i].questions[k].answer;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function expandCloseAll(i) {
    let sec = [...sections];
    for (let j = 0; j < sec[i].questions.length; j++) {
      sec[i].questions[j].open = false;
    }
    setSections(sec);

    method === "update"
      ? localStorage.set("section_edit", sec)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sec)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sec)
      : localStorage.set("section", sec);
  }

  const [radioValue, setRadioValue] = React.useState("");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  function setOptionPoints(points, i, k) {
    var sec = [...sections];

    sec[i].questions[k].points = points;

    setSections(sec);
    method === "update"
      ? localStorage.set("section_edit", sec)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sec)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sec)
      : localStorage.set("section", sec);
  }

  function doneAnswer(i, k) {
    let sec = [...sections];

    sec[i].questions[k].answer = !sec[i].questions[k].answer;
    if (sec[i].questions[k].question_type == "Text") {
      sec[i].questions[k].answerkey = txtAns;
    }

    setSections(sec);

    method === "complianceTask"
      ? localStorage.set("compliance_task", sec)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sec)
      : localStorage.set("section", sec);
  }

  function copyQuestion(i, k) {
    expandCloseAll(i);
    let sections_temp = [...sections];
    var newQuestion = sections_temp[i].questions[k];
    console.log(newQuestion);

    sections_temp[i].questions.push(newQuestion);

    setSections(sections_temp);

    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function requiredQuestion(i, k) {
    var sec = [...sections];

    sec[i].questions[k].required = !sec[i].questions[k].required;

    console.log("question from required", sec[i].questions[k]);

    setSections(sec);
    method === "update"
      ? localStorage.set("section_edit", sec)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sec)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sec)
      : localStorage.set("section", sec);
  }

  function removeOption(i, k, p) {
    var sections_temp = [...sections];
    if (sections_temp[i].questions[k].options.length > 1) {
      sections_temp[i].questions[k].options.splice(p, 1);
      sections_temp[i].questions[k].checkbox_selected.splice(p, 1);
      setSections(sections_temp);
      method === "update"
        ? localStorage.set("section_edit", sections_temp)
        : method === "complianceTask"
        ? localStorage.set("compliance_task", sections_temp)
        : method === "update-compliance-task"
        ? localStorage.set("comp_task_temp", sections_temp)
        : localStorage.set("section", sections_temp);
    }
  }

  function setOptionAnswer(ans, i, k, p) {
    let sections_temp = [...sections];
    if (sections_temp[i].questions[k].question_type === "Checkbox") {
      sections_temp[i].questions[k].answerkey = "";
      sections_temp[i].questions[k].checkbox_selected = sections_temp[
        i
      ].questions[k].checkbox_selected.map((v, i) => (i === p ? !v : v));

      sections_temp[i].questions[k].checkbox_answerkey.push(ans);

      //checkbox_answerkey: [],
    } else {
      sections_temp[i].questions[k].answerkey = "";
      sections_temp[i].questions[k].answerkey = ans;
    }

    // sections_temp[i].questions[k].answerkey = sections_temp[i].questions[
    // 	k
    // ].answerkey.filter(function (item, pos) {
    // 	return sections_temp[i].questions[k].answerkey.indexOf(item) === pos;
    // });

    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function handleExpand(i, k) {
    let qs = [...sections];
    console.log(qs);
    for (let j = 0; j < qs[i].questions.length; j++) {
      console.log(i, k, j);
      if (k === j) {
        console.log(qs[i].questions[k].open);
        qs[i].questions[k].open = true;
        console.log(qs[i].questions[k].open);
      } else {
        qs[i].questions[j].open = false;
      }
    }
    console.log(qs[i].questions[k].open);
    setSections(qs);
    method === "update"
      ? localStorage.set("section_edit", qs)
      : method === "complianceTask"
      ? localStorage.set("compliance_task", qs)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", qs)
      : localStorage.set("section", qs);
  }

  function onDragEnd(result) {
    console.log("result", result);
    if (!result.destination) {
      return;
    }
    var sect = [...sections];
    const itemF = reorder(
      sect,
      result.source.index,
      result.destination.index,
      result.source.droppableId
    );
    setSections(itemF);
  }

  const reorder = (list, startIndex, endIndex, droppableId) => {
    const result = Array.from(list);
    console.log("result from reorder", result);
    const [removed] = result[parseInt(droppableId)].questions.splice(
      startIndex,
      1
    );
    result[parseInt(droppableId)].questions.splice(endIndex, 0, removed);
    return result;
  };

  // const handleDateChange = (date) => (date, i, k) => {
  //   console.log("I am called", date);
  //   let sections_temp = [...sections];
  //   sections_temp[i].questions[k].answerkey = date;

  //   let sec = [...sections];

  //   sec[i].questions[k].answerkey = date;

  //   setSections(sec);

  //   method === "complianceTask"
  //     ? localStorage.set("compliance_task", sec)
  //     : method === "update-compliance-task"
  //     ? localStorage.set("comp_task_temp", sec)
  //     : localStorage.set("section", sec);
  // };

  const handleDateChange = (date, i, k) => {
    console.log("DATE", date, i, k);

    let sections_temp = [...sections];

    var dateStr = moment(date).format("YYYY-MM-DD");

    console.log("dateStr", dateStr);

    sections_temp[i].questions[k].answerkey = dateStr;

    setSections(sections_temp);

    method === "complianceTask"
      ? localStorage.set("compliance_task", sections_temp)
      : method === "update-compliance-task"
      ? localStorage.set("comp_task_temp", sections_temp)
      : localStorage.set("section", sections_temp);
  };

  const [txtAns, setTxtAns] = React.useState("");

  const handleChangeTxtAns = (event) => {
    setTxtAns(event.target.value);
  };

  function questionsUI() {
    return sections.map((section, i) => (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={String(i)}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Grid
                container
                direction={matches ? "column-reverse" : "row"}
                style={{
                  border: "2px solid #eee",
                  backgroundColor: "#eee",
                  marginBottom: "4em",
                }}
                spacing={6}
              >
                <Grid item sm={11}>
                  <Grid container direction="column">
                    <Grid item>
                      <Card className={classes.section_cont} variant="outlined">
                        <CardContent>
                          <Grid container>
                            <Grid
                              item
                              sm={6}
                              style={{ marginBottom: matches ? "1em" : 0 }}
                            >
                              <Grid container alignItems="center" spacing={2}>
                                {matches ? (
                                  ""
                                ) : (
                                  <Grid item>
                                    <Typography variant="h6">
                                      {" "}
                                      Section Name :{" "}
                                    </Typography>
                                  </Grid>
                                )}

                                <Grid item sm={8}>
                                  <TextField
                                    fullWidth
                                    type="text"
                                    placeholder={section.section_name}
                                    value={section.section_name}
                                    onChange={(e) =>
                                      changesectionname(e.target.value, i)
                                    }
                                    InputProps={{
                                      classes: {
                                        input: classes.input,
                                        underline: classes.underline,
                                      },
                                    }}
                                  ></TextField>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item sm={6}>
                              <Grid container alignItems="center" spacing={2}>
                                {matches ? (
                                  ""
                                ) : (
                                  <Grid item>
                                    <Typography variant="h6">
                                      Description :
                                    </Typography>
                                  </Grid>
                                )}
                                <Grid item sm={9}>
                                  <TextField
                                    fullWidth
                                    type="text"
                                    placeholder={section.section_desp}
                                    value={section.section_desp}
                                    onChange={(e) =>
                                      changesectiondesp(e.target.value, i)
                                    }
                                    InputProps={{
                                      classes: {
                                        input: classes.input,
                                        underline: classes.underline,
                                      },
                                    }}
                                  ></TextField>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item style={{ paddingTop: "1em" }}>
                      {section.questions.map((ques, k) => (
                        <Draggable key={k} draggableId={String(k)} index={k}>
                          {(provided, snapshot) => (
                            <div
                              className={classes.accordion_contain}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Accordion
                                expanded={sections[i].questions[k].open}
                                onChange={() => {
                                  handleExpand(i, k);
                                }}
                                className={ques.open ? classes.add_border : ""}
                              >
                                {!section.questions[k].open ? (
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                  >
                                    <Card
                                      className={classes.accord_summary}
                                      variant="outlined"
                                    >
                                      <CardContent>
                                        <Grid
                                          container
                                          direction="column"
                                          spacing={2}
                                        >
                                          <Grid item>
                                            <Grid
                                              container
                                              justify="space-between"
                                            >
                                              <Grid item>
                                                <Typography
                                                  className={
                                                    classes.Accordion_summ_Ques
                                                  }
                                                >
                                                  {matches ? "" : "Question #"}{" "}
                                                  {k + 1}. {ques.question_text}
                                                </Typography>
                                              </Grid>
                                              <Grid item>
                                                {ques.answerkey == "" &&
                                                ques.checkbox_answerkey
                                                  .length == 0 &&
                                                ques.question_type !=
                                                  "File Upload" ? (
                                                  <Typography
                                                    variant="caption"
                                                    style={{
                                                      color: "red",
                                                      lineHeight: "0",
                                                    }}
                                                  >
                                                    Please Select Correct Answer
                                                  </Typography>
                                                ) : (
                                                  ""
                                                )}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {ques.question_type === "Text" ? (
                                            <Grid
                                              container
                                              alignItems="center"
                                              alignContent="center"
                                            >
                                              <Grid
                                                item
                                                sm={1}
                                                style={{
                                                  paddingLeft: "1em",
                                                }}
                                              >
                                                <ShortTextIcon
                                                  style={{
                                                    marginRight: "10px",
                                                  }}
                                                />
                                              </Grid>
                                              <Grid item sm={11}>
                                                <TextField
                                                  type="text"
                                                  InputProps={{
                                                    disableUnderline: "true",
                                                    className:
                                                      classes.text_input,
                                                  }}
                                                  placeholder="Long-Answer Text"
                                                  value="Long-Answer Text"
                                                  fullWidth
                                                  disabled
                                                ></TextField>
                                              </Grid>
                                            </Grid>
                                          ) : ques.question_type ===
                                            "File Upload" ? (
                                            <Grid
                                              container
                                              alignItems="center"
                                              alignContent="center"
                                            >
                                              <Grid
                                                item
                                                sm={1}
                                                style={{ paddingLeft: "1em" }}
                                              >
                                                <BackupIcon
                                                  style={{
                                                    paddingRight: "10px",
                                                  }}
                                                />
                                              </Grid>
                                              <Grid item sm={11}>
                                                <TextField
                                                  type="text"
                                                  InputProps={{
                                                    disableUnderline: "true",
                                                    className:
                                                      classes.text_input,
                                                  }}
                                                  placeholder="Upload your file here"
                                                  value="Upload your file here"
                                                  fullWidth
                                                  disabled
                                                ></TextField>
                                              </Grid>
                                            </Grid>
                                          ) : ques.question_type === "Date" ? (
                                            <Grid
                                              container
                                              alignItems="center"
                                              alignContent="center"
                                            >
                                              <Grid item sm={1}>
                                                <EventIcon
                                                  style={{
                                                    marginRight: "10px",
                                                  }}
                                                />
                                              </Grid>
                                              <Grid item sm={11}>
                                                <TextField
                                                  type="text"
                                                  InputProps={{
                                                    disableUnderline: "true",
                                                    className:
                                                      classes.text_input,
                                                  }}
                                                  placeholder="Write your date here"
                                                  value="Write your date here"
                                                  fullWidth
                                                  disabled
                                                ></TextField>
                                              </Grid>
                                            </Grid>
                                          ) : (
                                            <Grid item>
                                              {ques.options.map((op, j) => (
                                                <div key={j}>
                                                  <div
                                                    style={{ display: "flex" }}
                                                  >
                                                    <FormControlLabel
                                                      style={{
                                                        marginLeft: "5px",
                                                        marginBottom: "5px",
                                                      }}
                                                      disabled
                                                      control={
                                                        ques.question_type ===
                                                        "Checkbox" ? (
                                                          <Checkbox
                                                            name="checkedB"
                                                            color="primary"
                                                            required={ques.type}
                                                          />
                                                        ) : ques.question_type ===
                                                          "Radio" ? (
                                                          <Radio
                                                            value="a"
                                                            name="radio-button"
                                                            required={ques.type}
                                                          />
                                                        ) : ques.question_type ===
                                                          "Dropdown" ? (
                                                          <Radio
                                                            value="a"
                                                            name="radio-button"
                                                            required={ques.type}
                                                          />
                                                        ) : (
                                                          <input
                                                            type={
                                                              ques.question_type
                                                            }
                                                            color="primary"
                                                            style={{
                                                              marginRight:
                                                                "3px",
                                                            }}
                                                            required={ques.type}
                                                          />
                                                        )
                                                      }
                                                      label={
                                                        <Typography
                                                          className={
                                                            classes.Accordion_summ_option
                                                          }
                                                        >
                                                          {
                                                            ques.options[j]
                                                              .optionText
                                                          }
                                                        </Typography>
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </Grid>
                                          )}
                                        </Grid>
                                      </CardContent>
                                    </Card>
                                  </AccordionSummary>
                                ) : (
                                  <div></div>
                                )}
                                {!ques.answer ? (
                                  <AccordionDetails>
                                    <Grid container direction="column">
                                      <Grid item className={classes.quesText}>
                                        <Grid container spacing={10}>
                                          <Grid item sm={9}>
                                            <TextField
                                              id="standard-basic"
                                              variant="filled"
                                              fullWidth
                                              placeholder="Question"
                                              value={ques.question_text}
                                              onChange={(e) => {
                                                handleQuestionValue(
                                                  e.target.value,
                                                  i,
                                                  k
                                                );
                                              }}
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            sm={3}
                                            style={{
                                              paddingTop: matches ? 0 : 20,
                                            }}
                                          >
                                            {formType == "to_be_reviewed" ? (
                                              <Select
                                                className="select"
                                                style={{
                                                  color: "#5f6368",
                                                  fontSize: "13px",
                                                }}
                                                value={ques.question_type}
                                              >
                                                {/* <MenuItem value="radio" className="menuitem" >
														 <ShortTextIcon style={{marginRight:"10px"}} /> <span style={{marginBottom:"10px"}}>Short Paragraph</span></MenuItem>
														 */}
                                                <MenuItem
                                                  id="text"
                                                  value="Text"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Text"
                                                    );
                                                  }}
                                                >
                                                  <Grid
                                                    container
                                                    alignItems="center"
                                                  >
                                                    <Grid item>
                                                      <SubjectIcon
                                                        style={{
                                                          marginRight: "10px",
                                                        }}
                                                      />
                                                    </Grid>
                                                    <Grid item>Paragraph</Grid>
                                                  </Grid>
                                                </MenuItem>

                                                <MenuItem
                                                  id="file_upload"
                                                  value="File Upload"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "File Upload"
                                                    );
                                                  }}
                                                >
                                                  <Grid
                                                    container
                                                    alignItems="center"
                                                  >
                                                    <Grid item>
                                                      <BackupIcon
                                                        style={{
                                                          marginRight: "10px",
                                                        }}
                                                      />
                                                    </Grid>
                                                    <Grid item>
                                                      File Upload
                                                    </Grid>
                                                  </Grid>
                                                </MenuItem>

                                                <MenuItem
                                                  id="date"
                                                  value="Date"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Date"
                                                    );
                                                  }}
                                                >
                                                  <Grid
                                                    container
                                                    alignItems="center"
                                                  >
                                                    <Grid item>
                                                      <EventIcon
                                                        style={{
                                                          marginRight: "10px",
                                                        }}
                                                      />
                                                    </Grid>

                                                    <Grid item>Date</Grid>
                                                  </Grid>
                                                </MenuItem>

                                                {/* <MenuItem id="checkbox"><RadioButtonCheckedIcon checked style={{marginRight:"10px", color:"#70757a"}}/> Multiple Choice</MenuItem> */}
                                                <MenuItem
                                                  id="Checkbox"
                                                  value="Checkbox"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Checkbox"
                                                    );
                                                  }}
                                                >
                                                  <Grid
                                                    container
                                                    alignItems="center"
                                                  >
                                                    <Grid item>
                                                      <CheckBoxIcon
                                                        style={{
                                                          marginRight: "10px",
                                                          color: "#70757a",
                                                        }}
                                                        checked
                                                      />
                                                    </Grid>
                                                    <Grid item>Checkboxes</Grid>
                                                  </Grid>
                                                </MenuItem>
                                                <MenuItem
                                                  id="dropdown"
                                                  value="Dropdown"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Dropdown"
                                                    );
                                                  }}
                                                >
                                                  <Grid
                                                    container
                                                    alignItems="center"
                                                  >
                                                    <Grid item>
                                                      <ArrowDropDownCircleIcon
                                                        style={{
                                                          marginRight: "10px",
                                                          color: "#70757a",
                                                        }}
                                                        checked
                                                      />
                                                    </Grid>
                                                    <Grid item>Dropdown</Grid>
                                                  </Grid>
                                                </MenuItem>

                                                <MenuItem
                                                  id="Radio"
                                                  value="Radio"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Radio"
                                                    );
                                                  }}
                                                >
                                                  <Radio
                                                    style={{
                                                      marginRight: "10px",
                                                      color: "#70757a",
                                                    }}
                                                    checked
                                                  />
                                                  Multiple Choice
                                                </MenuItem>
                                                {/* <MenuItem value="40"> <BackupIcon style={{marginRight:"10px"}} /> File Upload</MenuItem>
                                    <MenuItem value="50"> <LinearScaleIcon style={{marginRight:"10px"}} /> Linear Scale</MenuItem>
                                    <MenuItem value="60"> <AppsIcon style={{marginRight:"10px"}} /> Tick-box grid</MenuItem>*/}

                                                {/* <MenuItem value="aate"  onClick= {(e)=>{setType(e.target.id)}}> <EventIcon style={{marginRight:"10px"}} /> Date</MenuItem>
                                    <MenuItem value="date"  onClick= {(e)=>{setType(e.target.id)}}> <ScheduleIcon style={{marginRight:"10px"}} /> Time</MenuItem>
					                                  */}
                                              </Select>
                                            ) : (
                                              <Select
                                                className="select"
                                                style={{
                                                  color: "#5f6368",
                                                  fontSize: "13px",
                                                }}
                                                value={ques.question_type}
                                              >
                                                <MenuItem
                                                  id="date"
                                                  value="Date"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Date"
                                                    );
                                                  }}
                                                >
                                                  <Grid
                                                    container
                                                    alignItems="center"
                                                  >
                                                    <Grid item>
                                                      <EventIcon
                                                        style={{
                                                          marginRight: "10px",
                                                        }}
                                                      />
                                                    </Grid>

                                                    <Grid item>Date</Grid>
                                                  </Grid>
                                                </MenuItem>
                                                <MenuItem
                                                  id="dropdown"
                                                  value="Dropdown"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Dropdown"
                                                    );
                                                  }}
                                                >
                                                  <Grid
                                                    container
                                                    alignItems="center"
                                                  >
                                                    <Grid item>
                                                      <ArrowDropDownCircleIcon
                                                        style={{
                                                          marginRight: "10px",
                                                          color: "#70757a",
                                                        }}
                                                        checked
                                                      />
                                                    </Grid>
                                                    <Grid item>Dropdown</Grid>
                                                  </Grid>
                                                </MenuItem>

                                                <MenuItem
                                                  id="Radio"
                                                  value="Radio"
                                                  onClick={() => {
                                                    addQuestionType(
                                                      i,
                                                      k,
                                                      "Radio"
                                                    );
                                                  }}
                                                >
                                                  <Radio
                                                    style={{
                                                      marginRight: "10px",
                                                      color: "#70757a",
                                                    }}
                                                    checked
                                                  />
                                                  Multiple Choice
                                                </MenuItem>
                                                {/* <MenuItem value="40"> <BackupIcon style={{marginRight:"10px"}} /> File Upload</MenuItem>
                                    <MenuItem value="50"> <LinearScaleIcon style={{marginRight:"10px"}} /> Linear Scale</MenuItem>
                                    <MenuItem value="60"> <AppsIcon style={{marginRight:"10px"}} /> Tick-box grid</MenuItem>*/}

                                                {/* <MenuItem value="aate"  onClick= {(e)=>{setType(e.target.id)}}> <EventIcon style={{marginRight:"10px"}} /> Date</MenuItem>
                                    <MenuItem value="date"  onClick= {(e)=>{setType(e.target.id)}}> <ScheduleIcon style={{marginRight:"10px"}} /> Time</MenuItem>
					                                  */}
                                              </Select>
                                            )}
                                          </Grid>
                                        </Grid>
                                      </Grid>

                                      <Grid item>
                                        {ques.question_type === "Text" ? (
                                          <Grid
                                            container
                                            alignItems="center"
                                            alignContent="center"
                                            style={{ marginTop: "1em" }}
                                          >
                                            <Grid
                                              item
                                              style={{ paddingLeft: "1em" }}
                                            >
                                              <ShortTextIcon
                                                style={{ marginRight: "10px" }}
                                              />
                                            </Grid>
                                            <Grid item sm={11}>
                                              <TextField
                                                type="text"
                                                InputProps={{
                                                  disableUnderline: "true",
                                                  className: classes.text_input,
                                                }}
                                                placeholder="Long-Answer Text"
                                                value="Long-Answer Text"
                                                fullWidth
                                                disabled
                                              ></TextField>
                                            </Grid>
                                          </Grid>
                                        ) : ques.question_type ===
                                          "File Upload" ? (
                                          <Grid
                                            container
                                            alignItems="center"
                                            alignContent="center"
                                            style={{ marginTop: "1em" }}
                                          >
                                            <Grid
                                              item
                                              style={{ paddingLeft: "1em" }}
                                            >
                                              <BackupIcon
                                                style={{ marginRight: "10px" }}
                                              />
                                            </Grid>
                                            <Grid item sm={11}>
                                              <TextField
                                                type="text"
                                                InputProps={{
                                                  disableUnderline: "true",
                                                  className: classes.text_input,
                                                }}
                                                placeholder="Upload your file here"
                                                value="Upload your file here"
                                                fullWidth
                                                disabled
                                              ></TextField>
                                            </Grid>
                                          </Grid>
                                        ) : ques.question_type === "Date" ? (
                                          <Grid
                                            container
                                            alignItems="center"
                                            alignContent="center"
                                            style={{ marginTop: "1em" }}
                                          >
                                            <Grid
                                              item
                                              style={{ paddingLeft: "1em" }}
                                            >
                                              <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                              >
                                                <KeyboardDatePicker
                                                  disableToolbar
                                                  variant="inline"
                                                  format="MM/dd/yyyy"
                                                  margin="normal"
                                                  id="date-picker-inline"
                                                  label="Select a date"
                                                  disabled
                                                  KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                  }}
                                                />
                                              </MuiPickersUtilsProvider>
                                            </Grid>
                                          </Grid>
                                        ) : (
                                          ques.options.map((option, p) => (
                                            <Grid container alignItems="center">
                                              <Grid item sm={1} xs={2}>
                                                {ques.question_type ===
                                                "Radio" ? (
                                                  <Radio
                                                    name={ques.type}
                                                    required={ques.type}
                                                    disabled
                                                  />
                                                ) : ques.question_type ===
                                                  "Dropdown" ? (
                                                  <RadioGroup
                                                    name="radio-button"
                                                    value={ques.answerkey}
                                                    checked={ques.answerkey}
                                                  >
                                                    <FormControlLabel
                                                      required={ques.required}
                                                      value={
                                                        ques.options[p]
                                                          .optionText
                                                      }
                                                      control={<Radio />}
                                                    />
                                                  </RadioGroup>
                                                ) : ques.question_type ===
                                                  "Checkbox" ? (
                                                  <Checkbox
                                                    name="checkedB"
                                                    color="primary"
                                                    checked={
                                                      ques.checkbox_selected[p]
                                                    }
                                                    required={ques.type}
                                                    disabled
                                                  />
                                                ) : (
                                                  <ShortTextIcon
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                  />
                                                )}
                                              </Grid>
                                              <Grid item sm={10} xs={8}>
                                                <TextField
                                                  type="text"
                                                  InputProps={{
                                                    disableUnderline: "true",
                                                    className:
                                                      classes.text_input,
                                                  }}
                                                  placeholder="option"
                                                  value={
                                                    ques.options[p].optionText
                                                  }
                                                  fullWidth
                                                  onChange={(e) => {
                                                    handleOptionValue(
                                                      e.target.value,
                                                      i,
                                                      k,
                                                      p
                                                    );
                                                  }}
                                                ></TextField>
                                              </Grid>
                                              <Grid item sm={1} xs={2}>
                                                <IconButton
                                                  aria-label="delete"
                                                  onClick={() => {
                                                    removeOption(i, k, p);
                                                  }}
                                                >
                                                  <CloseIcon />
                                                </IconButton>
                                              </Grid>
                                            </Grid>
                                          ))
                                        )}
                                      </Grid>
                                      {ques.question_type === "File Upload" ||
                                      ques.question_type === "Date" ||
                                      ques.question_type === "Text" ? (
                                        ""
                                      ) : (
                                        <Grid item>
                                          {ques.options.length < 5 &&
                                          ques.question_type !== "Text" ? (
                                            <Grid className="add_question_body">
                                              <Button
                                                size="small"
                                                onClick={() => {
                                                  addOption(i, k);
                                                }}
                                                style={{
                                                  textTransform: "none",
                                                  color: "#4285f4",
                                                  fontSize: "13px",
                                                  fontWeight: "600",
                                                }}
                                              >
                                                Add Option
                                              </Button>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                      )}
                                      <Divider />
                                      <Grid item>
                                        <Grid
                                          container
                                          alignItems="center"
                                          style={{ marginTop: "1em" }}
                                        >
                                          <Grid item sm={8} xs={12}>
                                            <Grid
                                              container
                                              spacing={2}
                                              direction="column"
                                            >
                                              <Grid item>
                                                <Button
                                                  size="small"
                                                  onClick={() => {
                                                    addAnswer(i, k);
                                                  }}
                                                  style={{
                                                    textTransform: "none",
                                                    color: "#4285f4",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                  }}
                                                >
                                                  <CropRotateIcon
                                                    style={{
                                                      border:
                                                        "2px solid #4285f4",
                                                      padding: "2px",
                                                      marginRight: "8px",
                                                    }}
                                                  />
                                                  Answer key
                                                </Button>
                                              </Grid>
                                              <Grid item>
                                                {ques.answerkey == "" &&
                                                ques.checkbox_answerkey
                                                  .length == 0 &&
                                                ques.question_type !=
                                                  "File Upload" ? (
                                                  <Typography
                                                    variant="caption"
                                                    style={{
                                                      color: "red",
                                                      lineHeight: "0",
                                                    }}
                                                  >
                                                    Please Select Correct Answer
                                                  </Typography>
                                                ) : (
                                                  ""
                                                )}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item>
                                            <IconButton
                                              aria-label="Copy"
                                              onClick={() => {
                                                copyQuestion(i, k);
                                              }}
                                            >
                                              <FilterNoneIcon />
                                            </IconButton>
                                          </Grid>
                                          <Grid item>
                                            <IconButton
                                              aria-label="delete"
                                              onClick={() => {
                                                deleteQuestion(i, k);
                                              }}
                                            >
                                              <DeleteForeverIcon />
                                            </IconButton>
                                          </Grid>
                                          <Grid item>
                                            <span
                                              style={{
                                                color: "#5f6368",
                                                fontSize: "13px",
                                              }}
                                            >
                                              Required
                                            </span>
                                            <Switch
                                              name="checkedA"
                                              color="primary"
                                              checked={ques.required}
                                              onClick={() => {
                                                requiredQuestion(i, k);
                                              }}
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </AccordionDetails>
                                ) : (
                                  <AccordionDetails>
                                    <Grid container direction="column">
                                      <Grid
                                        item
                                        style={{ marginBottom: "1em" }}
                                      >
                                        <Typography variant="h4">
                                          Choose Correct Answer:
                                        </Typography>{" "}
                                      </Grid>
                                      <Grid item>
                                        <Grid container spacing={4}>
                                          <Grid item sm={10}>
                                            <TextField
                                              type="text"
                                              fullWidth
                                              InputProps={{
                                                classes: {
                                                  input: classes.answerInput,
                                                },
                                              }}
                                              placeholder="Question"
                                              value={ques.question_text}
                                              onChange={(e) => {
                                                handleQuestionValue(
                                                  e.target.value,
                                                  i
                                                );
                                              }}
                                              variant="filled"
                                              disabled
                                            />
                                          </Grid>
                                          <Grid item sm={2}>
                                            <TextField
                                              type="number"
                                              variant="outlined"
                                              size="small"
                                              label="Question Marks"
                                              className="points"
                                              min="0"
                                              step="1"
                                              placeholder="0"
                                              value={ques.points}
                                              onChange={(e) => {
                                                setOptionPoints(
                                                  e.target.value,
                                                  i,
                                                  k
                                                );
                                              }}
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        {ques.question_type === "Text" ? (
                                          <Grid
                                            container
                                            alignItems="center"
                                            alignContent="center"
                                            style={{ marginTop: "1em" }}
                                          >
                                            <Grid
                                              item
                                              style={{ paddingLeft: "1em" }}
                                            >
                                              <ShortTextIcon
                                                style={{ marginRight: "10px" }}
                                              />
                                            </Grid>
                                            <Grid item sm={11}>
                                              <TextField
                                                type="text"
                                                InputProps={{
                                                  disableUnderline: "true",
                                                  className: classes.text_input,
                                                }}
                                                placeholder={
                                                  ques.answerkey != ""
                                                    ? ques.answerkey
                                                    : ""
                                                }
                                                fullWidth
                                                onChange={handleChangeTxtAns}
                                              ></TextField>
                                            </Grid>
                                          </Grid>
                                        ) : ques.question_type === "Date" ? (
                                          <Grid
                                            container
                                            alignItems="center"
                                            alignContent="center"
                                            style={{ marginTop: "1em" }}
                                          >
                                            <Grid item sm={11}>
                                              <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                              >
                                                <KeyboardDatePicker
                                                  variant="inline"
                                                  format="MM/dd/yyyy"
                                                  margin="normal"
                                                  id="date-picker-inline"
                                                  label="Enter Date"
                                                  emptyLabel="custom label"
                                                  value={
                                                    ques.answerkey ||
                                                    "01/10/2020"
                                                  }
                                                  onChange={(date) =>
                                                    handleDateChange(date, i, k)
                                                  }
                                                  KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                  }}
                                                />
                                              </MuiPickersUtilsProvider>
                                            </Grid>
                                          </Grid>
                                        ) : ques.question_type ===
                                          "File Upload" ? (
                                          <Grid
                                            container
                                            alignItems="center"
                                            alignContent="center"
                                            style={{ marginTop: "1em" }}
                                          >
                                            <Grid
                                              item
                                              style={{ paddingLeft: "1em" }}
                                            >
                                              <BackupIcon
                                                style={{ marginRight: "10px" }}
                                              />
                                            </Grid>
                                            <Grid item sm={11}>
                                              <TextField
                                                type="text"
                                                InputProps={{
                                                  disableUnderline: "true",
                                                  className: classes.text_input,
                                                }}
                                                placeholder="Upload a File"
                                                value="Upload a File"
                                                fullWidth
                                                disabled
                                              ></TextField>
                                            </Grid>
                                          </Grid>
                                        ) : (
                                          ques.options.map((op, p) => (
                                            <div
                                              className="add_question_body"
                                              key={p}
                                              style={{
                                                marginLeft: "8px",
                                                marginBottom: "10px",
                                                marginTop: "5px",
                                              }}
                                            >
                                              <div key={p}>
                                                <div
                                                  style={{ display: "flex" }}
                                                  className=""
                                                >
                                                  <div className="form-check">
                                                    <label
                                                      style={{
                                                        fontSize: "13px",
                                                      }}
                                                      onClick={() => {
                                                        setOptionAnswer(
                                                          ques.options[p]
                                                            .optionText,
                                                          i,
                                                          k,
                                                          p
                                                        );
                                                      }}
                                                    >
                                                      {ques.question_type ===
                                                      "Radio" ? (
                                                        <RadioGroup
                                                          name="radio-button"
                                                          onChange={
                                                            handleRadioChange
                                                          }
                                                          value={ques.answerkey}
                                                          checked={
                                                            ques.answerkey
                                                          }
                                                        >
                                                          <FormControlLabel
                                                            required={
                                                              ques.required
                                                            }
                                                            value={
                                                              ques.options[p]
                                                                .optionText
                                                            }
                                                            control={<Radio />}
                                                            label={
                                                              ques.options[p]
                                                                .optionText
                                                            }
                                                          />
                                                        </RadioGroup>
                                                      ) : ques.question_type ===
                                                        "Dropdown" ? (
                                                        <RadioGroup
                                                          name="radio-button"
                                                          onChange={
                                                            handleRadioChange
                                                          }
                                                          value={ques.answerkey}
                                                          checked={
                                                            ques.answerkey
                                                          }
                                                        >
                                                          <FormControlLabel
                                                            required={
                                                              ques.required
                                                            }
                                                            value={
                                                              ques.options[p]
                                                                .optionText
                                                            }
                                                            control={<Radio />}
                                                            label={
                                                              ques.options[p]
                                                                .optionText
                                                            }
                                                          />
                                                        </RadioGroup>
                                                      ) : ques.question_type ===
                                                        "Checkbox" ? (
                                                        <FormControlLabel
                                                          control={
                                                            <Checkbox
                                                              name={
                                                                ques.question_text
                                                              }
                                                            />
                                                          }
                                                          label={
                                                            ques.options[p]
                                                              .optionText
                                                          }
                                                          value="option3"
                                                          required={
                                                            ques.required
                                                          }
                                                          checked={
                                                            ques
                                                              .checkbox_selected[
                                                              p
                                                            ]
                                                          }
                                                        />
                                                      ) : (
                                                        <ShortTextIcon
                                                          style={{
                                                            marginRight: "10px",
                                                          }}
                                                        />
                                                      )}
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))
                                        )}
                                      </Grid>
                                      <Grid item>
                                        <Grid container spacing={2}>
                                          <Grid item>
                                            <Button
                                              variant="outlined"
                                              color="primary"
                                              style={{
                                                textTransform: "none",
                                                color: "#4285f4",
                                                fontSize: "12px",
                                                marginTop: "12px",
                                                fontWeight: "600",
                                              }}
                                              onClick={() => {
                                                doneAnswer(i, k);
                                              }}
                                            >
                                              Save Correct Answer
                                            </Button>
                                          </Grid>
                                          <Grid item>
                                            <Button
                                              variant="outlined"
                                              color="primary"
                                              style={{
                                                textTransform: "none",
                                                color: "#4285f4",
                                                fontSize: "12px",
                                                marginTop: "12px",
                                                fontWeight: "600",
                                              }}
                                              onClick={() => {
                                                resetAnswers(i, k);
                                              }}
                                            >
                                              Reset Answer
                                            </Button>
                                          </Grid>
                                          <Grid item>
                                            <Button
                                              variant="outlined"
                                              color="primary"
                                              style={{
                                                textTransform: "none",
                                                color: "#4285f4",
                                                fontSize: "12px",
                                                marginTop: "12px",
                                                fontWeight: "600",
                                              }}
                                              onClick={() => {
                                                handleBack(i, k);
                                              }}
                                            >
                                              Back
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </AccordionDetails>
                                )}
                              </Accordion>
                            </div>
                          )}
                        </Draggable>
                        //Question ends here
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={1}>
                  <Card
                    style={{
                      position: "sticky",
                      top: matches ? 0 : 75,
                      width: matches ? "100%" : "60%",
                    }}
                  >
                    <CardContent
                      style={{ padding: matches ? "0" : "0.5em 0em" }}
                    >
                      <Grid
                        container
                        direction={matches ? "row" : "column"}
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <IconButton
                            aria-label="add_question"
                            onClick={() => {
                              addMoreQuestionField(i);
                            }}
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            aria-label="add_section"
                            onClick={() => {
                              restoreForm();
                            }}
                          >
                            <SettingsBackupRestoreIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            aria-label="add_section"
                            onClick={() => {
                              addSectionField(i);
                            }}
                          >
                            <LibraryAddIcon />
                          </IconButton>
                        </Grid>

                        <Grid item>
                          <IconButton
                            aria-label="delete_section"
                            onClick={() => {
                              adddeleteSection(i);
                            }}
                          >
                            <DeleteSweepIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    ));
  }
  return (
    <Grid>
      <Grid className={classes.question_form}>
        <br></br>

        {questionsUI()}
      </Grid>
    </Grid>
  );
}

export default ComplianceQuestionTemplate;
