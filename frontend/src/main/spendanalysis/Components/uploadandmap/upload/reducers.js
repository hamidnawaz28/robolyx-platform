import * as Types from "./actionTypes"

let initStates = {
  selectedDefaultTemplate: '',
  selectedDefaultTemplateData: '',
  selectedSavedTemplate: '',
  selectedSavedTemplateData: {},
  attachFileName: 'Attach File',
  attachFileHeader: [],
  attachFileData : []
};
const initialState = {
    ...initStates,
    defaultTemplates: [],
    savedTemplates: [],
} 
export const uploadDataStates =(state = initialState, action)=> {
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
    case Types.SAVED_TEMPLATES:
    return {
        ...state,
        savedTemplates : action.payload
    }
    case Types.SELECTED_SAVED_TEMPLATE:
    return {
        ...state,
        selectedSavedTemplate : action.payload
    }
    case Types.SELECTED_SAVED_TEMPLATE_DATA:
    return {
        ...state,
        selectedSavedTemplateData : action.payload
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
    case Types.ATTACH_FILE_DATA:
    return {
        ...state,
        attachFileData : action.payload
    }
    case Types.RESET_UPLOAD_STATES:
        return {
            ...state,
            ...initStates
    }
    default:
      return state;
  }
}