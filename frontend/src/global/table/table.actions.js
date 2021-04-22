import axios from "axios";
import { useDispatch } from "react-redux";
import { SERVER_URL, TEST_AND_IMPLEMENT_RULE } from "../constants";
import {
  updateTableData,
  updateTotalRows,
  fetchTableData,
  updatePerPage,
  updateCurrentPage,
  selectAll,
  addTableData,
} from "./table.actionCreators";

import * as type from "./table.actionTypes";
import { takeEvery, takeLatest, put, call } from "redux-saga/effects";

//Add saga
export function* addData(action) {
  console.log("action from saga", action);
  try {
    const { credentials, postApiData, fetchApiData } = action.payload;

    console.log(
      "running add start saga",
      credentials,
      postApiData,
      fetchApiData
    );
    const res = yield axios.post(`${SERVER_URL}${credentials}`, {
      params: postApiData,
    });

    alert(res.data);

    console.log(res);
    yield put(fetchTableData({ apiLink: credentials, fetchApiData }));
    //yield put(fetchSitesStart());
  } catch (error) {
    alert(error);
    //yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}

export function* onAddStart() {
  yield takeLatest(type.TABLE_DATA_POST, addData);
}

//Fetch table data saga
export function* queryTableData(action) {
  console.log("action from fetch saga", action);
  try {
    const { apiLink, fetchApiData } = action.payload;

    console.log("running fetch start saga", apiLink, fetchApiData);
    const res = yield axios.get(`${SERVER_URL}${apiLink}`, {
      params: fetchApiData,
    });
    console.log("Data", res.data);
    let serviceData = JSON.parse(res.data.queryData);
    console.log("Data", serviceData);
    let data = [];
    serviceData.forEach((element) => {
      element["IsChecked"] = false;
      data.push(element);
    });

    yield put(updateTableData(data));
    yield put(updateTotalRows(res.data.count));
  } catch (error) {
    alert(error);
    //yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}

export function* onQueryStart() {
  yield takeLatest(type.TABLE_DATA_QUERY, queryTableData);
}

const queryData = (credentials, apiData) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_URL}${credentials}`, { params: apiData })
      .then((res) => {
        let serviceData = JSON.parse(res.data.queryData);
        let data = [];
        serviceData.forEach((element) => {
          element["IsChecked"] = false;
          data.push(element);
        });
        dispatch(updateTableData(data));
        dispatch(updateTotalRows(res.data.count));
        //  dispatch(IsUpdating(false))
      })
      .catch((error) => {
        alert(error);
        // dispatch(IsUpdating(false))
        // dispatch(FetchError(true))
      });
  };
};

//Delete Table Data Saga
export function* deleteTableData(action) {
  console.log("action from delete saga", action);

  try {
    const { apiLink, deleteApiData, fetchApiData } = action.payload;

    console.log("running add start saga", apiLink, deleteApiData, fetchApiData);
    const res = yield axios.delete(`${SERVER_URL}${apiLink}`, {
      params: deleteApiData,
    });

    alert(res.data);

    console.log(res);

    yield put(fetchTableData({ apiLink, fetchApiData }));
    //yield put(fetchSitesStart());
  } catch (error) {
    alert(error);
    //yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}

export function* onDeleteDataStart() {
  yield takeLatest(type.TABLE_DATA_DELETE, deleteTableData);
}

//Edit Table Data Saga
export function* editTableData(action) {
  console.log("action from edit saga", action);

  try {
    const { apiLink, updateApidata, fetchApiData } = action.payload;

    console.log("running add start saga", apiLink, updateApidata, fetchApiData);
    const res = yield axios.put(`${SERVER_URL}${apiLink}`, {
      params: updateApidata,
    });

    alert(res.data);

    console.log(res);

    yield put(fetchTableData({ apiLink, fetchApiData }));
    //yield put(fetchSitesStart());
  } catch (error) {
    alert(error);
    //yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
}

export function* onEditDataStart() {
  yield takeLatest(type.TABLE_DATA_EDIT, editTableData);
}

const updateData = (credentials, updateApiData, fetchApiData) => {
  return (dispatch) => {
    axios
      .put(`${SERVER_URL}${credentials}`, { params: updateApiData })
      .then((res) => {
        alert(res.data);
        dispatch(queryData(credentials, fetchApiData));
        //  dispatch(IsUpdating(false))
      })
      .catch((error) => {
        alert(error);
      });
  };
};
const postData = (credentials, postApiData, fetchApiData) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_URL}${credentials}`, { params: postApiData })
      .then((res) => {
        alert(res.data);
        dispatch(queryData(credentials, fetchApiData));
        //  dispatch(IsUpdating(false))
      })
      .catch((error) => {
        alert(error);
      });
  };
};
const implementRule = (credentials, postApiData, fetchApiData) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_URL}${TEST_AND_IMPLEMENT_RULE}/`, { params: postApiData })
      .then((res) => {
        alert(res.data);
        dispatch(queryData(credentials, fetchApiData));
      })
      .catch((e) => {
        alert(e);
      });
  };
};
export { queryData, updateData, postData, implementRule };
