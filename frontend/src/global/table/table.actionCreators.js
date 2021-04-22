import * as type from "./table.actionTypes";

export const addTableData = (data) => ({
  type: type.TABLE_DATA_POST,
  payload: data,
});

export const deleteTableData = (data) => ({
  type: type.TABLE_DATA_DELETE,
  payload: data,
});

export const editTableData = (data) => ({
  type: type.TABLE_DATA_EDIT,
  payload: data,
});

export const fetchTableData = (data) => ({
  type: type.TABLE_DATA_QUERY,
  payload: data,
});

export const updateTableData = (data) => ({
  type: type.TABLE_DATA,
  payload: data,
});
export const updatePerPage = (data) => ({
  type: type.PER_PAGE,
  payload: data,
});
export const updateCurrentPage = (data) => ({
  type: type.CURRENT_PAGE,
  payload: data,
});
export const updateTotalRows = (data) => ({
  type: type.TOTAL_ROWS,
  payload: data,
});
export const updateFormQuery = (data) => ({
  type: type.FORM_QUERY,
  payload: data,
});
export const selectAll = (data) => ({
  type: type.IS_ALL_SELECTED,
  payload: data,
});
export const resetStates = (data) => ({
  type: type.RESET_STATES,
  payload: "",
});
