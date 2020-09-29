import React from 'react';
import '../Uploadandmap/Styling/mapping.css';
import UploadSelectTempleteDD from "../Uploadandmap/Components/uploadSelectTemplete"
import SavedTempletesDD from "../Uploadandmap/Components/uploadSavedTemplete"
import DefaultTempleteColumnDD from "../Uploadandmap/Components/mappTempletesColumnDD"
import FileColumnsDD from "../Uploadandmap/Components/mappFileColumnsDD"
import TableRowsData from "../Uploadandmap/Components/tabledata"
import readXlsxFile from 'read-excel-file'; 
import {selecteDefaultTempletedata,uploadedFileColumns,uploadedFileColumnSelectedField,mappedColumns,uploadedFileColumnsUpdateList,mappingTempleteColumnSelectedUpdateList,newtempletename} from '../Uploadandmap/actions';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import axios from 'axios';
import {SERVER_URL} from '../Global/constants';
// function openWindow() {
//   var i, l, options = [{
//      value: 'first',
//      text: 'First'
//   }, {
//      value: 'second',
//      text: 'Second'
//   }],
//   newWindow = window.open("", null, "height=200,width=400,status=yes,toolbar=no,menubar=no,location=no");  

//   newWindow.document.write("<select onchange='window.opener.setValue(this.value);'>");
//   for(i=0,l=options.length; i<l; i++) {
//       newWindow.document.write("<option value='"+options[i].value+"'>");  
//       newWindow.document.write(options[i].text);  
//       newWindow.document.write("</option>");
//   }
//   newWindow.document.write("</select>");
// }

