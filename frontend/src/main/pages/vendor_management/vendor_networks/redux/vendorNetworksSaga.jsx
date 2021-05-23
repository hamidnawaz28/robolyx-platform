import axios from "axios";
import { SERVER_URL } from "../../../../../global/constants";
import { fetchVendorsSuccess } from "./vendorNetworksActions";
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
