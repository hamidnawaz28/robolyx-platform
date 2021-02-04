import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {
  Formik,
  Form
} from 'formik';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { emailRegex, passwordRegex } from '../../../common/regex.handler';
import {
  FormControl,
  TextField,
  Button as MuiButton,
  Grid,
  makeStyles
} from "@material-ui/core";
import styled from "styled-components";
import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(12)
  },
  button: {
    alignItems: 'left',
    marginLeft: '5px'
  }
}));

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
      },
    },
    invalid: {
      iconColor: 'red',
      color: 'red',
    },
  },
};

const CardField = ({onChange}) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const PaymentForm = (props) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  });
  const { payment, paymentAmount, setPaymentType } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });
    setMessage('Your Payment is in progress.');
    setMessageType('success');

    if (payload.error) {
      setProcessing(false);
      setError(payload.error);
    } else {
        const { id } = payload.paymentMethod;
        payment({id, amount: paymentAmount});
    }
  };
  
    return (
      <Formik
        className="form"
        initialValues={{ email: '', name: '', phone: '', card: '' }}
        handleSubmit={async (event)=>{
          event.preventDefault();
  
          if (!stripe || !elements) {
            return;
          }
      
          // if (error) {
          //   elements.getElement('card').focus();
          //   return;
          // }
      
          if (cardComplete) {
            // setProcessing(true);
          }
      
          const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            //billing_details: billingDetails,
          });
          // setMessage('Your Payment is in progress.');
          // setMessageType('success');
      
          if (payload.error) {
            // setProcessing(false);
            // setError(payload.error);
          } else {
              const { id } = payload.paymentMethod;
              payment({id, amount: paymentAmount});
          }
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }

          if (!values.email) {
            errors.email = 'Email is required';
          }

          if (!values.phone) {
            errors.phone = 'Phone Number is required';
          }

          if (!emailRegex(values.email)) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
          } = props;
          return (
            <Form onSubmit={handleSubmit} className="form">
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  autoFocus onChange={handleChange}
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name && errors.name}
                  onChange={(e) => {
                    setBillingDetails({...billingDetails, name: e.target.value});
                  }}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField id="email" name="email" autoComplete="email"
                  label="Email" 
                  onChange={(e) => {
                    setBillingDetails({...billingDetails, email: e.target.value});
                  }}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  name="phone"
                  type="phone"
                  id="phone"
                  label="Phone Number" 
                  onChange={(e) => {
                    setBillingDetails({...billingDetails, phone: e.target.value});
                  }}
                  error={errors.phone && touched.phone}
                  helperText={errors.phone && touched.phone && errors.phone}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth className={classes.card}>
                <CardField
                  onChange={(e) => {
                    setCardComplete(e.complete);
                  }}
                />
              </FormControl>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={3}
              >
              <Button
                type="button"
                mr={8}
                variant="contained"
                color="primary"
                mt={2}
                onClick={() => setPaymentType('default')}
                disabled={processing || !stripe}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                
                color="primary"
                mt={2}
                disabled={processing || !stripe}
              >
                {processing ? 'Processing...' : `Pay $${paymentAmount}`}
              </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
}

PaymentForm.propTypes = {
  userSignUp: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default PaymentForm;
