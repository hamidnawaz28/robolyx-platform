import * as type from "./actionTypes";

export const fetchPendingVendorsStart = (data) => ({
  type: type.FETCH_PENDING_VEN_START,
  payload: data,
});

export const fetchPendingVendorsSuccess = (data) => ({
  type: type.FETCH_PENDING_VEN_SUCCESS,
  payload: data,
});

export const updateApprovalStatus = (data) => ({
  type: type.UPDATE_VENDOR_APPROVAL_STATUS,
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
