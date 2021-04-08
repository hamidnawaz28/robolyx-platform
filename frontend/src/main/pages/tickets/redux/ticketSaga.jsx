import axios from "axios";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "../../../../global/constants";
import {
  fetchListSuccess,
  fetchListStart,
  fetchUserSuccess,
  fetchFileUploadSuccess,
  fetchFileUploadStart,
  fetchContentHistorySuccess,
} from "./ticketActions";

import * as type from "./actionTypes";
import { takeEvery, takeLatest, put, call } from "redux-saga/effects";

//fetch list saga
export function* fetchList(action) {
  try {
    console.log("running fetch list saga");
    const res = yield axios.get(`${SERVER_URL}ticket/lists/`);
    // console.log(buList)

    yield put(fetchListSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchListStart() {
  yield takeLatest(type.FETCH_LIST_START, fetchList);
}

//add ticket saga
export function* addTicketSaga(action) {
  console.log(action.payload);
  let ticket_post_data = action.payload;

  try {
    const res = yield axios.post(
      `${SERVER_URL}ticket/tickets/`,
      ticket_post_data
    );

    yield put(fetchListStart());
  } catch (error) {
    alert(error);
  }
}

export function* onAddTicketStart() {
  yield takeLatest(type.ADD_TICKET, addTicketSaga);
}

//fetch User List saga
export function* fetchUserList(action) {
  try {
    console.log("running fetch User list saga");
    const res = yield axios.get(`${SERVER_URL}main/userlist/`);
    console.log(res.data.data);

    yield put(fetchUserSuccess(res.data.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchUserListStart() {
  yield takeLatest(type.FETCH_USER_START, fetchUserList);
}

//Update Ticket Saga
export function* EditTicketInd(action) {
  console.log(action.payload);
  let ticket_post_data = action.payload;
  let rowId = ticket_post_data.id;
  try {
    console.log("running Ticket Update  saga");
    const res = yield axios.put(
      `${SERVER_URL}ticket/tickets/${rowId}/`,
      ticket_post_data
    );

    console.log(res.data.data);

    yield put(fetchListStart());
  } catch (error) {
    alert(error);
  }
}

export function* onUpdateTicketStart() {
  yield takeLatest(type.EDIT_TICKET, EditTicketInd);
}

//uploaded files fetch  saga
export function* fetchFileUploads(action) {
  let ticket_id = action.payload;
  try {
    console.log("running fetch file uploads saga", action.payload);
    const res = yield axios.get(
      `${SERVER_URL}ticket/ticket-upload/?ticket_id=${ticket_id}`
    );
    console.log(res.data);

    yield put(fetchFileUploadSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchFileUploadsStart() {
  yield takeLatest(type.FETCH_FILE_UPLOADS_START, fetchFileUploads);
}

//delete file uploaded
export function* deleteFileUploads(action) {
  let ticket_id = action.payload;
  try {
    console.log("running fetch file uploads saga", action.payload);
    const res = yield axios.delete(
      `${SERVER_URL}ticket/ticket-upload/${ticket_id}`
    );
    console.log(res.data);

    yield put(fetchFileUploadStart(ticket_id));
  } catch (error) {
    alert(error);
  }
}

export function* onDeleteFileUploaded() {
  yield takeLatest(type.DELETE_TICKET, deleteFileUploads);
}

//upload a file
export function* fileUploadSaga(action) {
  console.log("uploading a file", action.payload);
  let formData = action.payload.formData;
  let ticket_id = action.payload.ticket_id;

  try {
    const res = yield axios.post(
      `${SERVER_URL}ticket/ticket-upload/`,
      formData
    );

    yield put(fetchFileUploadStart(ticket_id));
  } catch (error) {
    alert(error);
  }
}

export function* onFileUploadStart() {
  yield takeLatest(type.UPLOAD_FILE, fileUploadSaga);
}

//fetch content history saga
export function* fetchContentHistory(action) {
  let ticket_id = action.payload;
  try {
    console.log("running content history fetch saga", action.payload);
    const res = yield axios.get(
      `${SERVER_URL}ticket/content-history/?ticket_id=${ticket_id}`
    );
    console.log(res.data);

    yield put(fetchContentHistorySuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchContentHistoryStart() {
  yield takeLatest(type.FETCH_CONTENT_HISTORY_START, fetchContentHistory);
}
