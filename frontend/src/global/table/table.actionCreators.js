import * as type from './table.actionTypes'
export const updateTableData=(data)=>(
    {
        type: type.TABLE_DATA,
        payload: data
    }
);
export const updatePerPage=(data)=>(
    {
        type: type.PER_PAGE,
        payload: data
    }
);
export const updateCurrentPage=(data)=>(
    {
        type: type.CURRENT_PAGE,
        payload: data
    }
);
export const updateTotalRows=(data)=>(
    {
        type: type.TOTAL_ROWS,
        payload: data
    }
);
export const updateFormQuery = (data) => (
    {
        type : type.FORM_QUERY,
        payload : data
    }
);
export const selectAll=(data)=>(
    {
        type: type.IS_ALL_SELECTED,
        payload: data
    }
);