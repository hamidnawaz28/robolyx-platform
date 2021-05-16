import * as type from "./actionTypes";

export const fetchPendingVendorsStart = (data) => ({
  type: type.FETCH_PENDING_VEN_START,
  payload: data,
});

export const fetchPendingVendorsSuccess = (data) => ({
  type: type.FETCH_PENDING_VEN_SUCCESS,
  payload: data,
});

export const fetchApprovedVendorsStart = (data) => ({
  type: type.FETCH_APPROVED_VEN_START,
  payload: data,
});

export const fetchApprovedVendorsSuccess = (data) => ({
  type: type.FETCH_APPROVED_VEN_SUCCESS,
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

export const updateReviewTemplateQuery = (data) => ({
  type: type.UPDATE_REVIEW_TEMPLATE_QUERY,
  payload: data,
});

export const updateCurrentPage = (data) => ({
  type: type.UPDATE_CURRENT_PAGE,
  payload: data,
});

//fetch category
export const fetchCategoryStart = (data) => ({
  type: type.FETCH_CATEGORY_START,
  payload: data,
});

export const fetchCategorySuccess = (data) => ({
  type: type.FETCH_CATEGORY_SUCCESS,
  payload: data,
});

//fetch tags
export const fetchTagsStart = (data) => ({
  type: type.FETCH_TAGS_START,
  payload: data,
});

export const fetchTagsSuccess = (data) => ({
  type: type.FETCH_TAGS_SUCCESS,
  payload: data,
});

//fetch trades
export const fetchTradesStart = (data) => ({
  type: type.FETCH_TRADES_START,
  payload: data,
});

export const fetchTradesSuccess = (data) => ({
  type: type.FETCH_TRADES_SUCCESS,
  payload: data,
});

//fetch diversity
export const fetchDiversityStart = (data) => ({
  type: type.FETCH_DIVERSITY_START,
  payload: data,
});

export const fetchDiversitySuccess = (data) => ({
  type: type.FETCH_DIVERSITY_SUCCESS,
  payload: data,
});

//fetch payment term
export const fetchPaymentTermStart = (data) => ({
  type: type.FETCH_PAYMENT_TERM_START,
  payload: data,
});

export const fetchPaymentTermSuccess = (data) => ({
  type: type.FETCH_PAYMENT_TERM_SUCCESS,
  payload: data,
});

//partial update vendors

export const partialUpdateVendor = (data) => ({
  type: type.PARTIAL_UPDATE_VENDOR,
  payload: data,
});


export const fetchReviewTemplateStart = (data) => ({
  type: type.FETCH_REVIEW_TEMPLATE_START,
  payload: data,
});

export const fetchReiewTemplateSuccess = (data) => ({
  type: type.FETCH_REVIEW_TEMPLATE_SUCCESS,
  payload: data,
});