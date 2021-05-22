import * as Types from "./actionTypes";

const initialState = {
  allVendors: [],
  isFetching: false,
  perPage: 5,
  currentPage: 1,
  totalRows: 0,
  searchQuery: {},
};
export const vendorNetworksReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_VENDORS_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_VENDORS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allVendors: action.payload,
      };
    case Types.UPDATE_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case Types.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case Types.UPDATE_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
      };

    default:
      return state;
  }
};
