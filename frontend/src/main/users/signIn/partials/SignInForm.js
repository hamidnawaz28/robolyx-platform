import {
  Formik,
  Form
} from 'formik';
import React from 'react';
import PropTypes from 'prop-types';
// import { usernameRegex } from '../../../../common/regex.handler';
import {
  FormControl,
  TextField,
  Button as MuiButton,
  withStyles,
  makeStyles
} from "@material-ui/core";
import styled from "styled-components";
import { spacing } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  input: {
    color: 'white'
  }
}));

const CssTextField = withStyles({
  root: {
    color: 'white',
    "& label": {
      color: "white"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  }
})(TextField);

const Button = styled(MuiButton)(spacing);

const SignInForm = (props) => {
    const { userSignIn, isSubmitting } = props;
    const classes = useStyles();

    return (
      <Formik
        className="form"
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          userSignIn(values);
          setSubmitting(false);
        }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = 'Username is required';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          }

          // if (!usernameRegex(values.username)) {
          //   errors.username = 'Invalid username address';
          // }

          return errors;
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue
          } = props;
          return (
            <Form onSubmit={handleSubmit} className="form">
              <FormControl margin="normal" fullWidth>
                <CssTextField id="username" name="username" autoComplete="username"
                  label="Username" 
                  onChange={handleChange}
                  error={errors.username && touched.username}
                  helperText={errors.username && touched.username && errors.username}
                  InputProps={{
                    className: classes.input
                  }}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <CssTextField
                  name="password"
                  type="password"
                  id="password"
                  label="Password" 
                  autoComplete="current-password"
                  onChange={handleChange}
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password && errors.password}
                  InputProps={{
                    className: classes.input
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                mt={2}
              >
                Sign in
              </Button>
            </Form>
          );
        }}
      </Formik>
    );
}

SignInForm.propTypes = {
  userSignIn: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default SignInForm;
