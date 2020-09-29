import React from 'react';
import {uploadedFileColumnSelectedField} from '../actions';
import {connect} from "react-redux";
class SelectOptions extends React.Component {
    render() {
        return <>
            <option value={this.props.selOpt} className="selectOption" >
                {this.props.selOpt}
            </option>
        </>
    }
}
class FileColumnsDD extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);  
    }
    handleChange(e){
        this.props.uploadedFileColumnSelectedField(e.target.value)
    }
    render() {
       
        let Lists = this.props.DataLists;
        let ListItems=''
        if(Lists){
           
            ListItems = Lists.map((ListItem) =>
            <SelectOptions selOpt={ListItem} />
        );
        }
        
        
        return <>
            <select  id={this.props.selectId} className={this.props.componentClassName} onChange={this.handleChange.bind(this)}>
                {ListItems}
            </select>
        </>;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        uploadedFileColumnSelectedField: (e) => dispatch(uploadedFileColumnSelectedField(e))
    }
  }
 export default  connect((state) => ({
    data: state.mapAndUploadStore
}), mapDispatchToProps)(FileColumnsDD)
