export const DEFAULT_TEMPLETES_DATA  = 'DEFAULT_TEMPLETES_DATA';
export const SELECTED_DEFAULT_TEMPLETE_DATA = 'SELECTED_DEFAULT_TEMPLETE_DATA';
export const SAVED_TEMPLETES_DATA= 'SAVED_TEMPLETES_DATA';
export const SELECTED_SAVED_TEMPLETE_DATA= 'SELECTED_SAVED_TEMPLETE_DATA';
export const UPLOADED_FILE_COLUMNS = 'UPLOADED_FILE_COLUMNS';
export const UPLOADED_FILE_COLUMNS_UPDATE_LIST ="UPLOADED_FILE_COLUMNS_UPDATE_LIST";
export const MAPPING_TEMPLETE_COLUMN_SELECTED_UPDATE_LIST="MAPPING_TEMPLETE_COLUMN_SELECTED_UPDATE_LIST"
export const NEW_TEMPLETE_NAME ="NEW_TEMPLETE_NAME"

export const UPLOADED_FILE_COLUMNS_SELECTED_FIELD = 'UPLOADED_FILE_COLUMNS_SELECTED_FIELD';
export const MAPPING_TEMPLETE_COLUMN_SELECTED = 'MAPPING_TEMPLETE_COLUMN_SELECTED';
export const MAPPED_COLUMNS ='MAPPED_COLUMNS'

export const defaultTempletesData = (data) => ({
  type: DEFAULT_TEMPLETES_DATA,
  payload:data
});

export const selecteDefaultTempletedata = (key,templeteColumn,data) => ({
  type: SELECTED_DEFAULT_TEMPLETE_DATA,
  payload: {"key":key,"templeteColumn": templeteColumn,"data":data} 
});

export const savedTempletesData = (data) => ({
  type: SAVED_TEMPLETES_DATA,
  payload:data
});

export const selectedSavedTempletedata = (key,templeteColumn, defref,data) => ({
  type: SELECTED_SAVED_TEMPLETE_DATA,
  payload: {"key":key,"templeteColumn": templeteColumn, "defaultTempleteReference": defref,"currentSelectedSavedTempleteData":data} 
});

export const uploadedFileColumns = (columns,data) => ({
  type: UPLOADED_FILE_COLUMNS,
  payload: {"uploadedFileColumns":columns,"FileData" :data} 
});
export const uploadedFileColumnsUpdateList = (data) => ({
  type: UPLOADED_FILE_COLUMNS_UPDATE_LIST,
  payload: data
});
export const uploadedFileColumnSelectedField = (data) => ({
  type: UPLOADED_FILE_COLUMNS_SELECTED_FIELD,
  payload: {"uploadedFileColumnsSelectedField":data} 
});

export const mappingTempleteColumnSelected = (data,dataType,SelectionLevel) => ({
  type: MAPPING_TEMPLETE_COLUMN_SELECTED,
  payload: {"mappingTempleteColumnSelected":data,"dataType":dataType,"SelectionLevel":SelectionLevel} 
});

export const mappingTempleteColumnSelectedUpdateList = (data,dataType,SelectionLevel) => ({
  type: MAPPING_TEMPLETE_COLUMN_SELECTED_UPDATE_LIST,
  payload: {"mappingTempleteColumnSelected":data,"dataType":dataType,"SelectionLevel":SelectionLevel} 
});

export const mappedColumns = (SelectionLevel,dataType,mappingTempleteColumnSelected,selectedFileColumnForMapping) => ({
  type: MAPPED_COLUMNS,
  payload: {"SelectionLevel":SelectionLevel,"dataType":dataType,"mappingTempleteColumnSelected":mappingTempleteColumnSelected,"selectedFileColumnForMapping":selectedFileColumnForMapping}
});
export const newtempletename = (name) => ({
  type: NEW_TEMPLETE_NAME,
  payload: name
});


