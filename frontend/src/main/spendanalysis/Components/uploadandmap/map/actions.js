import axios from 'axios'
import { useDispatch } from 'react-redux'
import { defaltTemplates, 
    selectedDefaultTemplate, 
    savedTemplates, 
    selectedSavedTemplate, 
    attachFileName, 
    attachFileData } from './actionCreators'
import { SERVER_URL, DEFAULT_TEMPLETES, SAVED_TEMPLETES, MANAGE_TEMPLATES} from "../../../../../global/constants" 
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
const postMapping = ( postApiData ) => {
    return dispatch => {
        axios
            .post(`${SERVER_URL}${MANAGE_TEMPLATES}`, postApiData )
            .then((res)=>{ 
                alert(res.data)
            })
            .catch((error)=>{
                alert(error)
            })
    }
}
export { fetchDefaultTemplates , postMapping}