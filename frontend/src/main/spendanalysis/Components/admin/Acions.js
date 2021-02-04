import axios from 'axios'
import { useDispatch } from 'react-redux'
import { 
    SERVER_URL, 
    DEFAULT_TEMPLETES, 
    VERIFY_USER, 
    MANAGE_TEMPLATES
} from "../../../../../src/global/constants" 
const verifyUser = (getApiData, callback) => {
        return dispatch => {
            axios
                .get(`${SERVER_URL}${VERIFY_USER}`, { params : getApiData })
                .then((res)=>{
                    if(res.data!=0){
                        callback(res.data)
                    }
                })
                .catch((error) => {
                    alert(error)
                })
        }
}
export { verifyUser }