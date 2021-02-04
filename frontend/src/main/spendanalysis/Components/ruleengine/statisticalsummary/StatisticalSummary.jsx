import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    STATISTICAL_SUMMARY,
    STATISTICAL_SUMMARY_COLUMNS,
} from "../../../../../global/constants";
import Table from '../../../../../global/table/table.table'
import { 
    updateTaxonomyCategories,
    updateDraftRulesPK,
    updateImplementedRulesPK
 } from '../../../../../global/utils/utils.actions.js'
import ManageRulesQueryForm from '../managerules/ManageRulesQueryForm'
function StatisticalSummary() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateTaxonomyCategories())
        dispatch(updateDraftRulesPK())
        dispatch(updateImplementedRulesPK())
    }, [])
    return (
        <>  
            <ManageRulesQueryForm
                apiLink = { STATISTICAL_SUMMARY }
                ruleStatus = 'implemented'
                isStatusSwitchEn = { false }
            />
            <Table
                tableHeaders={STATISTICAL_SUMMARY_COLUMNS}
                selectOption={false}
                paginationOption={true}
                apiLink={STATISTICAL_SUMMARY}
            />
        </>
    );
}
export default StatisticalSummary