function setValue(value) {
  document.getElementById('value').value = value;
}
function getCol(matrix, col){
  var column = [];
  for(var i=0; i<matrix.length; i++){
     column.push(matrix[i][col]);
  }
  return column;
}
class UploadAndMap extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { AddAtachmnets: "Upload File", AttachFileHeaderData: [], ExcelFileData: []}
    this.uploadFileHandle = this.uploadFileHandle.bind(this);
    this.addMappingData = this.addMappingData.bind(this);
    this.handleInputName = this.handleInputName.bind(this);
    this.handleNewtempletes = this.handleNewtempletes.bind(this);
    this.uploadFileDatahandle= this.uploadFileDatahandle.bind(this);
  }
  
  uploadFileHandle(e) {
    try {
      
      this.setState({ AddAtachmnets: e.target.files[0].name })
      readXlsxFile(e.target.files[0]).then((data) => {
        let AllData =  data.slice(1, -1)
        this.setState({ AttachFileHeaderData: data[0], ExcelFileData:AllData  });
        this.props.uploadedFileColumns(data[0],AllData);
        this.props.uploadedFileColumnSelectedField(data[0][0]);
      })
    }
    catch (err) {
      this.setState({ AddAtachmnets: this.state.AddAtachmnets })
    }
  }
  uploadFileDatahandle(e){
 
    let uploadedFileColumns = this.props.data.uploadedFileColumns.uploadedFileColumns;
    let FileData = this.props.data.uploadedFileColumns.FileData;
    let SelectedSavedTempleteName = this.props.data.selectedSavedTemplete.templeteColumn;
    let DefaultTempletePK = this.props.data.selectedSavedTemplete.defaultTempleteReference;
    let SelectedSavedTempleteRef = this.props.data.selectedSavedTemplete.key;
    let SelectedSavedTempleteMapping = this.props.data.selectedSavedTemplete.currentSelectedSavedTempleteData;
    SelectedSavedTempleteMapping =JSON.parse(SelectedSavedTempleteMapping);
    let Senkeys = Object.keys(SelectedSavedTempleteMapping);
    let SenKey;
    let ColumnNames = []
    let ColumnsData =  []
    for (SenKey in Senkeys){
      let SenSiKey = Senkeys[SenKey]
      let SavedColumns = Object.keys(SelectedSavedTempleteMapping[Senkeys[SenKey]]);
      let index
      for (index in SavedColumns){
        let key  = SavedColumns[index];
        let value =SelectedSavedTempleteMapping[SenSiKey][key]
        
        let indexInFileColumns =uploadedFileColumns.indexOf(value)
        let tcol = getCol(FileData,indexInFileColumns)
        ColumnNames.push(key)
        ColumnsData.push(tcol)
      }
    }

    const UPLOAD_URL= "invoicetablecolumns/"
    axios
        .post(SERVER_URL+UPLOAD_URL,{ColumnNames:ColumnNames,ColumnsData:ColumnsData,DefaultTempletePK:DefaultTempletePK,SelectedSavedTempleteRef:SelectedSavedTempleteRef})
          .then(res => {
            debugger;
        })
          .catch(err => console.log(err))


  }
  addMappingData(e, data) {
    let SelectionLevel= data.mappingTempleteColumnSelected.SelectionLevel;
    let dataType = data.mappingTempleteColumnSelected.dataType;
    let mappingTempleteColumnSelected = data.mappingTempleteColumnSelected.mappingTempleteColumnSelected;
    let selectedFileColumnForMapping = data.uploadedFileColumnSelectedField.uploadedFileColumnsSelectedField;
    this.props.uploadedFileColumnsUpdateList(selectedFileColumnForMapping)
    this.props.mappingTempleteColumnSelectedUpdateList(mappingTempleteColumnSelected,dataType,SelectionLevel)
    this.props.mappedColumns(SelectionLevel,dataType,mappingTempleteColumnSelected,selectedFileColumnForMapping)
  }
  handleInputName(e){
    this.props.newtempletename(e.target.value)
  }
  handleNewtempletes(e){
    let templeteName = this.props.data.newTempletename;
    let templeteData  = this.props.data.mappedColumns;
    let defaultTempletePk =this.props.data.selectedDefaultTemplete.key;
    let levels = [];
    let newObj = new Object();
    for (let singledata in templeteData){
      if(levels.indexOf(templeteData[singledata].SelectionLevel) ==-1 ){
        let topush =templeteData[singledata].SelectionLevel;
        levels.push(topush);
        newObj[templeteData[singledata].SelectionLevel] = {}
      }
      let headObj =templeteData[singledata].SelectionLevel;
      let objtem= templeteData[singledata].mappingTempleteColumnSelected;
      let ValueToAdd = templeteData[singledata].selectedFileColumnForMapping;
      newObj[headObj][objtem] =  ValueToAdd;
    }
    let newTempleteToSaveData  = JSON.stringify(newObj)
    axios
        .post(SERVER_URL+"savedtempletes/",{SavedTempleteName:templeteName,SavedTempleteColumns:newTempleteToSaveData,pk:defaultTempletePk})
          .then(res => {
          
        }
              )
          .catch(err => console.log(err))
  }
  render() {
    return  <div className="mappingPage">
      <div className="uploadBlock">
        <div class="SelectTempleteLabel">
          Select Templete:
        </div>
        <div class="SelectTempleteDD">
          <UploadSelectTempleteDD
            selectId="TempletesSelect"
            componentClassName="formItems"
            endPoint="findAlltempletes/"/>
        </div>
        <div class="uploadFile">
          <input type="file" id="uploadAttachment" name="file" onChange={this.uploadFileHandle}></input>
          <label id="uploadAttachmentLabel" for="uploadAttachment" >
            {this.state.AddAtachmnets}</label>
        </div>
        <div class="savedMappingLabel">
          <label for="file">Saved Data Mapping:</label>
        </div>
        <div class="savedMappingDD">
          <SavedTempletesDD
            selectId="SavedTemplete"
            componentClassName="formItems"
            endPoint="savedtempletes/" />
        </div>
        <div class="upploadInvoiceButton">
          <button id="uplodAttachmnetButton"  onClick={this.uploadFileDatahandle}><i className="fa fa-upload"></i>Upload Data</button>
        </div>
      </div>
      <div className="mappingBlock">
        <div className="mappingSelectorLabel">
          <label>Mapping</label>
        </div>
        <div className="mappingSelector">
          <div className="mappingItems">
          <div>
              <div><label >Templete Columns:</label></div>
              <DefaultTempleteColumnDD selectId="TempleteColumnSelect" setstoredata="True" DataLists={this.props.data.selectedDefaultTemplete} />
            </div>
            <div>
              <div><label >File Columns:</label></div>
              <FileColumnsDD selectId="FileColumnSelect"  DataLists={this.props.data.uploadedFileColumns.uploadedFileColumns}/>
            </div>
            
          </div>
          <div className="mappingAddbutton">
            <button id="AddColumnsButton" onClick={(e) => this.addMappingData(e, this.props.data)}>Add</button>
            <button id="DelColumnsButton" onClick={(e) => this.addMappingData(e, this.props.data)}>Delete</button>
          </div>

        </div>
        <div className="mapSelectedDataTable">
          <table id="mappingTable" className="mappingTable">
            <tr>
              <th><input type="checkbox"/></th>
              <th>Mapped Columns</th>
              <th>File Columns</th>
            </tr>
            <TableRowsData rowsdata={this.props.data.mappedColumns}/>
          </table>
        </div>
        <div className="mappingNameAddAndSave">
          <div>
            <input type="text" id="saveMappingName" placeholder="Enter Name" onKeyUp={this.handleInputName}/>
          </div>
          <div>
            <button id="saveMappingButton" onClick = {this.handleNewtempletes} ><i className="fa fa-upload"></i>Save</button>
          </div>
        </div>
      </div>
    </div>
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    selecteDefaultTempletedata: (e) => dispatch(selecteDefaultTempletedata(e)),
    uploadedFileColumns:(columns,data)=>dispatch(uploadedFileColumns(columns,data)),
    uploadedFileColumnSelectedField:(e)=>dispatch(uploadedFileColumnSelectedField(e)),
    mappedColumns:(SelectionLevel,dataType,mappingTempleteColumnSelected,selectedFileColumnForMapping)=>dispatch(mappedColumns(SelectionLevel,dataType,mappingTempleteColumnSelected,selectedFileColumnForMapping)),
    uploadedFileColumnsUpdateList:(e)=>dispatch(uploadedFileColumnsUpdateList(e)),
    mappingTempleteColumnSelectedUpdateList:(data,dataType,SelectionLevel)=>dispatch(mappingTempleteColumnSelectedUpdateList(data,dataType,SelectionLevel)),
    newtempletename:(name)=>dispatch(newtempletename(name))
  }
}
export default  connect((state) => ({
  data: state.mapAndUploadStore
}), mapDispatchToProps)(UploadAndMap);