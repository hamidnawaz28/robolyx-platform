import axios from "axios";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "../../../../../global/constants";
import {
  fetchPendingVendorsSuccess,
  fetchPendingVendorsStart,
  fetchApprovedVendorsSuccess,
  fetchApprovedVendorsStart,
  fetchCategorySuccess,
  fetchTagsSuccess,
  fetchTradesSuccess,
  fetchDiversitySuccess,
  fetchPaymentTermSuccess,
} from "./approvalActions";
import * as type from "./actionTypes";
import { takeEvery, takeLatest, put, call } from "redux-saga/effects";

//Fetch pending vendors saga
export function* pendingVendorsData(action) {
  console.log("action from fetch pending vendors saga", action);
  try {
    const { fetchApiData } = action.payload;

    console.log("running fetch start saga", fetchApiData);
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/pending-vendors/`,
      {
        params: fetchApiData,
      }
    );
    console.log("Data", res.data);

    yield put(fetchPendingVendorsSuccess(res.data));
  } catch (error) {
    alert(error);
    //yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}

export function* onFetchPendingVendorsStart() {
  yield takeLatest(type.FETCH_PENDING_VEN_START, pendingVendorsData);
}

//Fetch pending vendors saga
export function* approvedVendorsData(action) {
  console.log("action from fetch approved vendors saga", action);
  try {
    const { fetchApiData } = action.payload;

    console.log("running fetch start saga", fetchApiData);
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/approved-vendors/`,
      {
        params: fetchApiData,
      }
    );
    console.log("Data", res.data);

    yield put(fetchApprovedVendorsSuccess(res.data));
  } catch (error) {
    alert(error);
    //yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}

export function* onFetchApprovedVendorsStart() {
  yield takeLatest(type.FETCH_APPROVED_VEN_START, approvedVendorsData);
}

//Partial update Approval Status Saga
export function* partialUpdateApprovalStatus(action) {
  console.log(action.payload);

  try {
    let ticket_post_data = action.payload.post_data;
    let rowId = parseInt(action.payload.id);
    let fetchApiData = action.payload.fetchApiData;
    console.log(rowId, ticket_post_data, fetchApiData);

    console.log("running Vendor approval Update  saga");
    const res = yield axios.patch(
      `${SERVER_URL}vendor_management/vendor-basic/${rowId}/`,
      ticket_post_data
    );
    alert("Approval Status is Updated");

    console.log(res.data);

    yield put(fetchPendingVendorsStart({ fetchApiData: fetchApiData }));
  } catch (error) {
    alert(error);
  }
}

export function* onPartialUpdateApprovalStatus() {
  yield takeLatest(
    type.UPDATE_VENDOR_APPROVAL_STATUS,
    partialUpdateApprovalStatus
  );
}

//Fetch category
export function* fetchCategorySaga(action) {
  console.log("action from fetch category saga");
  try {
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/vendor-cats-list/`
    );
    console.log("Data", res.data);

    yield put(fetchCategorySuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchCategoryStart() {
  yield takeLatest(type.FETCH_CATEGORY_START, fetchCategorySaga);
}

//Fetch Tags
export function* fetchTagsSaga(action) {
  console.log("action from fetch tags saga");
  try {
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/vendor-tags-list/`
    );
    console.log("Data", res.data);

    yield put(fetchTagsSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchTagsStart() {
  yield takeLatest(type.FETCH_TAGS_START, fetchTagsSaga);
}

//Fetch trades
export function* fetchTradesSaga(action) {
  console.log("action from fetch trades saga");
  try {
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/vendor-trades-list/`
    );
    console.log("Data", res.data);

    yield put(fetchTradesSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchTradesStart() {
  yield takeLatest(type.FETCH_CATEGORY_START, fetchTradesSaga);
}

//Fetch Diversity
export function* fetchDiversitySaga(action) {
  console.log("action from fetch diversity saga");
  try {
    const res = yield axios.get(
      `${SERVER_URL}vendor_management/vendor-diversity-list/`
    );
    console.log("Data", res.data);

    yield put(fetchDiversitySuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchDiversityStart() {
  yield takeLatest(type.FETCH_DIVERSITY_START, fetchDiversitySaga);
}

//fetchPaymentTermSuccess
export function* fetchPaymentTermSaga(action) {
  console.log("action from fetch PaymentTerm saga");
  try {
    const res = yield axios.get(
      `${SERVER_URL}basic-configs/payment-term-list/`
    );
    console.log("Data", res.data);

    yield put(fetchPaymentTermSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchPaymentTermStart() {
  yield takeLatest(type.FETCH_PAYMENT_TERM_START, fetchPaymentTermSaga);
}

//Partial update vendor basic info Saga
export function* partialUpdateVendor(action) {
  console.log(action.payload);

  try {
    let vendor_post_data = action.payload.post_data;
    let rowId = parseInt(action.payload.id);
    let fetchApiData = action.payload.fetchApiData;
    console.log(rowId, vendor_post_data, fetchApiData);

    console.log("running Partial update vendor basic info  saga");
    const res = yield axios.patch(
      `${SERVER_URL}vendor_management/vendor-basic/${rowId}/`,
      vendor_post_data
    );
    alert("Vendor Information is Updated");

    console.log(res.data);

    yield put(fetchApprovedVendorsStart({ fetchApiData: fetchApiData }));
  } catch (error) {
    alert(error);
  }
}

export function* onPartialUpdateVendors() {
  yield takeLatest(type.PARTIAL_UPDATE_VENDOR, partialUpdateVendor);
}
