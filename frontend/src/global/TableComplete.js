import React from 'react';
import {
    Table, TableBody, TableCell, TableHead,
    TableRow, Paper, TablePagination, Checkbox,
    CardMedia, Card, Typography
} from '@material-ui/core'
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    typo: {
        align: "center",
        justify: "center",
        textAlign: "center"
    },
})
// const EmptyData = styled.Typography`
//     variant:"h5";
//     component:"h2";
//     align:"centre"; 
//     justify:"centre"
// `
// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//     },
//     table: {
//         minWidth: 700,
//     },
// });

function TableData(props) {
    const { selectOption, selectAllStatus, SelectAllEvent,
        TableHeaderData, TableDataList, SingleSelectEvent,
        paginationOption, totalRows, perPage, currentPage,
        changePageEvent, changeRowsPerPageEvent } = props
    const classes = useStyles()
    return (
        <Paper>
            <div style={{ "maxWidth": "1025px", "overflow": "auto" }}>
                <Table stickyHeader aria-label="sticky table" size="small" style={{ "maxWidth": "1025px", "overflow": "auto" }}>
                    <TableHead position={"sticky"}>
                        <TableRow style={{ "borderRadius": "15px 50px 30px 5px", "height": "10px" }}>
                            {selectOption && <TableCell
                                style={{ "backgroundColor": "white" }}>
                                <Checkbox color="primary" checked={selectAllStatus}
                                    onClick={SelectAllEvent} />
                            </TableCell>}

                            {Object.keys(TableHeaderData).map(SingleHeader =>
                                <TableCell style={{ "backgroundColor": "white", "color": "black", "fontSize": "12px" }} align="left">
                                    {SingleHeader}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TableDataList.length > 0 ? TableDataList.map(row => (
                            <TableRow style={{ height: "10px", padding: "0px" }} hover={true}
                                onClick={SingleSelectEvent}
                                pk={row.pk}
                                checked={row.IsChecked}
                            >
                                {
                                    selectOption &&
                                    <TableCell>
                                        <Checkbox color="primary" pk={row.pk} checked={row.IsChecked}
                                        />
                                    </TableCell>
                                }
                                {Object.keys(TableHeaderData).map(key =>
                                    <TableCell align="left" style={{ fontSize: "11px", width: "100%" }}>{row.fields[TableHeaderData[key]]}</TableCell>
                                )}
                            </TableRow>
                        )) : <>
                            </>}
                    </TableBody>
                </Table>
                {
                    TableDataList.length == 0 && 
                        <Card>
                            <Typography className={classes.typo} variant="h5" component="h2">
                                No Data
                            </Typography>
                        </Card>
                }
            </div>
            {
                paginationOption &&
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={perPage}
                    page={currentPage}
                    onChangePage={changePageEvent}
                    onChangeRowsPerPage={changeRowsPerPageEvent}
                />
            }
        </Paper>
    );
}

export default TableData;
