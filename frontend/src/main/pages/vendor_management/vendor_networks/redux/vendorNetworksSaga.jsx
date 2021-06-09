import axios from "axios";
import { SERVER_URL } from "../../../../../global/constants";
import {
  fetchVendorsSuccess,
  fetchSingleVendorSuccess,
  fetchIndividualVendorAddressSuccess,
  fetchFileUploadSuccess,
  fetchFileUploadStart,
  fetchNotesSuccess,
  fetchReviewlistSuccess,
  fetchVenReviewlistSuccess,
  fetchVenComplianceListSuccess,
} from "./vendorNetworksActions";
import * as type from "./actionTypes";
import { takeLatest, put } from "redux-saga/effects";

//Fetch pending vendors saga
export function* fetchVendorsData(action) {
  console.log("action from fetch pending vendors saga", action);
  try {
    const { fetchApiData } = action.payload;

    console.log("running fetch start saga", fetchApiData);
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/vendor-basic/`,
      {
        params: fetchApiData,
      }
    );
    console.log("Data", res.data);

    yield put(fetchVendorsSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchVendorsStart() {
  yield takeLatest(type.FETCH_VENDORS_START, fetchVendorsData);
}

//Fetch individual vendors data saga
export function* fetchSingleVendorData(action) {
  console.log("action from fetch single vendor saga", action);
  try {
    const id = action.payload;

    console.log("running fetch single vendor start saga", id);
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/vendor-basic/${id}`
    );
    console.log("Data", res.data);

    yield put(fetchSingleVendorSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchSingleVendorStart() {
  yield takeLatest(type.FETCH_SINGLE_VENDOR_START, fetchSingleVendorData);
}

//Fetch individual vendors address saga
export function* fetchVendorAddress(action) {
  console.log("action from fetch  vendor address saga", action);
  try {
    const id = action.payload;

    console.log("running fetch single vendor address saga", id);
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/ven_add/?vendorId=${id}`
    );
    console.log("Data", res.data);

    yield put(fetchIndividualVendorAddressSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchVendorAddress() {
  yield takeLatest(type.FETCH_INDIVIDUAL_VEN_ADDRESS_START, fetchVendorAddress);
}

//Fetch vendor uploads saga
export function* fetchVendorUploads(action) {
  console.log("action from fetch vendor uploads saga", action);
  try {
    const id = action.payload;

    console.log("running fetch vendor uploads saga", id);
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/vendor-upload/?vendor_id=${id}`
    );
    console.log("Data", res.data);

    yield put(fetchFileUploadSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchVendorUploads() {
  yield takeLatest(type.FETCH_FILE_UPLOAD_START, fetchVendorUploads);
}

//Fetch vendor uploads saga
export function* deleteVendorUploads(action) {
  console.log("action from delete vendor uploads saga", action);
  try {
    const id = action.payload.file_id;
    const vendor_id = action.payload.vendor_id;

    const res = yield axios.delete(
      `${SERVER_URL}vendor_management/vendor-upload/${id}`
    );
    console.log("Data", res.data);

    yield put(fetchFileUploadStart(vendor_id));
  } catch (error) {
    alert(error);
  }
}

export function* onDeleteVendorUploads() {
  yield takeLatest(type.DELETE_VENDOR_UPLOAD, deleteVendorUploads);
}

//Fetch vendors notes saga
export function* fetchVendorNotes(action) {
  console.log("action from fetch vendors notes saga", action);
  try {
    const { fetchApiData } = action.payload;

    console.log("running fetch single vendors notes saga");
    const res = yield axios.get(`${SERVER_URL}vendor_management/notes/`, {
      params: fetchApiData,
    });
    console.log("Data", res.data);

    yield put(fetchNotesSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchVendorNotes() {
  yield takeLatest(type.FETCH_NOTES_START, fetchVendorNotes);
}

//saga to fetch review templates for review add page in single vendor section

export function* fetchVendorReviewTemplateData() {
  try {
    console.log("running fetch start saga");
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/review-template-list/`
    );
    console.log("Data", res.data);

    yield put(fetchReviewlistSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchVendorReviewTemplateStart() {
  yield takeLatest(type.FETCH_REVIEW_LIST_START, fetchVendorReviewTemplateData);
}

//saga to fetch vendor review templates for single vendor

export function* fetchVendorReviewList(action) {
  console.log("action from fetch vendors notes saga", action);
  try {
    const { fetchApiData } = action.payload;

    console.log("running fetch single vendors notes saga");
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/review-response-status/`,
      {
        params: fetchApiData,
      }
    );
    console.log("Data", res.data);

    yield put(fetchVenReviewlistSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchVendorReviewListStart() {
  yield takeLatest(type.FETCH_VEN_REVIEW_LIST_START, fetchVendorReviewList);
}

//saga to fetch vendor review templates for single vendor

export function* fetchVendorComplianceList(action) {
  console.log("action from fetch compliance list saga", action);
  try {
    const { fetchApiData } = action.payload;

    console.log("running fetch single vendors notes saga");
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/comp-vendor-task/`,
      {
        params: fetchApiData,
      }
    );
    console.log("Data", res.data);

    yield put(fetchVenComplianceListSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchVendorComplianceListStart() {
  yield takeLatest(
    type.FETCH_VEN_COMPLIANCE_LIST_START,
    fetchVendorComplianceList
  );
}
