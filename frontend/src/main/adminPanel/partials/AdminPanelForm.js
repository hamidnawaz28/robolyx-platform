import {
  Formik,
  Form
} from 'formik';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { emailRegex } from '../../../common/regex.handler';
import {
  FormControl,
  TextField,
  Button as MuiButton,
  Typography,
  withStyles,
  makeStyles,
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";
import DropDownList from "../../../global/DropDownList";
import { adminUserGroup } from "./AdminList.utils";

const CloudUpload = styled(MuiCloudUpload)(spacing);
const Button = styled(MuiButton)(spacing);

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    backgroundColor: '#232f3e',
    color: 'white'
  }
}));

const AdminPanelForm = (props) => {
    const { addUser, isSubmitting, formState, formStatus, formCloseEvent } = props;
    const classes = useStyles();

    useEffect(() => {
      if (formStatus.severity === 'success') {
        formCloseEvent();
      }
    }, [formStatus]);

    return (
      <Dialog
        open={formState}
        onClose={formCloseEvent}
        aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title" onClose={formCloseEvent} className={classes.dialogTitle}>
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          <Box>Add User</Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
      <Alert severity={formStatus.severity}>{formStatus.message}</Alert>
      <Formik
        className="form"
        initialValues={{ email: '', companyName: '', contactNo: '', name: '', jobDescription: '', userGroup: 'admin' }}
        onSubmit={(values, { setSubmitting }) => {
          addUser(values);
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

          if (!values.companyName) {
            errors.companyName = 'Company Name is required';
          }

          if (!values.contactNo) {
            errors.contactNo = 'Contact Number is required';
          }

          if (!emailRegex(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.userGroup) {
            errors.userGroup = 'User Group is required';
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
                <TextField
                  id="name"
                  name="name" 
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name && errors.name}
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
                  <CloudUpload mr={2} /> Upload Company Logo
                </Button>
                </label>
              <FormControl margin="normal" fullWidth>
                <TextField id="email" name="email" autoComplete="email"
                  label="Email" 
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  name="companyName"
                  id="companyName"
                  label="Company Name" 
                  onChange={handleChange}
                  error={errors.companyName && touched.companyName}
                  helperText={errors.companyName && touched.companyName && errors.companyName}
                />
              </FormControl>
               <FormControl margin="normal" fullWidth>
                <TextField
                  name="contactNo"
                  type="number"
                  id="contactNo"
                  label="Contact Number" 
                  onChange={handleChange}
                  error={errors.contactNo && touched.contactNo}
                  helperText={errors.contactNo && touched.contactNo && errors.contactNo}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  name="jobDescription"
                  type="text"
                  id="jobDescription"
                  label="Job Description" 
                  onChange={handleChange}
                />
              </FormControl>
                <DropDownList
                  data={adminUserGroup()}
                  label="User Group"
                  id="userGroup"
                  name="userGroup"
                  handleChange={(event) => 
                    setFieldValue("userGroup", event.target.value)
                  }
                  error={errors.userGroup}
                  helperText={errors.userGroup && errors.userGroup}
                />
              <DialogActions>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  mt={2}
                  onClick={formCloseEvent}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  mt={2}
                >
                  {isSubmitting ? <CircularProgress color={'white'} size={24} /> : 'Add User'}
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
      </DialogContent>
      </Dialog>
    );
}

AdminPanelForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default AdminPanelForm;
