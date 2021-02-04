import * as Types from "./actionTypes"
const initialState = {
  defaultTemplates: [],
  selectedDefaultTemplate: '',
  selectedDefaultTemplateData: '',
  attachFileName: 'Attach File',
  attachFileHeader: [],
  attachFileData : [],
  newMappingName : ''
};
export const mapDataStates =(state = initialState, action)=> {
    switch (action.type){
    case Types.DEFAULT_TEMPLATES:
      return {
        ...state,
        defaultTemplates: action.payload
      };
    case Types.SELECTED_DEFAULT_TEMPLATE:
    return {
        ...state,
        selectedDefaultTemplate : action.payload
    }
    case Types.SELECTED_DEFAULT_TEMPLATE_DATA:
    return {
        ...state,
        selectedDefaultTemplateData : action.payload
    }
    case Types.ATTACH_FILE_NAME:
    return {
        ...state,
        attachFileName : action.payload
    }
    case Types.ATTACH_FILE_HEADER:
    return {
        ...state,
        attachFileHeader : action.payload
    }
    case Types.NEW_MAPPING_NAME:
    return {
        ...state,
        newMappingName : action.payload
    }
    default:
      return state;
  }
}