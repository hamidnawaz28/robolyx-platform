import axios from 'axios'
import { useDispatch } from 'react-redux'
import {
    SERVER_URL,
    TEST_AND_IMPLEMENT_RULE
} from '../constants'
import { 
    updateTableData, 
    updateTotalRows, 
    updatePerPage, 
    updateCurrentPage, 
    selectAll 
} from './table.actionCreators'
const queryData = (credentials, apiData ) => {
        return dispatch => {
            axios
                .get(`${SERVER_URL}${credentials}`, { params : apiData })
                .then((res)=>{
                    let serviceData = JSON.parse(res.data.queryData);
                    let data = []
                    serviceData.forEach(element => {
                        element["IsChecked"] = false
                        data.push(element)
                    });
                    dispatch(updateTableData(data))
                    dispatch(updateTotalRows(res.data.count))
                    //  dispatch(IsUpdating(false))
                })
                .catch((error)=>{
                    alert(error)
                    // dispatch(IsUpdating(false))
                    // dispatch(FetchError(true))
                })
        }
}

const deleteData = (credentials, delApiData, fetchApiData) =>{
        return dispatch => {
            axios
                .delete(`${SERVER_URL}${credentials}`, { params : delApiData })
                .then((res)=>{
                    alert(res.data)
                    dispatch( queryData( credentials, fetchApiData ))
                    //  dispatch(IsUpdating(false))
                })
                .catch((error)=>{
                    alert(error)
                })
        }
}
const updateData = ( credentials , updateApiData , fetchApiData ) =>{
    return dispatch => {
        axios
            .put(`${SERVER_URL}${credentials}`, { params : updateApiData })
            .then((res)=>{
                alert(res.data)
                dispatch( queryData( credentials, fetchApiData ))
                //  dispatch(IsUpdating(false))
            })
            .catch((error)=>{
                alert(error)
            })
    }
}
const postData = ( credentials , postApiData, fetchApiData ) =>{
    return dispatch => {
        axios
            .post(`${SERVER_URL}${credentials}`, { params : postApiData })
            .then((res)=>{
                alert(res.data)
                dispatch( queryData( credentials, fetchApiData ))
                //  dispatch(IsUpdating(false))
            })
            .catch((error)=>{
                alert(error)
            })
    }
}
const implementRule = (credentials, postApiData, fetchApiData)=>{
    return dispatch =>{
        axios.post(`${SERVER_URL}${TEST_AND_IMPLEMENT_RULE}/`,{ params : postApiData})
        .then((res)=>{
            alert(res.data)
            dispatch( queryData( credentials, fetchApiData ))
        })
        .catch((e)=>{
            alert(e)
        })
    }
}
export { deleteData, queryData, updateData, postData, implementRule }