import React from 'react';
import CustomizedTable from '../../../pages/tables/CustomizedTable';
import {
  Typography,
  Button as MuiButton,
} from "@material-ui/core";
import styled from "styled-components";
import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const rowsHeading = [
  'Data Upload',
  'Taxonomy Upload',
  'Spend Dashboards',
  'Rule Engine',
  'Select'
];

const button = (setPaymentType, value) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      mt={2}
      onClick={() => setPaymentType(value)}
      size="small"
    >
      {'Get Started'}
    </Button>
  )
}
const rows = setPaymentType => [
  [true, true, true, true],
  [true, true, true, true],
  [true, true, true, true],
  [false, true, true, true],
  [
    button(setPaymentType, 'basic'),
    button(setPaymentType, 'standard'),
    button(setPaymentType, 'basplusic'),
    button(setPaymentType, 'premium'),
  ]
];

const columnsHeading = [
  <Typography variant="h3">{'Subscribre Services Plan'}</Typography>,
  'Basic',
  'Standard',
  'Plus',
  'Premium'
];
const columns = [
  <Typography variant="h2">{'$10'}</Typography>,
  <Typography variant="h2">{'$20'}</Typography>,
  <Typography variant="h2">{'$30'}</Typography>,
  <Typography variant="h2">{'$40'}</Typography>
]

export default function PaymentOptions(props) {
  const { setPaymentType } = props;
  return (
    <CustomizedTable
      columns={columns}
      columnsHeading={columnsHeading}
      rowsHeading={rowsHeading}
      rows={rows(setPaymentType)} title="We have a plan for everyone" message="One time Payment" />
  );
}
