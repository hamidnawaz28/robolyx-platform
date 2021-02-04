import * as Types from './spendAnalysis.actionTypes';

export const defaultTempletesData = (data) => ({
    type: Types.DEFAULT_TEMPLETES_DATA,
    payload:data
  });
  
  export const selecteDefaultTempletedata = (key,templeteColumn,data) => ({
    type: Types.SELECTED_DEFAULT_TEMPLETE_DATA,
    payload: {"key":key,"templeteColumn": templeteColumn,"data":data} 
  });
  
  export const savedTempletesData = (data) => ({
    type: Types.SAVED_TEMPLETES_DATA,
    payload:data
  });
  
  export const selectedSavedTempletedata = (key,templeteColumn, defref,data) => ({
    type: Types.SELECTED_SAVED_TEMPLETE_DATA,
    payload: {"key":key,"templeteColumn": templeteColumn, "defaultTempleteReference": defref,"currentSelectedSavedTempleteData":data} 
  });
  
  export const uploadedFileColumns = (columns,data) => ({
    type: Types.UPLOADED_FILE_COLUMNS,
    payload: {"uploadedFileColumns":columns,"FileData" :data} 
  });

  export const uploadedFileColumnsUpdateList = (data) => ({
    type: Types.UPLOADED_FILE_COLUMNS_UPDATE_LIST,
    payload: data
  });
  
  export const uploadedFileColumnSelectedField = (data) => ({
    type: Types.UPLOADED_FILE_COLUMNS_SELECTED_FIELD,
    payload: {"uploadedFileColumnsSelectedField":data} 
  });
  
  export const mappingTempleteColumnSelected = (data,dataType,SelectionLevel) => ({
    type: Types.MAPPING_TEMPLETE_COLUMN_SELECTED,
    payload: {"mappingTempleteColumnSelected":data,"dataType":dataType,"SelectionLevel":SelectionLevel} 
  });
  
  export const mappingTempleteColumnSelectedUpdateList = (data,dataType,SelectionLevel) => ({
    type: Types.MAPPING_TEMPLETE_COLUMN_SELECTED_UPDATE_LIST,
    payload: {"mappingTempleteColumnSelected":data,"dataType":dataType,"SelectionLevel":SelectionLevel} 
  });
  
  export const mappedColumns = (SelectionLevel,dataType,mappingTempleteColumnSelected,selectedFileColumnForMapping) => ({
    type: Types.MAPPED_COLUMNS,
    payload: {"SelectionLevel":SelectionLevel,"dataType":dataType,"mappingTempleteColumnSelected":mappingTempleteColumnSelected,"selectedFileColumnForMapping":selectedFileColumnForMapping}
  });

  export const newtempletename = (name) => ({
    type: Types.NEW_TEMPLETE_NAME,
    payload: name
  });
