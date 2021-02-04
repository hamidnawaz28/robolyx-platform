import { setProgressStatus } from './action'
const initialState = {
    status : false
}
export const updateProgressStatus =(state = initialState, action)=> {
    if (action.type === 'UPDATE_PROGRESS_STATUS') {
        return {
            ...state,
            status : action.payload
        }
    }
    else {
        return state;
    }
}