import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';

import * as Sites_types from './sites.types';
import axios from '../../utils/axios1';

import {
	editSitesStart,
	editSitesSuccess,
	editSitesFailure,
	delSitesStart,
	delSitesSuccess,
	delSitesFailure,
	addSitesStart,
	addSitesFailure,
	fetchSitesStart,
	fetchSitesSuccess,
	fetchSitesFailure,
} from './sites.actions';


//Add SITES Saga
export function* addSites(action) {
	try {
		console.log('running add start saga');
		const sitesList = yield axios.post(`/sites/sites/`, action.payload);
		console.log(sitesList);

		//yield put(addSitesSuccess(sitesList.data));
		yield put(fetchSitesStart());
	} catch (error) {
		yield put(addSitesFailure(error.response && error.response.data.message ? error.response.data.message : error.message));
	}
}

export function* onAddSitesStart() {
	yield takeLatest(Sites_types.ADD_SITE_START, addSites);
}