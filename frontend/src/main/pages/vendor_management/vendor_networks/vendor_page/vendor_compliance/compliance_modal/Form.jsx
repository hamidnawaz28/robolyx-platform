import React, { useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  SelectField,
  InputField,
  DatePickerField,
} from "../../../../../../../global/FormFields";
import { fetchCompLististStart } from "../../../redux/vendorNetworksActions";

export default function Form(props) {
  const {
    formField: {
      compliance_template,
      compliance_form_name,
      priority,
      req_status,
      deadline,
      form_type,
    },
  } = props;
  let { id } = useParams();
  const dispatch = useDispatch();

  const { complianceQuery, currentPage, perPage, comp_task_list } = useSelector(
    (state) => state.vendorNetworks
  );

  useEffect(() => {
    dispatch(fetchCompLististStart());
  }, []);

  const complianceData =
    comp_task_list.data &&
    comp_task_list.data.map((temp) => ({
      label: temp.form_name,
      value: temp,
    }));
  console.log("Compliance Names", complianceData);

  const priorityData = [
    { label: "high", value: "high" },
    { label: "medium", value: "medium" },
    { label: "low", value: "low" },
  ];

  const req_statusData = [
    { label: "optional", value: "optional" },
    { label: "compulsory", value: "compulsory" },
    { label: "conditional", value: "conditional" },
  ];

  const form_typeData = [
    { label: "auto_answer", value: "auto_answer" },
    { label: "to_be_reviewed", value: "to_be_reviewed" },
  ];

  return (
    <React.Fragment>
      <Grid container justify="space-around">
        <Grid item sm={6}>
          <SelectField
            name={compliance_template.name}
            label={compliance_template.label}
            data={complianceData && complianceData}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={6}>
          <InputField
            name={compliance_form_name.name}
            label={compliance_form_name.label}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={6}>
          <SelectField
            name={priority.name}
            label={priority.label}
            data={priorityData}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={6}>
          <SelectField
            name={req_status.name}
            label={req_status.label}
            data={req_statusData}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={6}>
          <SelectField
            name={form_type.name}
            label={form_type.label}
            data={form_typeData}
            style={{ width: "80%" }}
          />
        </Grid>
        <Grid item sm={6}>
          <DatePickerField
            name={deadline.name}
            label={deadline.label}
            style={{ width: "80%" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
