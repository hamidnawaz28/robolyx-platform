import { setProgressStatus } from './action'
const initialState = {
    status : false,
    percentage : 0
}
export const updateProgressStatus =(state = initialState, action)=> {
    if (action.type === 'UPDATE_PROGRESS_STATUS') {
        return {
            ...state,
            status : action.payload,
            percentage : action.percentage
        }
    }
    else {
        return state;
    }
}