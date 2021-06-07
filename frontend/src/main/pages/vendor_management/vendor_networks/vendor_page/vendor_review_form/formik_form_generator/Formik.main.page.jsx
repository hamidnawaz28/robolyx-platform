import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, TextField, SelectField, SubmitButton } from "./FormElements";
import * as Yup from "yup";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { fetchVenReviewlistStart } from "../../../redux/vendorNetworksActions";

const useStyles = makeStyles((theme) => ({
  secHeading: {
    fontSize: "2.5em",
    fontWeight: "70",
    marginBottom: "1em",
  },
  ques: {
    fontSize: "1.2em",
    fontWeight: "70",
    marginBottom: "0.3em",
    margin: "1em 0",
  },
  txtFld: {
    width: "100%",
    padding: "1em",
  },
  selectFld: {
    width: "100%",
  },
}));

const formSchemaGenerator = (questions) => {
  let formSchema = {};

  questions.map(
    (question, index) =>
      (formSchema[question.name] = {
        type: question.question_type === "Text" ? "text" : "select",
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

function FormikMain({ section, sectionName }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id, vendorId } = useParams();
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  let formSchema = formSchemaGenerator(section.questions);

  const { searchVenReview, currentPage, perPage, ven_review_templates } =
    useSelector((state) => state.vendorNetworks);

  let fetchApiData = {
    vendorId: vendorId,
    searchVenReview: JSON.stringify(searchVenReview),
    currentPage: currentPage,
    perPage: perPage,
  };

  let vendorTemp =
    ven_review_templates.data &&
    ven_review_templates.data.filter((temp) => temp.id == id);

  console.log("section", section, vendorTemp[0].review_template);

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

      if (formSchema[key].type === "text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "select") {
        _validationSchema[key] = Yup.number().oneOf(
          formSchema[key].options.map((o) => o.optionText)
        );
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required("Required");
      }
    }

    setFormData(_formData);

    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options,
      question_text: elementSchema.question_text,
      question_no: elementSchema.question_no,
    };

    if (elementSchema.type === "text" || elementSchema.type === "email") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span>Q No. {props.question_no}: </span>
            <label htmlFor={props.question_text}>{props.question_text}</label>
          </Typography>
          <TextField {...props} className={classes.txtFld} />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }

    if (elementSchema.type === "select") {
      return (
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.ques}>
            <span>Q No. {props.question_no}: </span>
            <label htmlFor={props.question_text}>{props.question_text}</label>
          </Typography>
          <SelectField {...props} className={classes.selectFld} />
          <Divider style={{ margin: "1em 0" }} />
        </Grid>
      );
    }
  };

  console.log("formData", formData);

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log(values);

    let newTemp = vendorTemp[0].review_template.map((sec) => {
      if (sec.section_id == section.section_id) {
        let sec_temp = { ...sec };
        let updated_q = [];
        let updated_question = sec_temp.questions.map((ques) => {
          Object.keys(values).forEach(function (key) {
            console.log("this is key", key);
            if (key == ques.name) {
              console.log("Matched", ques);
              let ques1 = { ...ques, selectedAnswer: values[key] };
              console.log("updated ques", ques1);
              updated_q.push(ques1);
              return ques1;
            }
          });
        });
        let sec_temp1 = { ...sec_temp, questions: updated_q };
        console.log("updated_question", updated_q);
        //console.log("quwa", sec_temp1);

        return sec_temp1;
      } else {
        return sec;
      }
    });
    console.log(newTemp);

    let post_data = { review_template: newTemp };
    var config = {
      method: "put",
      url: `http://127.0.0.1:8090/api/vendor_management/review-response-status/${id}/`,
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
          dispatch(fetchVenReviewlistStart({ fetchApiData }));
          //setRefreshCert(!refreshCert);
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
        <SubmitButton title="Submit" />
      </Form>
    </>
  );
}

export default FormikMain;
