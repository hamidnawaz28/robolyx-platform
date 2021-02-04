import axios from 'axios'
import {
    TEST_AND_IMPLEMENT_RULE,
    SERVER_URL
} from '../../../../../global/constants'
const fetchTestRuleData = (fetchApiData, getData)=>{
    return dispatch =>{
        axios.get(`${SERVER_URL}${TEST_AND_IMPLEMENT_RULE}`, { params : fetchApiData })
        .then((res)=>{
            getData(res.data)
        })
        .catch((e)=>{
            alert(e)
        })
    }
}
export { fetchTestRuleData }