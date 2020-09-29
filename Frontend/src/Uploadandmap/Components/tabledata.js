import React, { Component } from 'react'
class TableColumns extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const columnsdata = this.props.columnsdata;
        // const AllColumnsData = columnsdata.map((singleColumn) =>
        //     <td>{singleColumn}</td>
        // );
    let AllColumnsData =<><td><input type="checkbox"/></td><td>{columnsdata.mappingTempleteColumnSelected}</td><td>{columnsdata.selectedFileColumnForMapping}</td></>;
        return <>
            <tr>{AllColumnsData}</tr>
        </>
    }
}
class TableRowsData extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let rowDta = this.props.rowsdata;
        let rowsdata = ''
        if (rowDta.length) {
            rowsdata = rowDta.map((singlerow) =>
                <TableColumns columnsdata={singlerow} />
            );
        }
        return <>
            {rowsdata}
        </>

    }
}
export default TableRowsData;