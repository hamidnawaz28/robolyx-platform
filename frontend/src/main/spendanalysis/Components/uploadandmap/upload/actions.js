import axios from 'axios'
import { useDispatch } from 'react-redux'
import { defaltTemplates, 
    selectedDefaultTemplate, 
    savedTemplates, 
    selectedSavedTemplate, 
    attachFileName, 
    attachFileData,
    resetUploadStates
} from './actionCreators'
import { 
    setProgressStatus
} from '../../../../../global/progress/action'
import { SERVER_URL, DEFAULT_TEMPLETES, SAVED_TEMPLETES, FILE_IMPORT} from "../../../../../global/constants" 
const fetchDefaultTemplates = () => {
        return dispatch => {
            axios
                .get(`${SERVER_URL}${DEFAULT_TEMPLETES}`)
                .then((res)=>{
                    let serData =[]
                    res.data.forEach((element)=>{
                        let fields = {...element.fields ,Items: JSON.parse(element.fields.Items)}
                        element.fields = fields
                        serData.push(element)
                    })
                    dispatch (defaltTemplates(serData))
                })
                .catch((error) => {
                    alert(error)
                })
        }
}
const fetchSavedTemplates = ( fetchApiData ) =>{
    return dispatch => {
        axios
            .get(`${SERVER_URL}${SAVED_TEMPLETES}`, { params : fetchApiData })
            .then((res)=>{ 
                let serData =[]
                    res.data.forEach((element)=>{
                        let fields = {...element.fields ,MappedItems: JSON.parse(element.fields.MappedItems)}
                        element.fields = fields
                        serData.push(element)
                    })
                dispatch (savedTemplates(serData))
            })
            .catch((error)=>{
                alert(error)
            })
    }
}
const uploadFileData = ( postApiData ) => {
    return dispatch => {
        dispatch(setProgressStatus(true))
        axios
            .post(`${SERVER_URL}${FILE_IMPORT}/`, postApiData )
            .then((res)=>{ 
                dispatch(setProgressStatus(false))
                alert(res.data)
                dispatch(resetUploadStates())
                
            })
            .catch((error)=>{
                dispatch(setProgressStatus(false))
                alert(error)
            })
    }
}
export { fetchDefaultTemplates, fetchSavedTemplates, uploadFileData }