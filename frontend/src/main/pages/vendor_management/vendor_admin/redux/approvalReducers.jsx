import * as Types from "./actionTypes";

const initialState = {
  pendingVendors: [],
  isFetching: false,
  perPage: 5,
  currentPage: 1,
  totalRows: 0,
  query: {},
};
export const vendorApprovalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_PENDING_VEN_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_PENDING_VEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pendingVendors: action.payload,
      };
    case Types.UPDATE_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case Types.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
