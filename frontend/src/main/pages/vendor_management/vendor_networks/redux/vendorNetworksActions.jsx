import * as type from "./actionTypes";

export const fetchVendorsStart = (data) => ({
  type: type.FETCH_VENDORS_START,
  payload: data,
});

export const fetchVendorsSuccess = (data) => ({
  type: type.FETCH_VENDORS_SUCCESS,
  payload: data,
});

export const updateQuery = (data) => ({
  type: type.UPDATE_QUERY,
  payload: data,
});

export const updateCurrentPage = (data) => ({
  type: type.UPDATE_CURRENT_PAGE,
  payload: data,
});

export const updatePerPage = (data) => ({
  type: type.UPDATE_PER_PAGE,
  payload: data,
});
