import {
  DEFAULT_TEMPLETES_DATA,
  SELECTED_DEFAULT_TEMPLETE_DATA,
  SAVED_TEMPLETES_DATA,
  SELECTED_SAVED_TEMPLETE_DATA,
  UPLOADED_FILE_COLUMNS,
  UPLOADED_FILE_COLUMNS_SELECTED_FIELD,
  MAPPING_TEMPLETE_COLUMN_SELECTED,
  MAPPING_TEMPLETE_COLUMN_SELECTED_UPDATE_LIST,
  MAPPED_COLUMNS,
  UPLOADED_FILE_COLUMNS_UPDATE_LIST,
  NEW_TEMPLETE_NAME
} from '../Uploadandmap/actions';
import { act } from 'react-dom/test-utils';
const initialState = {
  defaultTempletesData: '',
  selectedDefaultTemplete: '',
  savedTempletesData: '',
  selectedSavedTemplete: '',
  uploadedFileColumns: '',
  uploadedFileColumnSelectedField: '',
  mappingTempleteColumnSelected: '',
  mappedColumns: [],
  newTempletename :''
};

export const mapAndUploadStore = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_TEMPLETES_DATA:
      return {
        ...state,
        defaultTempletesData: action.payload
      };

    case SELECTED_DEFAULT_TEMPLETE_DATA:

      return {
        ...state,
        selectedDefaultTemplete: action.payload
      };

    case SAVED_TEMPLETES_DATA:

      return {
        ...state,
        savedTempletesData: action.payload
      };

    case SELECTED_SAVED_TEMPLETE_DATA:

      return {
        ...state,
        selectedSavedTemplete: action.payload
      };
    case UPLOADED_FILE_COLUMNS:
      return {
        ...state,
        uploadedFileColumns: action.payload
      }
      case UPLOADED_FILE_COLUMNS_UPDATE_LIST:
      
      let  indexOfAddedItem = state.uploadedFileColumns.uploadedFileColumns.indexOf(action.payload)
      state.uploadedFileColumns.uploadedFileColumns.splice(indexOfAddedItem,1)
      let totalLength =state.uploadedFileColumns.uploadedFileColumns.length
      let newSelectedValue =state.uploadedFileColumns.uploadedFileColumns[0];
      return {
        ...state,
        uploadedFileColumns: state.uploadedFileColumns,
        uploadedFileColumnSelectedField: {"uploadedFileColumnsSelectedField":newSelectedValue}
      }
      
    case UPLOADED_FILE_COLUMNS_SELECTED_FIELD:
      return {
        ...state,
        uploadedFileColumnSelectedField: action.payload
      }
    case MAPPING_TEMPLETE_COLUMN_SELECTED:
      return {
        ...state,
        mappingTempleteColumnSelected: action.payload
      }



    case MAPPING_TEMPLETE_COLUMN_SELECTED_UPDATE_LIST:
      let previousData = state.selectedDefaultTemplete.data;
      let selectedDefaultTemplete =state.selectedDefaultTemplete;
      previousData = JSON.parse(previousData);
      let SelectionLevel = action.payload.SelectionLevel;
      let dataType = action.payload.dataType;
      let mappingTempleteColumnSelectedUpDate = action.payload.mappingTempleteColumnSelected;
      previousData[SelectionLevel][dataType].splice(previousData[SelectionLevel][dataType].indexOf(mappingTempleteColumnSelectedUpDate),1);
      let SensitivityLevelToUpdate;
      let dataTypeToUpdate ;
      let firstDataList ;
      if(Object.keys(previousData).length>=1){
        SensitivityLevelToUpdate = Object.keys(previousData)[0];
        let newDataUnderSen = previousData[SensitivityLevelToUpdate]
        if(Object.keys(newDataUnderSen).length>=1){
          dataTypeToUpdate =Object.keys(newDataUnderSen)[0];
          firstDataList =  newDataUnderSen[dataTypeToUpdate][0]
        }
      }
      let newData = JSON.stringify(previousData);     
    return{
      ...state,
      selectedDefaultTemplete: {...selectedDefaultTemplete,
        data: newData
      },
      mappingTempleteColumnSelected :{"mappingTempleteColumnSelected":firstDataList,"dataType":dataTypeToUpdate,"SelectionLevel":SensitivityLevelToUpdate}

    }
    case MAPPED_COLUMNS:
      let lastData = state.mappedColumns;
      lastData.push(action.payload)
        return {
            ...state,
        mappedColumns: lastData
          }
    case NEW_TEMPLETE_NAME:
      return {
        ...state,
        newTempletename:action.payload
      }

      default:
return state;
    }
  }