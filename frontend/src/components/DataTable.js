import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

// export default withStyles(styles)(SimpleTable);
class DataTable extends React.Component {
    constructor(props) {
        super(props)
    }
    selectAllHandle(event) {
        let IsChecked = event.target.checked;
    }
    handleChangePage() {

    }
    handleChangeRowsPerPage(){

    }
    render() {
        return <>
            <div style={{ "width": "100%", "maxHeight": "328px" }}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow style={{ "borderRadius": "15px 50px 30px 5px" }}>
                                <TableCell
                                    style={{ "backgroundColor": "#7E55D5" }}>
                                    <Checkbox color="primary" 
                                        onClick={(event) => this.props.SelectAllEvent(event)} />
                                </TableCell>
                                {this.props.TableHeaderData.map(SingleHeader =>
                                    <TableCell style={{ "backgroundColor": "#7E55D5", "color": "white", "fontSize": "17px" }}>
                                        {SingleHeader}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.TableDataList.map(row => (
                                <TableRow >
                                    <TableCell>
                                        {row.Ischecked == "checked" ?
                                            <Checkbox color="primary"  data={[row.sensitivity, row.datatype, row.data]} checked
                                                onClick={(event) => this.props.SingleSelectEvent(event)} /> :
                                            <Checkbox color="primary"  data={[row.sensitivity, row.datatype, row.data]}
                                                onClick={(event) => this.props.SingleSelectEvent(event)} />
                                        }
                                    </TableCell>
                                    {Object.keys(row).map(key =>
                                        key != "Ischecked" ? <TableCell align="centre" >{row[key]}</TableCell> : <></>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </>
    }
}
export default DataTable;
