import * as Types from "./actionTypes";
const initialState = {
  listData: [],
  listUser: [],
  isFetching: false,
  fileUploadsList: [],
  contentHistoryList: [],
};
export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_LIST_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listData: action.payload,
      };
    case Types.ADD_TICKET:
      return {
        ...state,
      };
    case Types.FETCH_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listUser: action.payload,
      };

    case Types.FETCH_FILE_UPLOADS_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_FILE_UPLOADS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fileUploadsList: action.payload,
      };

    case Types.FETCH_CONTENT_HISTORY_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_CONTENT_HISTORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        contentHistoryList: action.payload,
      };

    default:
      return state;
  }
};
