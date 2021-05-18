import * as type from "./actionTypes";

export const fetchCategoriesStart = (data) => ({
  type: type.FETCH_CATEGORIES_START,
  payload: data,
});

export const fetchCategoriesSuccess = (data) => ({
  type: type.FETCH_CATEGORIES_SUCCESS,
  payload: data,
});
