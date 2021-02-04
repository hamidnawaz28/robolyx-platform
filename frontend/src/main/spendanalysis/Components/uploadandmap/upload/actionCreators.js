import * as type from './actionTypes'
export const defaltTemplates=(data)=>(
    {
        type: type.DEFAULT_TEMPLATES,
        payload: data
    }
);
export const setSelectedDefaultTemplate=(data)=>(
    {
        type: type.SELECTED_DEFAULT_TEMPLATE,
        payload: data
    }
);
export const setSelectedDefaultTemplateData = (data)=>({
    type: type.SELECTED_DEFAULT_TEMPLATE_DATA,
    payload: data
})
export const savedTemplates=(data)=>(
    {
        type: type.SAVED_TEMPLATES,
        payload: data
    }
);
export const setSelectedSavedTemplate=(data)=>(
    {
        type: type.SELECTED_SAVED_TEMPLATE,
        payload: data
    }
);
export const setSelectedSavedTemplateData = (data)=>({
    type: type.SELECTED_SAVED_TEMPLATE_DATA,
    payload: data
})
export const setAttachFileName=(data)=>(
    {
        type: type.ATTACH_FILE_NAME,
        payload: data
    }
);
export const setAttachFileHeader=(data)=>(
    {
        type: type.ATTACH_FILE_HEADER,
        payload: data
    }
);
export const setAttachFileData=(data)=>(
    {
        type: type.ATTACH_FILE_DATA,
        payload: data
    }
);
export const resetUploadStates=(data)=>(
    {
        type: type.RESET_UPLOAD_STATES,
        payload: data
    }
);