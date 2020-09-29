import React from 'react';
import {mappingTempleteColumnSelected} from '../actions';
import {connect} from "react-redux";
class SelectOptions extends React.Component {
    render() {
        let OptionsList =this.props.selOptions;
        let SensitivityGroup =this.props.sensitivity;
        let dataType = this.props.dataType;
        
        let ListItems = OptionsList.map((ListItem) =>
        <option 
            value={ListItem} 
            className="selectOption" 
            data-sentivity-group={SensitivityGroup} 
            data-type-group={dataType}>
            {ListItem}
        </option>
        );
        return <>
            {ListItems}
        </>
    }
}
class SelectGroup extends React.Component {
    render() {
        let selectionGroup = this.props.sensitivity;
        let selectOptions = this.props.selGroup;
        let ListOptions = Object.keys(selectOptions).map((ListItem) =>
            <SelectOptions selOptions={selectOptions[ListItem]} dataType ={ListItem}sensitivity={selectionGroup} />
        );
        return <>
            <optgroup label={selectionGroup} className={selectionGroup+"Options"} >
                {ListOptions}
            </optgroup>
        </>
    }
}
class DefaultTempleteColumnDD extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);  
    }
    handleChange(e){
        let selectedIndex = e.target.selectedIndex;
        let data =e.target.value;
        let dataType = e.target.options[selectedIndex].getAttribute("data-type-group");
        let selectionLevel = e.target.options[selectedIndex].getAttribute("data-sentivity-group");
        this.props.mappingTempleteColumnSelected(data,dataType,selectionLevel);
    }
    render() {
        let Lists=''
        let ListItems='';
        if(this.props.data.selectedDefaultTemplete){
            let data = this.props.data.selectedDefaultTemplete.data;
            Lists = JSON.parse(data);
             ListItems = Object.keys(Lists).map((ListItem) =>
            <SelectGroup selGroup={Lists[ListItem]} sensitivity={ListItem} />
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
        mappingTempleteColumnSelected: (data,dataType,SelectionLevel) => dispatch(mappingTempleteColumnSelected(data,dataType,SelectionLevel))
    }
  }
 export default  connect((state) => ({
    data: state.mapAndUploadStore
}), mapDispatchToProps)(DefaultTempleteColumnDD)
// export default ListDropDown
