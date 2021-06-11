import React, { useState, useEffect } from "react";

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

function ReviewQuestion({ sections, setSections, method }) {
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
      : localStorage.set("section", sections);
  }

  function restoreForm() {
    method === "update"
      ? localStorage.remove("section_edit")
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
            question_type: "Checkbox",
            options: [
              { optionText: 1 },
              { optionText: 2 },
              { optionText: 3 },
              { optionText: 4 },
              { optionText: 5 },
            ],
            answer: false,
            answerkey: "",
            checkbox_answerkey: [false],
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
      : localStorage.set("section", sections);
  }

  function handleQuestionValue(text, i, k) {
    var sections_temp = [...sections];
    sections_temp[i].questions[k].question_text = text;
    setSections(sections_temp);

    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function addQuestionType(i, k, type) {
    let sections_temp = [...sections];
    sections_temp[i].questions[k].question_type = type;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
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
      question_type: "Dropdown",
      options: [
        { optionText: 1 },
        { optionText: 2 },
        { optionText: 3 },
        { optionText: 4 },
        { optionText: 5 },
      ],
      answer: false,
      answerkey: "",
      checkbox_answerkey: [false],
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
          name: "dropdown_0_4356478543",
          question_text: "Please write question text here",
          question_type: "Dropdown",
          options: [
            { optionText: 1 },
            { optionText: 2 },
            { optionText: 3 },
            { optionText: 4 },
            { optionText: 5 },
          ],
          answer: false,
          answerkey: "",
          dropdown_answerkey: [false],
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
      : localStorage.set("section", sections_temp);
  }

  function handleOptionValue(text, i, k, p) {
    let sections_temp = [...sections];
    sections_temp[i].questions[k].options[p].optionText = text;
    //newMembersEmail[i]= email;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function adddeleteSection(i) {
    let sections_temp = [...sections];
    if (sections_temp.length > 1) {
      sections_temp.splice(i, 1);
      setSections(sections_temp);
      method === "update"
        ? localStorage.set("section_edit", sections_temp)
        : localStorage.set("section", sections_temp);
    } else {
      method === "update"
        ? localStorage.set("section_edit", form_structure.sections)
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
      sections_temp[i].questions[k].checkbox_answerkey.push(false);
    } else {
      alert("Max 5 options are allowed");
    }
    //console.log(optionsOfQuestion);
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
      : localStorage.set("section", sections_temp);
  }

  function addAnswer(i, k) {
    let sections_temp = [...sections];
    sections_temp[i].questions[k].answer =
      !sections_temp[i].questions[k].answer;
    setSections(sections_temp);
    method === "update"
      ? localStorage.set("section_edit", sections_temp)
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
      : localStorage.set("section", sec);
  }

  function doneAnswer(i, k) {
    let sec = [...sections];

    sec[i].questions[k].answer = !sec[i].questions[k].answer;

    setSections(sec);
    setSections(sec);
    method === "update"
      ? localStorage.set("section_edit", sec)
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
      : localStorage.set("section", sections_temp);
  }

  function requiredQuestion(i, k) {
    var sec = [...sections];

    sec[i].questions[k].required = !sec[i].questions[k].required;

    if (sec[i].questions[k].required == true) {
      sec[i].questions[k]["validationProps"] = {
        required: "This is a mandatory field",
      };
    } else if (sec[i].questions[k].required == false) {
      delete sec[i].questions[k].validationProps;
    }

    console.log("question from required", sec[i].questions[k]);

    setSections(sec);
    method === "update"
      ? localStorage.set("section_edit", sec)
      : localStorage.set("section", sec);
  }

  function removeOption(i, k, p) {
    var sections_temp = [...sections];
    if (sections_temp[i].questions[k].options.length > 1) {
      sections_temp[i].questions[k].options.splice(p, 1);
      sections_temp[i].questions[k].checkbox_answerkey.splice(p, 1);
      setSections(sections_temp);
      method === "update"
        ? localStorage.set("section_edit", sections_temp)
        : localStorage.set("section", sections_temp);
    }
  }

  function setOptionAnswer(ans, i, k, p) {
    let sections_temp = [...sections];
    if (sections_temp[i].questions[k].question_type === "Dropdown") {
      sections_temp[i].questions[k].answerkey = "";
      sections_temp[i].questions[k].checkbox_answerkey = sections_temp[
        i
      ].questions[k].checkbox_answerkey.map((v, i) => (i === p ? !v : v));
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
                                            <Typography
                                              className={
                                                classes.Accordion_summ_Ques
                                              }
                                            >
                                              {matches ? "" : "Question #"}{" "}
                                              {k + 1}. {ques.question_text}
                                            </Typography>
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
                                                addQuestionType(i, k, "Text");
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
                                          </Select>
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
                                      ) : (
                                        ques.options.map((option, p) => (
                                          <Grid container alignItems="center">
                                            <Grid item sm={1} xs={2}>
                                              {ques.question_type ===
                                              "Dropdown" ? (
                                                <Radio
                                                  value={ques.answerkey}
                                                  name={ques.type}
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
                                                  className: classes.text_input,
                                                }}
                                                placeholder="option"
                                                value={
                                                  ques.options[p].optionText
                                                }
                                                fullWidth
                                                disabled
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
                                    {ques.question_type === "Text" ? (
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
                                        justify="flex-end"
                                      >
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

export default ReviewQuestion;
