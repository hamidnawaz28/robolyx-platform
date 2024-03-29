export const SERVER_URL = "http://localhost:8090/api/";
export const USER_DATA = "user-data";
export const VENDOR_REQUEST = "vendor_management/vendor-req";
export const FILE_IMPORT = "main/file-import"
export const FILE_UPLOAD = "main/file-upload";

export const UTILS = "main/utils";
export const RULE_ENGINE = "main/rule-engine";
export const TEST_AND_IMPLEMENT_RULE = "main/test-and-implement-rule";
export const RULE_ENGINE_DATA = "main/rule-engine-data";
export const INVOICE_BY_RULE = "main/invoice-by-rule";
export const OVERWRITTEN_RULES = "main/overwritten-rules";
export const STATISTICAL_SUMMARY = "main/statistical-summary";
export const TAXONOMY_DATA = "main/taxonomy-data";
export const BUSINESS_UNIT_DATA = "basic-configs/buss_units";
export const INVOICE_DATA = "main/invoice-data";
export const CONTRACT_DATA = "main/contract-data";
export const GL_DATA = "main/gl-data";

export const ARC_TICKETS_DATA = "ticket/archive-tickets-list";
export const PO_DATA = "main/po-data";
export const MANAGE_TEMPLATES = "main/manage-templates";
export const DEFAULT_TEMPLETES = "main/default-templates";
export const SAVED_TEMPLETES = "main/saved-templates";
export const VERIFY_USER = "main/find-email-or-user-name";
export const VENDOR_TAGS_API_LINK = "vendor_management/vendor-tag";
export const VENDOR_TRADES_API_LINK = "vendor_management/vendor-trade";
export const VENDOR_CATEGORIES_API_LINK = "vendor_management/vendor-cat";
export const VENDOR_DIVERSITY_API_LINK = "vendor_management/diversity-class";

export const TEMPLATES_COLUMNS = {
  MappingName: "MappingName",
  DATE_ENTERED: "DATE_ENTERED",
  DataTableReference: "DataTableReference",
  MappedItems: "MappedItems",
};
export const RULE_ENGINE_OPERATORS = {
  date: ["=", ">", ">=", "<", "<="],
  number: ["=", ">", ">=", "<", "<="],
  string: ["EQUALS", "STARTS WITH", "ENDS WITH", "CONTAINS", "MISSING"],
};
export const PRIORITY_LIST = ["Medium", "High", "Low"];
export const DATA_ATTRIBUTES_WITH_TYPE = {
  string: [
    "INVOICE_ID",
    "INV_SOURCE",
    "INV_NUMBER",
    "VENDOR_NUMBER",
    "VENDOR_NAME",
    "LINE_DESCRIPTION",
    "LINE_QUANTITY",
    "GENERAL_LEDGER",
    "PO_NUMBER",
    "INV_ORGINE",
    "VENDOR_TYPE",
    "INV_TERMS",
    "LINE_NUMBER",
    "LINE_TYPE",
    "LINE_UNIT_OF_MEASURE",
    "LOCATION",
    "DEPARTMENT",
    "ACCOUNT",
  ],
  date: ["GL_DATE", "CREATION_DATE", "INV_DATE"],
  number: ["LINE_AMOUNT", "LINE_UNIT_PRICE"],
};

