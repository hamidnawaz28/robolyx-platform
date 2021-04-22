import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputField,
  SelectField,
  DatePickerField,
} from "../../../../../global/FormFields";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const ticket_color_options = [
  {
    value: undefined,
    label: "None",
  },
  {
    value: "Red",
    label: "Red",
  },
  {
    value: "Blue",
    label: "Blue",
  },
  {
    value: "Green",
    label: "Green",
  },
];

const ticket_priority_options = [
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

const ticket_type_options = [
  {
    value: "New_feature",
    label: "New Feature",
  },
  {
    value: "Data_Discrepancy",
    label: "Data Discrepancy",
  },
  {
    value: "Software_bug",
    label: "Software Bug",
  },
  {
    value: "Custom_Analytics_request",
    label: "Custom Analytics Request",
  },
  {
    value: "Data_import_export_issue",
    label: "Data Import Export Issue",
  },
  {
    value: "other",
    label: "Other",
  },
];

const ticket_status_options = [
  {
    value: "resolved",
    label: "Resolved",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
];

const ticket_archive_options = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Archive",
    label: "Archive",
  },
];

const listData = [
  { id: 1, label: "Open Tickets", value: "Open_Tickets" },
  { id: 2, label: "InProgress Tickets", value: "In_Progress_Tickets" },
  { id: 3, label: "Resolved Tickets", value: "Resolved_Tickets" },
];

export default function TicketAdd(props) {
  const alluser = useSelector((state) => state.tickets.listUser);
  const allTickets = useSelector((state) => state.tickets.ticketsData);

  const users_option_data = alluser.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const list_option_data = listData.map((list) => ({
    value: list.value,
    label: list.label,
  }));

  const {
    formField: {
      ticket_title,
      ticket_content,
      ticket_color,
      priority,
      ticket_types,
      due_date,
      status,
      responsible_person,
      list_tickets,
      archive,
    },
  } = props;
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item container xs={12} sm={12}>
          <Grid item xs={12} sm={9} style={{ marginBottom: "1em" }}>
            <InputField
              variant="outlined"
              name={ticket_content.name}
              label={ticket_content.label}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField
            name={ticket_title.name}
            label={ticket_title.label}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <SelectField
            name={ticket_color.name}
            label={ticket_color.label}
            data={ticket_color_options}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <DatePickerField
            variant="outlined"
            name={due_date.name}
            label={due_date.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name={priority.name}
            label={priority.label}
            data={ticket_priority_options}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <SelectField
            name={ticket_types.name}
            label={ticket_types.label}
            data={ticket_type_options}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name={responsible_person.name}
            label={responsible_person.label}
            data={users_option_data}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name={list_tickets.name}
            label={list_tickets.label}
            data={list_option_data}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name={archive.name}
            label={archive.label}
            data={ticket_archive_options}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
