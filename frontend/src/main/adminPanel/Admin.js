import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Divider, Button } from '@material-ui/core';
import { Add as AddIcon } from "@material-ui/icons";
import AdminList from './partials/AdminList.view.js';
import AdminPanelForm from './partials/AdminPanelForm.js';
import Can from '../../components/Can';

const useStyles = makeStyles(theme => ({
  login: {
    width: '100%',
    margin: '3.6% 0%',
    [theme.breakpoints.up('md')]: {
      width: '35%',
      margin: '3.6% 35%',
    },
  },
  divider: {
    margin: theme.spacing(5, 0),
  },
  button: {
    margin: theme.spacing(5, 5),
    float: 'right',
    width: 'fit-content'
  },
  div: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const AdminPage = (props) => {
  const [formState, setFormState] = useState(false);
  const classes = useStyles();
  const { users, addUser, isSubmitting, isFetching, blockStatus, getUser, formStatus } = props;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div id="page" className="margin-sm">
      <Typography variant="h3" gutterBottom display="inline">Admin Privilege</Typography>
      <Divider className={classes.divider} />
      <div className={classes.div}>
      <Can
        component={
        <div><Button color="primary" variant="contained" className={classes.button} onClick={()=> setFormState(true)}>
          <AddIcon />
            Add new user
          </Button>
          </div>}
      />
      <AdminList rows={users} isFetching={isFetching} status={blockStatus} />
      </div>
      {formState && <AdminPanelForm formStatus={formStatus} isSubmitting={isSubmitting} addUser={addUser} formState={formState} formCloseEvent={()=> setFormState(false)} />}
    </div>
  );
};

AdminPage.propTypes = {
};

export default AdminPage;
