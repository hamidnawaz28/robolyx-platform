import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import localStorage from '../common/storage/localStorage';
import { useLocation } from "react-router-dom";
import {
  ADMIN,
  SENIOR_MANAGER,
  MANAGER,
  SPECILIST,
  VIEWER,
  USER
} from "../global/constants";

const useStyles = makeStyles({
  no: {
    display: 'none'
  },
  yes: {
    display: 'auto'
  }
});

const Can = (props) => {
  const { component } = props;
  const classes = useStyles();
  const userGroup = localStorage.get('user').userGroup;
  const pathName = useLocation().pathname;
  let permission = false;

  switch (userGroup) {
    case ADMIN:
      permission = true;
      break;
    case SENIOR_MANAGER:
        permission = pathName === '/admin-panel' ? false : true;
      break;
    case MANAGER:
      permission = false;
      break;
    case SPECILIST:
      permission = false;
      break;
    case VIEWER:
      permission = false;
      break;
    case USER:
      permission = false;
      break;
  }

  return (
    <div className={permission ? classes.yes : classes.no}>
      {component}
    </div>
  );
}

export default Can;
