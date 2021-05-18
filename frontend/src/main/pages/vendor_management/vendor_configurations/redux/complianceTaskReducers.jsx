import * as Types from "./actionTypes";

const initialState = {
  isFetching: false,
  perPage: 5,
  currentPage: 1,
  totalRows: 0,
  query: {},
  categories: [],
};
export const complianceTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_CATEGORIES_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };

    default:
      return state;
  }
};