export const DATA_ATTRIBUTES = [
  "INVOICE_ID",
  "GL_DATE",
  "INV_ORGINE",
  "INV_DATE",
  "INV_SOURCE",
  "INV_NUMBER",
  "VENDOR_NUMBER",
  "VENDOR_NAME",
  "VENDOR_TYPE",
  "INV_TERMS",
  "LINE_NUMBER",
  "LINE_TYPE",
  "LINE_DESCRIPTION",
  "LINE_QUANTITY",
  "LINE_UNIT_PRICE",
  "LINE_UNIT_OF_MEASURE",
  "LINE_AMOUNT",
  "GENERAL_LEDGER",
  "LOCATION",
  "DEPARTMENT",
  "ACCOUNT",
  "PO_NUMBER",
  "CREATION_DATE",
];
export const STATISTICAL_SUMMARY_COLUMNS = {
  "Rule ID": "id",
  "Invoices Impacted": "invoice_impacted",
};
export const DATA_ATTRIBUTES_FOR_RULE_ENGINE = {
  "RULE ID": "id",
  CATAGORIES: "CATAGORIES",
  PRIORITY: "PRIORITY",
  FIELD_1: "FIELD_1",
  OPERATOR_1: "OPERATOR_1",
  VALUE_1: "VALUE_1",
  FIELD_2: "FIELD_2",
  OPERATOR_2: "OPERATOR_2",
  VALUE_2: "VALUE_2",
  FIELD_3: "FIELD_3",
  OPERATOR_3: "OPERATOR_3",
  VALUE_3: "VALUE_3",
};
export const VENDOR_REQUEST_COLUMNS = {
  "Company Name": "company_name",
  "Request Status": "request_status",
  "Created At": "created_at",
};
export const DATA_ATTRIBUTES_FOR_COLUMNS = {
  INVOICE_ID: "INVOICE_ID",
  GL_DATE: "GL_DATE",
  INV_ORIGIN: "INV_ORIGIN",
  INV_DATE: "INV_DATE",
  INV_SOURCE: "INV_SOURCE",
  INV_NUMBER: "INV_NUMBER",
  VENDOR_NUMBER: "VENDOR_NUMBER",
  VENDOR_NAME: "VENDOR_NAME",
  VENDOR_TYPE: "VENDOR_TYPE",
  INV_TERMS: "INV_TERMS",
  LINE_NUMBER: "LINE_NUMBER",
  LINE_TYPE: "LINE_TYPE",
  LINE_DESCRIPTION: "LINE_DESCRIPTION",
  LINE_QUANTITY: "LINE_QUANTITY",
  LINE_UNIT_PRICE: "LINE_UNIT_PRICE",
  LINE_UNIT_OF_MEASURE: "LINE_UNIT_OF_MEASURE",
  LINE_AMOUNT: "LINE_AMOUNT",
  GENERAL_LEDGER: "GENERAL_LEDGER",
  LOCATION: "LOCATION",
  DEPARTMENT: "DEPARTMENT",
  ACCOUNT: "ACCOUNT",
  PO_NUMBER: "PO_NUMBER",
  CREATION_DATE: "CREATION_DATE",
};
export const TAXONOMY_ATTRIBUTES = {
  CATEGORY_LEVEL_ONE: "CATEGORY_LEVEL_ONE",
  CATEGORY_LEVEL_TWO: "CATEGORY_LEVEL_TWO",
  CATEGORY_LEVEL_THREE: "CATEGORY_LEVEL_THREE",
  CATEGORY_LEVEL_FOUR: "CATEGORY_LEVEL_FOUR",
  CATEGORY_LEVEL_FIVE: "CATEGORY_LEVEL_FIVE",
};

export const BU_COLUMNS = {
  buss_name: "buss_name",
  created_by: "created_by",
};

