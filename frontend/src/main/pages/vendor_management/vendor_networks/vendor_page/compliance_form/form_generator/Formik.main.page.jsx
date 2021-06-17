import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
  DateField,
  CheckField,
  RadioField,
  FileUploadField,
} from "./FormElements";
import * as Yup from "yup";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { fetchSingleCompTaskStart } from "../../../redux/vendorNetworksActions";
import StarsIcon from "@material-ui/icons/Stars";

const useStyles = makeStyles((theme) => ({
  secHeading: {
    fontSize: "2em",
    fontWeight: "70",
    marginBottom: "1em",
  },
  ques: {
    fontSize: "1em",
    fontWeight: "70",
    marginBottom: "0.7em",
    margin: "1em 0",
  },
  txtFld: {
    width: "50%",
    padding: "0.5em",
  },
  qno: {
    fontWeight: "600",
  },
}));

const formSchemaGenerator = (questions) => {
  let formSchema = {};

  questions.map(
    (question, index) =>
      (formSchema[question.name] = {
        type: question.question_type,
        label: question.name,
        required: question.required,
        options: question.options,
        question_text: question.question_text,
        question_no: parseInt(index) + 1,
        selectedAnswer: question.selectedAnswer,
      })
  );

  return formSchema;
};

function FormikMain({ section, sectionName, value, setValue, isCompleted }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id, vendorId } = useParams();
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  let formSchema = formSchemaGenerator(section.questions);

  const { single_comp_task } = useSelector((state) => state.vendorNetworks);

  console.log("section", section);

  let maxTabs =
    single_comp_task[0] && single_comp_task[0].compliance_template.length - 1;

  useEffect(() => {
    if (formSchema && formData) {
      initForm(formSchema);
    }
  }, []);

  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      console.log("key", key, formSchema);
      _formData[key] = formSchema[key].selectedAnswer;

      if (formSchema[key].type === "Text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "Dropdown") {
        _validationSchema[key] = Yup.string().oneOf(
          formSchema[key].options.map((o) => o.optionText)
        );
      } else if (formSchema[key].type === "Radio") {
        _validationSchema[key] = Yup.string().oneOf(
          formSchema[key].options.map((o) => o.optionText)
        );
      } else if (formSchema[key].type === "Checkbox") {
        _validationSchema[key] = Yup.array();
      } else if (formSchema[key].type === "Date") {
        _validationSchema[key] = Yup.date();
      } else if (formSchema[key].type === "File Upload") {
        _validationSchema[key] = Yup.mixed();
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required("Required");
      }
    }

    setFormData(_formData);

    console.log("formData", formData);

    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  console.log("formData", validationSchema);

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options,
      question_text: elementSchema.question_text,
      question_no: elementSchema.question_no,
    };

    if (elementSchema.type === "Text" || elementSchema.type === "Email") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span className={classes.qno}>Q No. {props.question_no}: </span>
            <label className={classes.qno} htmlFor={props.question_text}>
              {props.question_text}
            </label>
          </Typography>
          <TextField
            {...props}
            className={classes.txtFld}
            disabled={isCompleted ? true : false}
          />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }

    if (elementSchema.type === "Dropdown") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span className={classes.qno}>Q No. {props.question_no}: </span>
            <label className={classes.qno} htmlFor={props.question_text}>
              {props.question_text}
            </label>
          </Typography>
          <SelectField
            {...props}
            className={classes.selectFld}
            isCompleted={isCompleted}
          />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }

    if (elementSchema.type === "Date") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span className={classes.qno}>Q No. {props.question_no}: </span>
            <label className={classes.qno} htmlFor={props.question_text}>
              {props.question_text}
            </label>
          </Typography>
          <DateField
            {...props}
            className={classes.selectFld}
            isCompleted={isCompleted}
          />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }

    if (elementSchema.type === "Checkbox") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span className={classes.qno}>Q No. {props.question_no}: </span>
            <label className={classes.qno} htmlFor={props.question_text}>
              {props.question_text}
            </label>
          </Typography>
          <CheckField
            {...props}
            className={classes.selectFld}
            isCompleted={isCompleted}
          />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }

    if (elementSchema.type === "Radio") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span className={classes.qno}>Q No. {props.question_no}: </span>
            <label className={classes.qno} htmlFor={props.question_text}>
              {props.question_text}
            </label>
          </Typography>
          <RadioField
            {...props}
            className={classes.selectFld}
            isCompleted={isCompleted}
          />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }

    if (elementSchema.type === "File Upload") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span className={classes.qno}>Q No. {props.question_no}: </span>
            <label className={classes.qno} htmlFor={props.question_text}>
              {props.question_text}
            </label>
          </Typography>
          <FileUploadField
            {...props}
            className={classes.selectFld}
            isCompleted={isCompleted}
          />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }
  };

  console.log("formData", formData);

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    alert(JSON.stringify(values));

    let newTemp = single_comp_task[0].compliance_template.map((sec) => {
      console.log("Hello", sec);
      if (sec.section_id == section.section_id) {
        let sec_temp = { ...sec };
        let updated_q = [];
        let updated_question = sec_temp.questions.map((ques) => {
          Object.keys(values).forEach(function (key) {
            console.log("this is key", key);
            if (key == ques.name) {
              console.log("Matched", ques);
              let ques1 = {
                ...ques,
                selectedAnswer: values[key],
              };
              console.log("updated ques", ques1);
              updated_q.push(ques1);
              return ques1;
            }
          });
        });
        let sec_temp1 = { ...sec_temp, questions: updated_q, submitted: true };
        console.log("updated_question", sec_temp1);
        //console.log("quwa", sec_temp1);
        return sec_temp1;
      } else {
        return sec;
      }
    });
    console.log(newTemp);
    let post_data = { compliance_template: newTemp };
    var config = {
      method: "put",
      url: `http://127.0.0.1:8090/api/vendor_management/comp-vendor-task/${id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: post_data,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        const { data } = res;
        const { error, message } = JSON.stringify(data);
        if (!error) {
          console.log("posted data", data);
          alert("Added Successfully");
          dispatch(
            fetchSingleCompTaskStart({ vendorId: vendorId, tempId: id })
          );
          let val = value == maxTabs ? value : value + 1;
          setValue(val);
        } else alert("Error");
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    setSubmitting(false);
  };

  return (
    <>
      <Typography variant="body1" className={classes.secHeading}>
        {sectionName}
      </Typography>

      <Form
        enableReinitialize
        initialValues={formData && formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Grid container direction="column">
          {Object.keys(formSchema).map((key, ind) => (
            <div key={key}>{getFormElement(key, formSchema[key])}</div>
          ))}
        </Grid>
        <SubmitButton title="Save" />
      </Form>
    </>
  );
}

export default FormikMain;
