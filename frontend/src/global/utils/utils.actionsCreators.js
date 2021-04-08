import * as type from './utils.actionTypes'

export const requestTaxonomyCategories=()=>(
    {
        type: type.START_TAXONOMY_CATEGORIES,
    }
);

export const getTaxonomyCategories=(data)=>(
    {
        type: type.GET_TAXONOMY_CATEGORIES,
        payload: data
    }
);
export const getDraftedRulesPk=(data)=>(
    {
        type: type.DRAFTED_RULES_PK,
        payload: data
    }
);
export const getImplementedRulesPk=(data)=>(
    {
        type: type.IMPLEMENTED_RULES_PK,
        payload: data
    }
);
export const getAllInvoicesPk=(data)=>(
    {
        type: type.ALL_INVOICES_PK,
        payload: data
    }
);
export const getRolesList=(data)=>(
    {
        type: type.ALL_ROLES_LIST,
        payload: data
    }
);