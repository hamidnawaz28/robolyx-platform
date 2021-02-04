import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { adminListColumns } from './AdminList.utils';
import Table from '../../../components/Table';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const rows1 = [
  {name: 'hamid', email: 'hamid@gmail.com', userGroup: 'admin', companyName: '', contactNumber: ''}
]; //expected data


const AdminList = (props) => {
  const columns = adminListColumns();
  const classes = useStyles();
  const { rows, isFetching, status } = props;

  return (
    <div className={classes.margin}>
      <Table columns={columns} data={rows1} status={status} />
    </div>
  );
}

export default AdminList;
