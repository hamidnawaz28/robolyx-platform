import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  InputField,
  SelectField,
  FileField,
} from "../../../../../../../global/FormFields";
import CustomerServiceIcon from "../../../../../../../assets/customer-service.png";

const category_options = [
  {
    value: "General",
    label: "General",
  },
  {
    value: "Audits",
    label: "Audits",
  },
  {
    value: "Billing",
    label: "Billing",
  },
  {
    value: "Flags",
    label: "Flags",
  },
  {
    value: "Insurance",
    label: "Insurance",
  },
  {
    value: "Client Changes",
    label: "Client Changes",
  },
  {
    value: "Other",
    label: "Other",
  },
  {
    value: "Client Qualification",
    label: "Client Qualification",
  },
  {
    value: "Employee",
    label: "Employee",
  },
  {
    value: "Risk Ranking",
    label: "Risk Ranking",
  },
  {
    value: "Registration",
    label: "Registration",
  },
  {
    value: "Trades",
    label: "Trades",
  },
];

const priority_options = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

export default function NoteForm(props) {
  const {
    formField: { subject, description, category, notes_file, priority },
  } = props;

  return (
    <React.Fragment>
      <Grid container alignItems="center" style={{ marginBottom: "0.4em" }}>
        <Grid item style={{ marginRight: "0.4em" }}>
          <img
            src={CustomerServiceIcon}
            alt="Ticket Edit Icon"
            style={{ width: "2em" }}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            style={{ fontSize: "1em", fontWeight: "bolder" }}
          >
            {props.action == "add" ? "Add a New Note" : "Edit Note"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <InputField
            variant="outlined"
            name={subject.name}
            label={subject.label}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputField
            variant="outlined"
            name={description.name}
            label={description.label}
            fullWidth
            size="small"
            multiline
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name={category.name}
            label={category.label}
            data={category_options}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name={priority.name}
            label={priority.label}
            data={priority_options}
            fullWidth
          />
        </Grid>
        <Grid item>
          <input
            id="notes_file"
            name="notes_file"
            type="file"
            onChange={(event) => {
              props.setFieldValue("notes_file", event.currentTarget.files[0]);
            }}
            className="form-control"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
