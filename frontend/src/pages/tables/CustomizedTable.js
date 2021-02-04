import isBoolean from 'lodash/isBoolean';
import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

import { spacing } from "@material-ui/system";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import { withStyles,makeStyles } from "@material-ui/core/styles";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#232f3e',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles({
  head: {
    borderBottom: '1px solid #1B2430'
  }
});

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

const setIcon = item => {
  return item ? <CheckIcon fontSize={'small'} style={{ color: green[500] }} /> : <ClearIcon fontSize={'small'} style={{ color: red[500] }} />;
}

function CustomizedTableDemo(props) {
  const classes = useStyles();
  const { columns, columnsHeading, title, message, rowsHeading, rows } = props;
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {message}
        </Typography>
      </CardContent>
      <Paper>
        <Table>
        <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              {columnsHeading.map((column, index) => 
                (index ? <CustomTableCell component="th" align="center" className={classes.head}>{column}</CustomTableCell> : <CustomTableCell rowSpan={2} component="th" scope="row">{column}</CustomTableCell>)
              )}
            </TableRow>
            <TableRow>
              {columns.map((column, index) => 
                <CustomTableCell align="center" component="th">{column}</CustomTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <CustomTableRow key={row.id}>
                {rowsHeading && <CustomTableCell component="th" scope="row">
                  {rowsHeading[index]}
                </CustomTableCell>}
                {row.map((item) => 
                  <CustomTableCell align="center">
                  {isBoolean(item) ? setIcon(item) : item}
                  </CustomTableCell>
                )}
              </CustomTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  );
}

function SimpleTable(props) {
  return (
    <React.Fragment>
      <Helmet title="Simple Table" />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomizedTableDemo {...props} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SimpleTable;
