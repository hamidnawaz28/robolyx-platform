import * as Types from "./utils.actionTypes"
const initialState = {
  categoriesData:[],
  implementedRulesPk:[],
  draftedRulesPk:[],
  allInvoicesPk:[],
  allRolesList:[]
};
export const utilsData =(state = initialState, action)=> {
    switch (action.type){
    case Types.GET_TAXONOMY_CATEGORIES:
      return {
        ...state,
        categoriesData: action.payload
      };
    case Types.IMPLEMENTED_RULES_PK:
      return {
        ...state,
        implementedRulesPk: action.payload
      };
    case Types.DRAFTED_RULES_PK:
      return {
        ...state,
        draftedRulesPk: action.payload
      };

    case Types.ALL_INVOICES_PK:
      return {
        ...state,
        allInvoicesPk: action.payload
      };
    case Types.ALL_ROLES_LIST:
      return {
        ...state,
        allRolesList: action.payload
      };
    default:
      return state;
  }
}