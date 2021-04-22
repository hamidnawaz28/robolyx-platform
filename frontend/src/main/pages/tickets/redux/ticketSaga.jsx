import axios from "axios";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "../../../../global/constants";
import {
  fetchTicketsSuccess,
  fetchTicketsStart,
  fetchUserSuccess,
  fetchFileUploadSuccess,
  fetchFileUploadStart,
  fetchContentHistorySuccess,
  updateTicketArchiveTableData,
  updateArchiveTicketTotalRows,
} from "./ticketActions";

import * as type from "./actionTypes";
import { takeEvery, takeLatest, put, call } from "redux-saga/effects";

//fetch list saga
export function* fetchTickets(action) {
  const { fetchApiData } = action.payload;
  try {
    console.log("running fetch tickets saga", action.payload);
    const res = yield axios.get(`${SERVER_URL}ticket/tickets/`, {
      params: fetchApiData,
    });
    console.log(res.data);

    yield put(fetchTicketsSuccess(res.data));
  } catch (error) {
    alert(error);
  }
}

export function* onFetchTicketsStart() {
  yield takeLatest(type.FETCH_TICKETS_START, fetchTickets);
}

//add ticket saga
export function* addTicketSaga(action) {
  console.log(action.payload);
  let ticket_post_data = action.payload.post_data;
  let fetchApiData = action.payload.fetchApiData;

  try {
    const res = yield axios.post(
      `${SERVER_URL}ticket/tickets/`,
      ticket_post_data
    );

    yield put(fetchTicketsStart({ fetchApiData }));
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
  let ticket_post_data = action.payload.post_data;
  let rowId = ticket_post_data.id;
  let fetchApiData = action.payload.fetchApiData;

  try {
    console.log("running Ticket Update  saga");
    const res = yield axios.put(
      `${SERVER_URL}ticket/tickets/${rowId}/`,
      ticket_post_data
    );

    console.log(res.data);

    yield put(fetchTicketsStart({ fetchApiData }));
  } catch (error) {
    alert(error);
  }
}

export function* onUpdateTicketStart() {
  yield takeLatest(type.EDIT_TICKET, EditTicketInd);
}

//Partial update Ticket Saga
export function* PartialUpdateTicket(action) {
  console.log(action.payload);

  try {
    let ticket_post_data = action.payload.post_data;
    let rowId = parseInt(action.payload.id);
    let fetchApiData = action.payload.fetchApiData;
    console.log(rowId, ticket_post_data, fetchApiData);

    console.log("running Ticket Update  saga");
    const res = yield axios.patch(
      `${SERVER_URL}ticket/tickets/${rowId}/`,
      ticket_post_data
    );

    console.log(res.data);

    //yield put(fetchTicketsStart({ fetchApiData }));
  } catch (error) {
    alert(error);
  }
}

export function* onPartialUpdateTicketStart() {
  yield takeLatest(type.PARTIAL_UPDATE_TICKET, PartialUpdateTicket);
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

//Archive Tickets Sagas

//Fetch table data saga
export function* queryArchiveTicketsTableData(action) {
  console.log("action from archive fetch saga", action);
  try {
    const { apiLink, fetchApiData } = action.payload;

    console.log("running fetch start saga", apiLink, fetchApiData);
    const res = yield axios.get(`${SERVER_URL}${apiLink}`, {
      params: fetchApiData,
    });
    console.log("Data", res.data);

    yield put(updateTicketArchiveTableData(res.data));
    yield put(updateArchiveTicketTotalRows(res.data.count));
  } catch (error) {
    alert(error);
    //yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}

export function* onArchiveTicketsQueryStart() {
  yield takeLatest(
    type.TICKET_ARCHIVE_TABLE_DATA_QUERY,
    queryArchiveTicketsTableData
  );
}
