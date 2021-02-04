import {
    INVOICE_AND_TAXONOMY_UPLOAD_AND_MAP
  } from './actions';

  const initialState = {
    user: {
      isLoggedIn: true,
      name: 'hamid',
      project: '1',
      email: 'hamid.nawaz28',
      username: 'hamidnawaz28',
      image: 'data',
      role: 'owner',
      rolespermissions: '',
    },
    invoice: {
      upload: {
        defaultSelectedTemplete: '',
        savedSelectedTemplete :'',
        
      },
      map: {
        fileSelectedColumn:'',
        defaultSelectedColumn: '',
        newTempleteName: '',
      }
    },
    taxonomy: {
      upload: {
        defaultSelectedTemplete: '',
        savedSelectedTemplete :'',     
      },
      map: {
        fileSelectedColumn:'',
        defaultSelectedColumn: '',
        newTempleteName: '',
      }
    }
  
  };
  
  export const taxonomyandinvoicestore = (state = initialState, action) => {
    switch (action.type) {
  
      case INVOICE_AND_TAXONOMY_UPLOAD_AND_MAP:
        let data = action.payload.path.split("-")
        if (data.length == 1) {
          state[data[0]] = action.payload.value;
        }
        if (data.length == 2) {
          state[data[0]][data[1]] = action.payload.value;
        }
        if (data.length == 3) {
          state[data[0]][data[1]][data[2]] = action.payload.value;
        }
      default:
        return state;
    }
  }
