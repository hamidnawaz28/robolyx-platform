import * as type from './actionTypes';

export const fetchCategoriesStart = (data) => ({
	type: type.FETCH_CATEGORIES_START,
	payload: data,
});

export const fetchCategoriesSuccess = (data) => ({
	type: type.FETCH_CATEGORIES_SUCCESS,
	payload: data,
});

export const fetchComplianceTaskStart = (data) => ({
	type: type.FETCH_COMPLIANCE_TASK_START,
	payload: data,
});

export const fetchComplianceTaskSuccess = (data) => ({
	type: type.FETCH_COMPLIANCE_TASK_SUCCESS,
	payload: data,
});

export const updateCurrentPage = (data) => ({
	type: type.UPDATE_CURRENT_PAGE,
	payload: data,
});

//delete compliance tasks
export const deleteComplianceTasks = (data) => ({
	type: type.DELETE_COMPLIANCE_TASK,
	payload: data,
});

export const updateComplianceQuery = (data) => ({
	type: type.UPDATE_COMPLIANCE_QUERY,
	payload: data,
});
