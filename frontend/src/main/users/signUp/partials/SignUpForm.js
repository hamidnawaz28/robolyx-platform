import omit from 'lodash/omit';
import {
  Formik,
  Form
} from 'formik';
import React from 'react';
import PropTypes from 'prop-types';
import { emailRegex, passwordRegex } from '../../../../common/regex.handler';
import {
  FormControl,
  TextField,
  Button as MuiButton,
  Typography,
  withStyles,
  makeStyles
} from "@material-ui/core";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";

const CloudUpload = styled(MuiCloudUpload)(spacing);
const Button = styled(MuiButton)(spacing);

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

const SignUpForm = (props) => {
    const { userSignUp, isSubmitting } = props;
    const classes = useStyles();

    return (
      <Formik
        className="form"
        initialValues={{ email: '', password: '', confirmpassword: '', name: '' }}
        onSubmit={(values, { setSubmitting }) => {
          userSignUp(omit(values, ['confirmpassword']));
          setSubmitting(false);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }

          if (!values.email) {
            errors.email = 'Email is required';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          }

          if (!values.confirmpassword) {
            errors.confirmpassword = 'Confirm Password is required';
          }

          if (!emailRegex(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!passwordRegex(values.password)) {
            errors.password ='Password must be at-least eight characters and must contain an uppercase letter, a lowercase letter, a numeric and a special character.';
          }

          if (values.confirmpassword !== values.password) {
            errors.confirmpassword = 'Confirm Password should be same as password';
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
            handleSubmit,
            setFieldValue
          } = props;
          return (
            <Form onSubmit={handleSubmit} className="form">
              <FormControl margin="normal" fullWidth>
                <CssTextField
                  id="name"
                  name="name" 
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name && errors.name}
                  InputProps={{
                    className: classes.input
                  }}
                />
              </FormControl>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                margin="normal"
                multiple
                type="file"
                onChange={(event) =>{
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              <Typography variant="caption" gutterBottom>
                {values.image && values.image.name && values.image.name}
              </Typography>
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span">
                  <CloudUpload mr={2} /> Upload Image
                </Button>
                </label>
              <FormControl margin="normal" fullWidth>
                <CssTextField id="email" name="email" autoComplete="email"
                  label="Email" 
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
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
               <FormControl margin="normal" fullWidth>
                <CssTextField
                  name="confirmpassword"
                  type="password"
                  id="confirmpassword"
                  label="Confirm Password" 
                  autoComplete="current-password"
                  onChange={handleChange}
                  error={errors.confirmpassword && touched.confirmpassword}
                  helperText={errors.confirmpassword && touched.confirmpassword && errors.confirmpassword}
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
                Sign up
              </Button>
            </Form>
          );
        }}
      </Formik>
    );
}

SignUpForm.propTypes = {
  userSignUp: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default SignUpForm;
