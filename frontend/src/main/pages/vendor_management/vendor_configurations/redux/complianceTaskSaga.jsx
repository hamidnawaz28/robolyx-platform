import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SERVER_URL } from '../../../../../global/constants';
import {
	fetchCategoriesSuccess,
	fetchComplianceTaskSuccess,
	fetchComplianceTaskStart,
} from './complianceTaskActions';
import * as type from './actionTypes';
import { takeLatest, put, call } from 'redux-saga/effects';

//Fetch categories saga
export function* fetchCategories(action) {
	console.log('action from fetch cats saga');
	try {
		const res = yield axios.get(
			`${SERVER_URL}vendor_management/vendor-cats-list/`
		);
		console.log('Data', res.data);

		yield put(fetchCategoriesSuccess(res.data));
	} catch (error) {
		alert(error);
	}
}

export function* onFetchCategoriesStart() {
	yield takeLatest(type.FETCH_CATEGORIES_START, fetchCategories);
}

//Fetch compliance tasks saga
export function* fetchComplianceTasks(action) {
	console.log('action from fetch compliance tasks saga', action);
	try {
		const { fetchApiData } = action.payload;

		console.log('running fetch compliance tasks saga', fetchApiData);
		const res = yield axios.get(
			`${SERVER_URL}vendor_management/compliance-task/`,
			{
				params: fetchApiData,
			}
		);
		console.log('Data', res);

		yield put(fetchComplianceTaskSuccess(res.data));
	} catch (error) {
		alert(error);
	}
}

export function* onFetchComplianceTasksStart() {
	yield takeLatest(type.FETCH_COMPLIANCE_TASK_START, fetchComplianceTasks);
}

//Delete Table Data Saga
export function* deleteComplianceTask(action) {
	console.log('action from delete compliance task saga', action);

	try {
		const { id, fetchApiData } = action.payload;

		console.log('running delete saga', id, fetchApiData);
		const res = yield axios.delete(
			`${SERVER_URL}vendor_management/compliance-task/${id}/`
		);

		yield put(fetchComplianceTaskStart({ fetchApiData }));
	} catch (error) {
		alert(error);
	}
}

export function* onDeleteComplianceTask() {
	yield takeLatest(type.DELETE_COMPLIANCE_TASK, deleteComplianceTask);
}
