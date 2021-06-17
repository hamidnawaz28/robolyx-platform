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

export const fetchSingleVendorStart = (data) => ({
  type: type.FETCH_SINGLE_VENDOR_START,
  payload: data,
});

export const fetchSingleVendorSuccess = (data) => ({
  type: type.FETCH_SINGLE_VENDOR_SUCCESS,
  payload: data,
});

export const fetchIndividualVendorAddressStart = (data) => ({
  type: type.FETCH_INDIVIDUAL_VEN_ADDRESS_START,
  payload: data,
});

export const fetchIndividualVendorAddressSuccess = (data) => ({
  type: type.FETCH_INDIVIDUAL_VEN_ADDRESS_SUCCESS,
  payload: data,
});

export const fetchFileUploadStart = (data) => ({
  type: type.FETCH_FILE_UPLOAD_START,
  payload: data,
});

export const fetchFileUploadSuccess = (data) => ({
  type: type.FETCH_FILE_UPLOAD_SUCCESS,
  payload: data,
});

export const deleteFileUpload = (data) => ({
  type: type.DELETE_VENDOR_UPLOAD,
  payload: data,
});

export const fetchNotesStart = (data) => ({
  type: type.FETCH_NOTES_START,
  payload: data,
});

export const fetchNotesSuccess = (data) => ({
  type: type.FETCH_NOTES_SUCCESS,
  payload: data,
});

export const updateNoteQuery = (data) => ({
  type: type.UPDATE_NOTE_QUERY,
  payload: data,
});

export const fetchReviewlistStart = (data) => ({
  type: type.FETCH_REVIEW_LIST_START,
  payload: data,
});

export const fetchReviewlistSuccess = (data) => ({
  type: type.FETCH_REVIEW_LIST_SUCCESS,
  payload: data,
});

export const fetchVenReviewlistStart = (data) => ({
  type: type.FETCH_VEN_REVIEW_LIST_START,
  payload: data,
});

export const fetchVenReviewlistSuccess = (data) => ({
  type: type.FETCH_VEN_REVIEW_LIST_SUCCESS,
  payload: data,
});

export const updateVenReviewQuery = (data) => ({
  type: type.UPDATE_VEN_REVIEW_QUERY,
  payload: data,
});

export const fetchVenComplianceListStart = (data) => ({
  type: type.FETCH_VEN_COMPLIANCE_LIST_START,
  payload: data,
});

export const fetchVenComplianceListSuccess = (data) => ({
  type: type.FETCH_VEN_COMPLIANCE_LIST_SUCCESS,
  payload: data,
});

export const updateVenComplianceQuery = (data) => ({
  type: type.UPDATE_VEN_COMPLIANCE_QUERY,
  payload: data,
});

export const fetchCompLististStart = (data) => ({
  type: type.FETCH_COMP_LIST_START,
  payload: data,
});

export const fetchCompLististSuccess = (data) => ({
  type: type.FETCH_COMP_LIST_SUCCESS,
  payload: data,
});

export const fetchSingleCompTaskStart = (data) => ({
  type: type.FETCH_SINGLE_COMP_TASK_START,
  payload: data,
});

export const fetchSingleCompTaskSuccess = (data) => ({
  type: type.FETCH_SINGLE_COMP_TASK_SUCCESS,
  payload: data,
});
