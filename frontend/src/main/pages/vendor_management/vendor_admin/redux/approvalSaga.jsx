import axios from "axios";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "../../../../../global/constants";
import {
  fetchPendingVendorsSuccess,
  fetchPendingVendorsStart,
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
