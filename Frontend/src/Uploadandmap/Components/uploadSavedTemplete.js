import React from 'react';
import {SERVER_URL} from '../../Global/constants';
import axios from 'axios';
import {selectedSavedTempletedata} from '../actions';
import {connect} from "react-redux";
class SelectOptions extends React.Component {
    render() {        
        let optionPK = this.props.selOpt.pk;
        let savedfieldValue = this.props.selOpt.fields.SavedTempleteName;
        let defaultTempleteReference = this.props.selOpt.fields.defaultTempleteReference;
        return <>
            <option className="selectOption" data-saved-templete-pk={optionPK} data-default-templete-pk={defaultTempleteReference}>
                {savedfieldValue}
            </option>
        </>
    }
}
class SavedSavedTempletesDD extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        // debugger;
        let selectedIndex = e.target.selectedIndex;
        let selectedSavedData = e.target.value;
        let optionSelected = e.target.options[selectedIndex].getAttribute("data-saved-templete-pk");
        let defaultTempleteSelected = e.target.options[selectedIndex].getAttribute("data-default-templete-pk");
        let data;
        let AllSelectedSavedTempleteData = this.props.data.savedTempletesData;
        for(let singleData in AllSelectedSavedTempleteData){
          if(optionSelected==AllSelectedSavedTempleteData[singleData].pk){
              data = AllSelectedSavedTempleteData[singleData].fields.SavedTempleteColumns
          }
        }
        this.props.selectedSavedTempletedata(optionSelected,selectedSavedData,defaultTempleteSelected,data)

      }
    render() {

        let Lists = this.props.data.savedTempletesData;
        let ListItems=''
        if(Lists!=''){
            ListItems = Lists.map((ListItem) =>
            <SelectOptions  selOpt={ListItem} />
        );
        }
        
        return <>
            <select   className={this.props.componentClassName}  onChange={this.handleChange} >
                {ListItems} 
            </select>
        </>;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectedSavedTempletedata: (key,value,defaultRef,temData) => dispatch(selectedSavedTempletedata(key,value,defaultRef,temData))
    }
  }
 export default  connect((state) => ({
    data: state.mapAndUploadStore
}), mapDispatchToProps)(SavedSavedTempletesDD)
