import * as type from './actionTypes'
export const defaltTemplates=(data)=>(
    {
        type: type.DEFAULT_TEMPLATES,
        payload: data
    }
);
export const setMapSelectedDefaultTemplate=(data)=>(
    {
        type: type.SELECTED_DEFAULT_TEMPLATE,
        payload: data
    }
);
export const setMapSelectedDefaultTemplateData = (data)=>({
    type: type.SELECTED_DEFAULT_TEMPLATE_DATA,
    payload: data
})
export const setMapAttachFileName=(data)=>(
    {
        type: type.ATTACH_FILE_NAME,
        payload: data
    }
);
export const setMapAttachFileHeader=(data)=>(
    {
        type: type.ATTACH_FILE_HEADER,
        payload: data
    }
);
export const setNewMappingName=(data)=>(
    {
        type: type.NEW_MAPPING_NAME,
        payload: data
    }
);
