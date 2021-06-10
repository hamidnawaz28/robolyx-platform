import * as Types from "./actionTypes";

const initialState = {
  allVendors: [],
  isFetching: false,
  perPage: 5,
  currentPage: 1,
  totalRows: 0,
  searchQuery: {},
  singleVendor: {},
  vendorAddress: {},
  vendorUploads: [],
  vendorNotes: [],
  noteQuery: {},
  review_templates: [],
  ven_review_templates: [],
  searchVenReview: {},
  ven_compliance_list: [],
  complianceQuery: {},
  comp_task_list: [],
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
    case Types.FETCH_SINGLE_VENDOR_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_SINGLE_VENDOR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        singleVendor: action.payload,
      };
    case Types.FETCH_INDIVIDUAL_VEN_ADDRESS_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_INDIVIDUAL_VEN_ADDRESS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        vendorAddress: action.payload,
      };
    case Types.FETCH_FILE_UPLOAD_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        vendorUploads: action.payload,
      };
    case Types.FETCH_NOTES_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        vendorNotes: action.payload,
      };
    case Types.UPDATE_NOTE_QUERY:
      return {
        ...state,
        noteQuery: action.payload,
      };
    case Types.FETCH_REVIEW_LIST_SUCCESS:
      return {
        ...state,
        review_templates: action.payload,
      };
    case Types.FETCH_VEN_REVIEW_LIST_SUCCESS:
      return {
        ...state,
        ven_review_templates: action.payload,
      };
    case Types.UPDATE_VEN_REVIEW_QUERY:
      return {
        ...state,
        searchVenReview: action.payload,
      };
    case Types.FETCH_VEN_COMPLIANCE_LIST_SUCCESS:
      return {
        ...state,
        ven_compliance_list: action.payload,
      };
    case Types.UPDATE_VEN_COMPLIANCE_QUERY:
      return {
        ...state,
        complianceQuery: action.payload,
      };
    case Types.FETCH_COMP_LIST_SUCCESS:
      return {
        ...state,
        comp_task_list: action.payload,
      };

    default:
      return state;
  }
};
