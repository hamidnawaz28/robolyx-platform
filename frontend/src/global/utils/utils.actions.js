import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getTaxonomyCategories, getDraftedRulesPk, getImplementedRulesPk, getAllInvoicesPk, getRolesList } from './utils.actionsCreators'
import {
    SERVER_URL,
    UTILS
} from '../constants'
const projectKey = '1'
const updateTaxonomyCategories = () => {
    return dispatch => {
        axios
            .get(
                `${SERVER_URL}${UTILS}`,
                {
                    params:{
                        type: "TaxonomyCategories",
                        project: projectKey
                    }
                }
            )
            .then((res) => {
                dispatch(getTaxonomyCategories(res.data))
            })
            .catch((error) => {
                alert(error)
            })
    }
}

const updateDraftRulesPK = () => {
    return dispatch => {
        axios
            .get(
                `${SERVER_URL}${UTILS}`,
                {
                    params:{
                        type: "DraftRulesPK",
                        project: projectKey
                    }
                }
            )
            .then((res) => {
                dispatch(getDraftedRulesPk(res.data))
            })
            .catch((error) => {
                alert(error)
            })
    }
}   
const updateImplementedRulesPK = () => {
    return dispatch => {
        axios
            .get(
                `${SERVER_URL}${UTILS}`,
                {
                    params:{
                        type: "ImplementedRulesPK",
                        project: projectKey
                    }
                }
            )
            .then((res) => {
                dispatch(getImplementedRulesPk(res.data))
            })
            .catch((error) => {
                alert(error)
            })
    }
}   
const updateInvoicesPk = () => {
    return dispatch => {
        axios
            .get(
                `${SERVER_URL}${UTILS}`,
                {
                    params:{
                        type: "InvoicesPK",
                        project: projectKey
                    }
                }
            )
            .then((res) => {
                dispatch(getAllInvoicesPk(res.data))
            })
            .catch((error) => {
                alert(error)
            })
    }
}   
const updateRolesList = () => {
    return dispatch => {
        axios
            .get(
                `${SERVER_URL}${UTILS}`,
                {
                    params:{
                        type: "RolesList",
                        project: projectKey
                    }
                }
            )
            .then((res) => {
                dispatch(getRolesList(res.data))
            })
            .catch((error) => {
                alert(error)
            })
    }
} 
export { updateTaxonomyCategories, updateDraftRulesPK, updateImplementedRulesPK, updateInvoicesPk, updateRolesList }
