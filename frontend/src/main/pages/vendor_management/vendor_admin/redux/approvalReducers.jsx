import * as Types from "./actionTypes";

const initialState = {
  vendors: [],
  pendingVendors: [],
  isFetching: false,
  perPage: 5,
  currentPage: 1,
  totalRows: 0,
  query: {},
  query_review_temp: {},
  query_vendor_onboard: {},
  categories: [],
  tags: [],
  trades: [],
  diversity: [],
  paymentterm: [],
  reviewTemplates: [],
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
    case Types.FETCH_APPROVED_VEN_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_APPROVED_VEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        vendors: action.payload,
      };
    case Types.UPDATE_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case Types.UPDATE_REVIEW_TEMPLATE_QUERY:
      return {
        ...state,
        query_review_temp: action.payload,
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
    //category
    case Types.FETCH_CATEGORY_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    //tags
    case Types.FETCH_TAGS_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_TAGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tags: action.payload,
      };
    //trades
    case Types.FETCH_TRADES_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_TRADES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        trades: action.payload,
      };
    //diversity
    case Types.FETCH_DIVERSITY_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_DIVERSITY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        diversity: action.payload,
      };
    //payment term
    case Types.FETCH_PAYMENT_TERM_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_PAYMENT_TERM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paymentterm: action.payload,
      };

    case Types.FETCH_REVIEW_TEMPLATE_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_REVIEW_TEMPLATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reviewTemplates: action.payload,
      };

    default:
      return state;
  }
};