export const CONTRACT_COLUMNS = {
  CONTRACT_EXPIRY_DATE: "CONTRACT_EXPIRY_DATE",
  DATE_SIGNED: "DATE_SIGNED",
  COMMENCEMENT_DATE: "COMMENCEMENT_DATE",
  REVIEW_DATE: "REVIEW_DATE",
  PRICE_REVIEW_DATE: "PRICE_REVIEW_DATE",
  CREATED_DATE: "CREATED_DATE",
  MODIFIED_DATE: "MODIFIED_DATE",
  CONTRACT_INC_EXPIRY_DATE: "CONTRACT_INC_EXPIRY_DATE",
  SUPPLIER_NAME: "SUPPLIER_NAME",
  CONTRACT_NUMBER: "CONTRACT_NUMBER",
  CONTRACT_TITLE: "CONTRACT_TITLE",
  SUPPLY_TYPE: "SUPPLY_TYPE",
  STATUS: "STATUS",
  OWNER: "OWNER",
  CONTRACT_ATTACHMENTS: "CONTRACT_ATTACHMENTS",
  OTHER_ATTACHMENTS: "OTHER_ATTACHMENTS",
  CONTRACT_INSURANCE_REQUIRED: "CONTRACT_INSURANCE_REQUIRED",
  CONTRACT_RATES: "CONTRACT_RATES",
  SUPPLIER_CONTRACT_NAME: "SUPPLIER_CONTRACT_NAME",
  SUPPLIER_CONTRACT_PHONE: "SUPPLIER_CONTRACT_PHONE",
  SUPPLIER_CONTRACT_EMAIL: "SUPPLIER_CONTRACT_EMAIL",
  SITE: "SITE",
  INITIAL_TERM: "INITIAL_TERM",
  ONGOING: "ONGOING",
  VALUE: "VALUE",
  LOCATION_OF_HARD_COPY_CONTRACT_DOCUMENT:
    "LOCATION_OF_HARD_COPY_CONTRACT_DOCUMENT",
  NOTES: "NOTES",
  CONTRACT_FORM: "CONTRACT_FORM",
  IS_MANAGED_AS_PANEL_CONTRACTOR: "IS_MANAGED_AS_PANEL_CONTRACTOR",
  PANEL_RANKING: "PANEL_RANKING",
  CONTRACT_RISK: "CONTRACT_RISK",
  CONTRACT_TYPES: "CONTRACT_TYPES",
  CONTRACT_STATUS: "CONTRACT_STATUS",
  CONTRACT_MANAGER: "CONTRACT_MANAGER",
  CONTRACT_INITIATOR: "CONTRACT_INITIATOR",
  ADMINISTRATOR: "ADMINISTRATOR",
  BUSINESS_REPRESENTATIVE: "BUSINESS_REPRESENTATIVE",
  PURCHASE_TYPE: "PURCHASE_TYPE",
  CONTRACT_ITEMS: "CONTRACT_ITEMS",
  DIVISIONS: "DIVISIONS",
  REGIONS: "REGIONS",
  CREATED_BY: "CREATED_BY",
  MODIFIED_BY: "MODIFIED_BY",
  INSURANCE_TYPE: "INSURANCE_TYPE",
};
export const GL_COLUMNS = {
  LEDGER: "LEDGER",
  LEDGER_DESC: "LEDGER_DESC",
  STATE: "STATE",
  REGION: "REGION",
  DIVISION: "DIVISION",
  BUSINESS: "BUSINESS",
};

export const ARC_TICKETS_COLUMNS = {
  Ticket_Title: "ticket_title",
  Ticket_Content: "ticket_content",
  Ticket_Number: "ticket_number",
  Created_By: "created_by",
  Creation_Date: "creation_date",
  Last_Updated: "last_updated",
  Priority: "priority",
  Ticket_Types: "ticket_types",
  Responsible_Person: "responsible_person",
  Due_Date: "due_date",
  Status: "status",
};

export const VENDOR_TAGS_COLUMNS = {
  Name: "name",
  "Created By": "created_by",
  Created_at: "created_at",
  Last_modified_date: "last_modified_date",
};

export const VENDOR_TRADES_COLUMNS = {
  Name: "name",
  "Created By": "created_by",
  "Created at": "created_at",
  "Last Modified Date": "last_modified_date",
  Status: "trade_status",
};

export const VENDOR_CATEGORIES_COLUMNS = {
  Name: "name",
  "Created By": "created_by",
  "Created at": "created_at",
  "Last Modified Date": "last_modified_date",
};

export const VENDOR_DIVERSITY_COLUMNS = {
  Name: "name",
  "Created By": "created_by",
  "Created at": "created_at",
  "Last Modified Date": "last_modified_date",
};

