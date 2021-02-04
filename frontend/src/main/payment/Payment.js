import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './partials/PaymentForm';
import PaymentOptions from './partials/PaymentOptions';
import PaymentIcon from '@material-ui/icons/Payment';
import {
  Typography,
  makeStyles,
  Divider,
  Paper
} from "@material-ui/core";
import Helmet from 'react-helmet';
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  payment: {
    width: '100%',
    margin: '9% 0%',
    [theme.breakpoints.up('md')]: {
      margin: '1% 0% 3.6%',
    },
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  divider: {
    margin: theme.spacing(5, 0),
  },
  paymentDiv: {
    padding: theme.spacing(5, 6),
  }
}));

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Wrapper = styled(Paper)`
  margin-top: ${props => props.theme.spacing(3)}px;
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

const Payment = (props) => {
  const { payment, setPaymentType, paymentAmount } = props;
  const [status, setStatus] = React.useState("ready");
  const classes = useStyles();

  if (status === "success") {
    return <div>Congrats on your empanadas!</div>;
  }

  return (<div className={classes.payment}>
    <Typography variant="h3" gutterBottom display="inline">
      {paymentAmount === '0' ? 'Payment' : 'Checkout'}
    </Typography>
    <Divider className={classes.divider} />
    {paymentAmount === '0' ? <div>
      <PaymentOptions setPaymentType={setPaymentType} />
    </div> :
    <div className={classes.paymentDiv}>
      <div className={classes.flex}>
        <div className={classes.flex}><PaymentIcon /><Typography variant="h4">Choose Payment Option</Typography></div>
        <Typography variant="h4">Pay only ${paymentAmount}</Typography>
      </div>
      <Wrapper>
        <Helmet title="Payment" />
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm payment={payment} paymentAmount={paymentAmount} setPaymentType={setPaymentType} />
        </Elements>
      </Wrapper>
    </div>}
    </div>
  );
};

export default Payment;
