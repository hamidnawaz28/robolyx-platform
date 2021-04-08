import * as type from "./actionTypes";

export const fetchFileUploadStart = (data) => ({
  type: type.FETCH_FILE_UPLOADS_START,
  payload: data,
});

export const fetchFileUploadSuccess = (data) => ({
  type: type.FETCH_FILE_UPLOADS_SUCCESS,
  payload: data,
});

export const fetchListStart = () => ({
  type: type.FETCH_LIST_START,
});

export const fetchListSuccess = (data) => ({
  type: type.FETCH_LIST_SUCCESS,
  payload: data,
});

export const addTicket = (post_data) => ({
  type: type.ADD_TICKET,
  payload: post_data,
});

export const fetchUserStart = () => ({
  type: type.FETCH_USER_START,
});

export const fetchUserSuccess = (data) => ({
  type: type.FETCH_USER_SUCCESS,
  payload: data,
});

export const UpdateTicket = (data) => ({
  type: type.EDIT_TICKET,
  payload: data,
});

export const deleteTicket = (data) => ({
  type: type.DELETE_TICKET,
  payload: data,
});

export const fileUpload = (data) => ({
  type: type.UPLOAD_FILE,
  payload: data,
});

export const fetchContentHistoryStart = (data) => ({
  type: type.FETCH_CONTENT_HISTORY_START,
  payload: data,
});

export const fetchContentHistorySuccess = (data) => ({
  type: type.FETCH_CONTENT_HISTORY_SUCCESS,
  payload: data,
});