export const PO_COLUMNS = {
  PO_CREATION_DATE: "PO_CREATION_DATE",
  REQ_APPROVED_DATE: "REQ_APPROVED_DATE",
  REQ_DATE: "REQ_DATE",
  PO_CLOSED_DATE: "PO_CLOSED_DATE",
  PO_LAST_UPDATE_DATE: "PO_LAST_UPDATE_DATE",
  PO_APPROVED_DATE: "PO_APPROVED_DATE",
  PO_NEED_BY_DATE: "PO_NEED_BY_DATE",
  ORDER_LINE_CREATION_DATE: "ORDER_LINE_CREATION_DATE",
  FIRST_RECEIPT_DATE: "FIRST_RECEIPT_DATE",
  LAST_RECEIPT_DATE: "LAST_RECEIPT_DATE",
  LAST_INV_DATE: "LAST_INV_DATE",
  EARLIEST_INV_DATE: "EARLIEST_INV_DATE",
  LAST_CREATION_DATE: "LAST_CREATION_DATE",
  EARLIEST_CREATION_DATE: "EARLIEST_CREATION_DATE",
  FIRST_APPROVED_DATE: "FIRST_APPROVED_DATE",
  HOLD_COUNT: "HOLD_COUNT",
  DEL_LOCATION_ID: "DEL_LOCATION_ID",
  INVENTORY_ITEM_ID: "INVENTORY_ITEM_ID",
  PO_LINE_NUMBER: "PO_LINE_NUMBER",
  QUANTITY_ORDERED: "QUANTITY_ORDERED",
  QUANTITY_CANCELLED: "QUANTITY_CANCELLED",
  UNIT_PRICE: "UNIT_PRICE",
  AMOUNT_ORDERED: "AMOUNT_ORDERED",
  QUANTITY_DELIVERED: "QUANTITY_DELIVERED",
  QUANTITY_DUE: "QUANTITY_DUE",
  QUANTITY_BILLED: "QUANTITY_BILLED",
  AMOUNT_BILLED: "AMOUNT_BILLED",
  AMOUNT_RECEIPT: "AMOUNT_RECEIPT",
  AMOUNT_EXPECTED_RECEIPT: "AMOUNT_EXPECTED_RECEIPT",
  AMOUNT_DUE: "AMOUNT_DUE",
  UN_INVOICED_RECEIPT_AMOUNT: "UN_INVOICED_RECEIPT_AMOUNT",
  BUYER_ID: "BUYER_ID",
  REQ_LINE_NUMBER: "REQORDER_CYCLE_TIME_1_LINE_NUMBER",
  ORDER_CYCLE_TIME_1: "ORDER_CYCLE_TIME_1",
  VENDOR_NUMBER: "VENDOR_NUMBER",
  DISTRIBUTION_NUM: "DISTRIBUTION_NUM",
  PO_NUMBER: "PO_NUMBER",
  PO_CLOSED_FLAG: "PO_CLOSED_FLAG",
  SUPPLIER_NAME: "SUPPLIER_NAME",
  HOLD_FLAG: "HOLD_FLAG",
  LEDGER_DESC: "LEDGER_DESC",
  LOCATION_DESC: "LOCATION_DESC",
  DEPARTMENT_DESC: "DEPARTMENT_DESC",
  RECEIPT_STATUS: "RECEIPT_STATUS",
  STATE: "STATE",
  BUSINESS: "BUSINESS",
  HOLO_ENTITY_NAME: "HOLO_ENTITY_NAME",
  BUYER: "BUYER",
  REQUISITIONER: "REQUISITIONER",
  REQUESTER: "REQUESTER",
  PO_REQUESTER: "PO_REQUESTER",
  TRANSACTION_TYPE: "TRANSACTION_TYPE",
  PURCHASING_STATUS: "PURCHASING_STATUS",
  PO_CONFIRMATION_FLAG: "PO_CONFIRMATION_FLAG",
  REQ_NUMBER: "REQ_NUMBER",
  REQ_DESCRIPTION: "REQ_DESCRIPTION",
  REQ_AUTHORISATION_STATUS: "REQ_AUTHORISATION_STATUS",
  PO_LAST_UPDATED_BY: "PO_LAST_UPDATED_BY",
  PO_LINE_CLOSED_FLAG: "PO_LINE_CLOSED_FLAG",
  PO_LINE_CLOSED_REASON: "PO_LINE_CLOSED_REASON",
  PO_APPROVED_FLAG: "PO_APPROVED_FLAG",
  PO_APPROVED_PERIOD: "PO_APPROVED_PERIOD",
  NINETY_DAYS_OLD: "NINETY_DAYS_OLD",
  VENDOR_ID: "VENDOR_ID",
  SUPPLIER_SITE: "SUPPLIER_SITE",
  VENDOR_TYPE: "VENDOR_TYPE",
  CONTRACTED_SUPPLIER: "CONTRACTED_SUPPLIER",
  CONTRACT_CATEGORY: "CONTRACT_CATEGORY",
  CONTRACT_END_DATE: "CONTRACT_END_DATE",
  ON_HOLD: "ON_HOLD",
  LATEST_HOLD: "LATEST_HOLD",
  LATEST_HOLD_REASON: "LATEST_HOLD_REASON",
  LATEST_HOLD_DATE: "LATEST_HOLD_DATE",
  PURCHASING_CATEGORY1: "PURCHASING_CATEGORY1",
  PURCHASING_CATEGORY2: "PURCHASING_CATEGORY2",
  PO_ITEM_DESCRIPTION: "PO_ITEM_DESCRIPTION",
  SUPPLIER_ITEM: "SUPPLIER_ITEM",
  UOM: "UOM",
  CATALOG_TYPE: "CATALOG_TYPE",
  CATALOG_SOURCE: "CATALOG_SOURCE",
  EXPENDITURE_TYPE: "EXPENDITURE_TYPE",
  ORGANISATION_CODE: "ORGANISATION_CODE",
  EAM_REF_NUMBER: "EAM_REF_NUMBER",
  PO_EAM_REF_NUMBER: "PO_EAM_REF_NUMBER",
  PROJECT_NUMBER: "PROJECT_NUMBER",
  TASK_NUMBER: "TASK_NUMBER",
  LEDGER: "LEDGER",
  LOCATION: "LOCATION",
  DEPARTMENT: "DEPARTMENT",
  ACCOUNT: "ACCOUNT",
  ACCOUNT_DESC: "ACCOUNT_DESC",
  PROCESS_STATUS: "PROCESS_STATUS",
  LAST_RECEIPT_PERIOD: "LAST_RECEIPT_PERIOD",
  LAST_INV_NO: "LAST_INV_NO",
  EARLIEST_INV_NO: "EARLIEST_INV_NO",
  DEL_LOCATION_DESC: "DEL_LOCATION_DESC",
  NOTE_TO_VENDOR: "NOTE_TO_VENDOR",
};
const ROLES_MAPPING = {
  UGAdmin: {
    user: { edit: true, view: true },
    invoice: { edit: true, view: true },
    uploadandmap: { edit: true, view: true },
    taxonomy: { edit: true, view: true },
    glorg: { edit: true, view: true },
    po: { edit: true, view: true },
    contract: { edit: true, view: true },
    rules: { edit: true, view: true },
    dashboards: { edit: false, view: true },
    savings: { edit: true, view: true },
  },
  UGSeniorManager: {
    user: { edit: true, view: true },
    invoice: { edit: true, view: true },
    uploadandmap: { edit: true, view: true },
    taxonomy: { edit: true, view: true },
    glorg: { edit: true, view: true },
    po: { edit: true, view: true },
    contract: { edit: true, view: true },
    rules: { edit: true, view: true },
    dashboards: { edit: false, view: true },
    savings: { edit: true, view: true },
  },
  UGManager: {
    user: { edit: true, view: true },
    invoice: { edit: true, view: true },
    uploadandmap: { edit: true, view: true },
    taxonomy: { edit: true, view: true },
    glorg: { edit: true, view: true },
    po: { edit: true, view: true },
    contract: { edit: true, view: true },
    rules: { edit: true, view: true },
    dashboards: { edit: false, view: true },
    savings: { edit: true, view: true },
  },
  UGSpecialist: {
    user: { edit: true, view: true },
    invoice: { edit: true, view: true },
    uploadandmap: { edit: true, view: true },
    taxonomy: { edit: true, view: true },
    glorg: { edit: true, view: true },
    po: { edit: true, view: true },
    contract: { edit: true, view: true },
    rules: { edit: true, view: true },
    dashboards: { edit: false, view: true },
    savings: { edit: true, view: true },
  },
  UserViewer: {
    user: { edit: true, view: true },
    invoice: { edit: true, view: true },
    uploadandmap: { edit: true, view: true },
    taxonomy: { edit: true, view: true },
    glorg: { edit: true, view: true },
    po: { edit: true, view: true },
    contract: { edit: true, view: true },
    rules: { edit: true, view: true },
    dashboards: { edit: false, view: true },
    savings: { edit: true, view: true },
  },
  UserExternalUser: {
    user: { edit: true, view: true },
    invoice: { edit: true, view: true },
    uploadandmap: { edit: true, view: true },
    taxonomy: { edit: true, view: true },
    glorg: { edit: true, view: true },
    po: { edit: true, view: true },
    contract: { edit: true, view: true },
    rules: { edit: true, view: true },
    dashboards: { edit: false, view: true },
    savings: { edit: true, view: true },
  },
};
export const ADMIN_COLUMN = {
  Name: "Name",
  RoleValidity: "RoleValidity",
  Email: "Email",
  Organization: "Organization",
  RoleReference: "RoleReference",
};
export const ADMIN_DATA = "main/admin-data";
// User Groups
export const ADMIN = "UGAdmin";
export const SENIOR_MANAGER = "UGSeniorManager";
export const MANAGER = "UGManager";
export const SPECILIST = "UGSpecialist";
export const VIEWER = "UserViewer";
export const USER = "UserExternalUser";
