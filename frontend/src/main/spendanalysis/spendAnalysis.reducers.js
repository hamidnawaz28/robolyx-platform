import {
  DEFAULT_TEMPLETES_DATA
} from '../Uploadandmap/actions';
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

      default:
        return state;
      }
    }
    