import * as Types from "./table.actionTypes"
const initialState = {
  data: {},
  perPage: 5,
  currentPage: 0,
  totalRows: 0,
  IsAllSelected :false,
  query : {}
};
export const tableStates =(state = initialState, action)=> {
    switch (action.type){
    case Types.TABLE_DATA:
      return {
        ...state,
        data: action.payload
      };
    case Types.PER_PAGE:
    return {
        ...state,
        perPage : action.payload
    }
    case Types.CURRENT_PAGE:
    return {
        ...state,
        currentPage : action.payload
    }
    case Types.TOTAL_ROWS:
    return {
        ...state,
        totalRows : action.payload
    }
    case Types.IS_ALL_SELECTED:
    return {
        ...state,
        IsAllSelected : action.payload
    }
    case Types.FORM_QUERY:
    return {
        ...state,
        query : action.payload
    }
    case Types.RESET_STATES:
    return {
        ...initialState
    }
    default:
      return state;
  }
}