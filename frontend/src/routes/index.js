import React from "react";

import async from "../components/Async";

import {
  ADMIN,
  SENIOR_MANAGER,
  MANAGER,
  SPECILIST,
  VIEWER,
  USER,
} from "../global/constants";

import { Sliders, Users } from "react-feather";
import ReceiptIcon from "@material-ui/icons/Receipt";
import StorageIcon from "@material-ui/icons/Storage";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import BallotIcon from "@material-ui/icons/Ballot";
import StoreIcon from "@material-ui/icons/Store";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DvrIcon from "@material-ui/icons/Dvr";

import localStorage from "../common/storage/localStorage";
import GlQueryForm from "../main/spendanalysis/Components/gl/GlQueryForm";

// Auth components
const SignIn = async(() => import("../main/users/signIn/SignIn.container"));
const SignUp = async(() => import("../main/users/signUp/SignUp.container"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

//New Components
const Payment = async(() => import("../main/payment/Payment.container"));
// const TaxonomyAndInvoice  = async(() => import("../main/spendanalysis/Components/uploadAndMap"));
// const InvoiceData  = async(() => import("../main/spendanalysis/Components/InvoiceData"));
// const TaxonomyData  = async(() => import("../main/spendanalysis/Components/TaxonomyData"));

const Taxonomy = async(() =>
  import("../main/spendanalysis/Components/taxonomy/Taxonomy.jsx")
);
const Invoice = async(() =>
  import("../main/spendanalysis/Components/invoice/Invoice.jsx")
);
const Po = async(() => import("../main/spendanalysis/Components/po/Po.jsx"));
const Gl = async(() => import("../main/spendanalysis/Components/gl/Gl.jsx"));
const Contract = async(() =>
  import("../main/spendanalysis/Components/contract/Contract.jsx")
);
const UploadAndMap = async(() =>
  import("../main/spendanalysis/Components/uploadandmap/UploadAndMap.jsx")
);
// Rule Engine/SpendCategorization
const RuleEngine = async(() =>
  import("../main/spendanalysis/Components/ruleengine/managerules/ManageRules")
);
const InvoiceByRules = async(() =>
  import(
    "../main/spendanalysis/Components/ruleengine/invoicebyrule/InvoiceByRule"
  )
);
const OverwrittenRules = async(() =>
  import(
    "../main/spendanalysis/Components/ruleengine/overwrittenrules/OverwrittenRules"
  )
);
const RulesSummary = async(() =>
  import(
    "../main/spendanalysis/Components/ruleengine/statisticalsummary/StatisticalSummary"
  )
);

const AdminPanel = async(() =>
  import("../main/spendanalysis/Components/admin/Admin")
);

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Procure to Pay
const GenerateRequisition = async(() =>
  import("../main/pages/procuretopay/GenerateRequisition")
);
const AddPO = async(() => import("../main/pages/procuretopay/Add_PO"));
const InvoiceList = async(() =>
  import("../main/pages/procuretopay/InvoiceList")
);
const NewProductRequest = async(() =>
  import("../main/pages/procuretopay/NewProductRequest")
);
const POList = async(() => import("../main/pages/procuretopay/Po_List"));
const PRList = async(() => import("../main/pages/procuretopay/Pr_List"));
const UploadInvoice = async(() =>
  import("../main/pages/procuretopay/UploadInvoice")
);

// Data Management

const SitesData = async(() =>
  import("../main/pages/data_management/SitesData")
);
const POCRUD = async(() => import("../main/pages/data_management/PO_CRUD"));
const CompanyProfile = async(() =>
  import("../main/pages/data_management/CompanyProfile")
);
const InvoiceCRUD = async(() =>
  import("../main/pages/data_management/InvoiceCRUD")
);
const GLData = async(() => import("../main/pages/data_management/GL_Data"));

const GeneralConfigurations = async(() =>
  import("../main/pages/data_management/general_configs/GeneralConfigurations")
);

// Supplier Management
const InviteSupplier = async(() =>
  import("../main/pages/supplier_management/InviteSupplier")
);
const SupplierNetwork = async(() =>
  import("../main/pages/supplier_management/Supplier_Network")
);
const SupplierDetail = async(() =>
  import("../main/pages/supplier_management/SupplierDetails")
);
const SupplierAnalytics = async(() =>
  import("../main/pages/supplier_management/SupplierAnalytics")
);
const PreferredSupplierManagement = async(() =>
  import("../main/pages/supplier_management/PrefSupplierManagement")
);
const SupplierConfigurations = async(() =>
  import("../main/pages/supplier_management/SupplierConfiguration")
);
const SupplierGrouping = async(() =>
  import("../main/pages/supplier_management/SupplierGrouping")
);

// Contract Management
const AddNewContract = async(() =>
  import("../main/pages/contract_management/AddNewContract")
);
const ContractRegister = async(() =>
  import("../main/pages/contract_management/ContractRegister")
);
const ContractConfigurations = async(() =>
  import("../main/pages/contract_management/ContractConfigurations")
);
const ContractAnalytics = async(() =>
  import("../main/pages/contract_management/ContractAnalytics")
);
const ContractDetails = async(() =>
  import("../main/pages/contract_management/ContractDetail")
);
const SectionsAndClauses = async(() =>
  import("../main/pages/contract_management/SectionsAndClauses")
);
const ContractTemplate = async(() =>
  import("../main/pages/contract_management/ContractTemplate")
);

// Tickets
const TicketRegister = async(() =>
  import("../main/pages/tickets/TicketRegister.page")
);
const ArchiveTickets = async(() =>
  import("../main/pages/tickets/archive_tickets/ArchiveTickets.page")
);
const TicketsAnalytics = async(() =>
  import("../main/pages/tickets/TicketsAnalytics")
);

// Products
const ProductList = async(() => import("../main/pages/products/ProductList"));
const ProductsCrud = async(() => import("../main/pages/products/ProductsCrud"));

// PurchasingPortal
const ProductCatalouge = async(() =>
  import("../main/pages/purchasing_portal/ProductCatalouge")
);
const AddNewCatalouge = async(() =>
  import("../main/pages/purchasing_portal/AddNewCatalouge")
);
const StrategicSourcing = async(() =>
  import("../main/pages/purchasing_portal/StrategicSourcing")
);

// SpendCategorization
const ManageRules = async(() =>
  import("../main/pages/spend_categorization/ManageRules")
);
const InvoiceByRuleID = async(() =>
  import("../main/pages/spend_categorization/InvoiceByRuleID")
);
const OverwrittenRule = async(() =>
  import("../main/pages/spend_categorization/OverwrittenRule")
);
const SpendStatisticalSummary = async(() =>
  import("../main/pages/spend_categorization/SpendStatisticalSummary")
);

// RFX
const GenerateRFX = async(() => import("../main/pages/rfx/GenerateRFX"));
const RFXTemplate = async(() => import("../main/pages/rfx/RFXTemplates"));
const RFXResponses = async(() => import("../main/pages/rfx/RFXResponses"));

// Legal Expert Login
const LegalExpertProfile = async(() =>
  import("../main/pages/legal_expert_login/LegalExpertProfile")
);
const LegalContractTemplate = async(() =>
  import("../main/pages/legal_expert_login/LegalContractTemplate")
);
const LegalExpertTasks = async(() =>
  import("../main/pages/legal_expert_login/LegalExpertTasks")
);
const LegalSectionsAndClauses = async(() =>
  import("../main/pages/legal_expert_login/LegalSectionsAndClauses")
);

// Project management
const ProjectGanttChart = async(() =>
  import("../main/pages/project_management/ProjectGanttChart")
);
const ProjectList = async(() =>
  import("../main/pages/project_management/ProjectList")
);
const ProjectConfigurations = async(() =>
  import("../main/pages/project_management/ProjectConfigurations")
);
const ProjectBoards = async(() =>
  import("../main/pages/project_management/ProjectBoards")
);

// Spend Analytics
const PortfolioSummary = async(() =>
  import("../main/pages/spend_analytics/PortfolioSummary")
);
const CategorySummary = async(() =>
  import("../main/pages/spend_analytics/CategorySummary")
);
const OpportunityAnalysis = async(() =>
  import("../main/pages/spend_analytics/OpportunityAnalysis")
);
const SupplierPortfolio = async(() =>
  import("../main/pages/spend_analytics/SupplierPortfolio")
);
const GeoLocationAnalysis = async(() =>
  import("../main/pages/spend_analytics/GeoLocationAnalysis")
);
const GlobalSpend = async(() =>
  import("../main/pages/spend_analytics/GlobalSpend")
);
const CategorySegmentation = async(() =>
  import("../main/pages/spend_analytics/CategorySegmentation")
);
const GLAnalysis = async(() =>
  import("../main/pages/spend_analytics/GL_Analysis")
);
const CustomAnalytics = async(() =>
  import("../main/pages/spend_analytics/CustomAnalytics")
);
const CustomDashboards = async(() =>
  import("../main/pages/spend_analytics/CustomDashboards")
);
const CustomCharts = async(() =>
  import("../main/pages/spend_analytics/CustomCharts")
);
const PublicDashboards = async(() =>
  import("../main/pages/spend_analytics/PublicDashboards")
);

// Supplier Login
const SupplierProfile = async(() =>
  import("../main/pages/supplier_login/SupplierProfile")
);
const SupplierContracts = async(() =>
  import("../main/pages/supplier_login/SupplierContracts")
);
const SupplierTasks = async(() =>
  import("../main/pages/supplier_login/SupplierTasks")
);

// User
const UserProfile = async(() => import("../main/pages/user/UserProfile"));
const UserHistory = async(() => import("../main/pages/user/UserHistory"));
const UserTasks = async(() => import("../main/pages/user/UserTasks"));
const SupplierRequest = async(() =>
  import("../main/pages/vendorManagement/supplierrequest/RequestForm")
);
const CreateVendor = async(() =>
  import("../main/pages/vendorManagement/createvendor/CreateVendorForm")
);
const OnBoarding = async(() =>
  import("../main/pages/vendorManagement/onboarding/BoardingForm")
);
const SupplierRequests = async(() =>
  import("../main/pages/vendorManagement/supplierrequest/allrequests/SupplierData")
);
const vendorManagement = {
  id: "Vendor Management",
  path: "/vendor-management",
  icon: <CardTravelIcon />,
  children: [
    {
      path: "/vendor-management/create-vendor",
      name: "Create Vendor",
      component: CreateVendor,
    },
    {
      path: "/vendor-management/supplier-request",
      name: "Supplier Request",
      component: SupplierRequest,
    },
    {
      path: "/vendor-management/on-boarding",
      name: "On Boarding",
      component: OnBoarding,
    },
     {
      name: "Supplier Requests",
      path: "/vendor-management/supplier-requests",
      component: SupplierRequests,
    }
  ],
  component: null,
};
const dashboardsRoutes = {
  id: "Dashboard",
  path: "/",
  icon: <Sliders />,
  containsHome: true,
  children: null,
  component: Default,
};

const taxonomy = {
  id: "Taxonomy",
  path: "/taxonomy",
  icon: <BusinessCenterIcon />,
  children: null,
  component: Taxonomy,
};

// const taxonomyRoutes = {
//   id: "TaxonomyR",
//   path: "/taxonomys",
//   icon: <StorageIcon />,
//   children: [
//     {
//       path: "/taxonomys/upload-and-map",
//       name: "Upload And Map",
//       invoiceandtaxonomy :"taxonomy",
//       component: TaxonomyAndInvoice
//     },
//     {
//       path: "/taxonomy/data",
//       name: "Data",
//       component: TaxonomyData
//     }
//   ],
//   component: null
// };

// const dataRoutes = {
//   id: "Invoices",
//   path: "/invoices",
//   icon: <CardTravelIcon />,
//   children: [
//     {
//       path: "/invoices/upload-and-map",
//       name: "Upload And Map",
//       component: TaxonomyAndInvoice
//     },
//     {
//       path: "/invoices/data",
//       name: "Data",
//       component: InvoiceData
//     }
//   ],
//   component: null
// };

const ruleEngineData = {
  id: "Rule Engine",
  path: "/rule-engine",
  icon: <CardTravelIcon />,
  children: [
    {
      path: "/rule-engine/manage-rules",
      name: "Manage Rules",
      component: RuleEngine,
    },
    {
      path: "/rule-engine/invoice-by-rules",
      name: "Invoice By Rule ID",
      component: InvoiceByRules,
    },
    {
      path: "/rule-engine/overwritten-rules",
      name: "Overwritten Rules",
      component: OverwrittenRules,
    },
    {
      path: "/rule-engine/summary",
      name: "Statistical Summary",
      component: RulesSummary,
    },
  ],
  component: null,
};

const procureToPay = {
  id: "Procure To Pay",
  path: "/procure-to-pay",
  icon: <AccountBalanceWalletIcon />,
  children: [
    {
      path: "/procure-to-pay/generate-requisition",
      name: "Generate Requisition",
      component: GenerateRequisition,
    },
    {
      path: "/procure-to-pay/add-po",
      name: "Add PO",
      component: AddPO,
    },
    {
      path: "/procure-to-pay/invoice-list",
      name: "Invoice List",
      component: InvoiceList,
    },
    {
      path: "/procure-to-pay/new-product-request",
      name: "New Product Request",
      component: NewProductRequest,
    },
    {
      path: "/procure-to-pay/po-list",
      name: "PO List",
      component: POList,
    },
    {
      path: "/procure-to-pay/pr-list",
      name: "PR List",
      component: PRList,
    },
    {
      path: "/procure-to-pay/upload-invoice",
      name: "Upload Invoice",
      component: UploadInvoice,
    },
  ],
  component: null,
};

const DataManagement = {
  id: "Data Management",
  path: "/data-management",
  icon: <AccountTreeIcon />,
  children: [
    {
      path: "/data-management/data-upload-mapping",
      name: "Data Upload and Mapping",
      component: UploadAndMap,
    },
    {
      path: "/data-management/sites-data",
      name: "Sites Data",
      component: SitesData,
    },
    {
      path: "/data-management/po-crud",
      name: "PO CRUD",
      component: POCRUD,
    },
    {
      path: "/data-management/company-profile",
      name: "Company Profile",
      component: CompanyProfile,
    },
    {
      path: "/data-management/invoice-crud",
      name: "Invoice CRUD",
      component: InvoiceCRUD,
    },
    {
      path: "/data-management/gl-data",
      name: "GL Data",
      component: GLData,
    },
    {
      path: "/data-management/user-management",
      name: "User Management",
      component: AdminPanel,
    },
    {
      path: "/data-management/general-configurations",
      name: "General Configurations",
      component: GeneralConfigurations,
    },
    {
      path: "/data-management/invoice",
      name: "Invoice",
      component: Invoice,
    },
    {
      path: "/data-management/gl",
      name: "GL",
      component: Gl,
    },
    {
      path: "/data-management/po",
      name: "PO",
      component: Po,
    },
    {
      path: "/data-management/payment",
      name: "Payment",
      component: Payment,
    },
  ],
  component: null,
};

const SupplierManagement = {
  id: "Supplier Management",
  path: "/supplier-management",
  icon: <PeopleAltIcon />,
  children: [
    {
      path: "/supplier-management/invite-supplier",
      name: "Invite a New Supplier",
      component: InviteSupplier,
    },
    {
      path: "/supplier-management/supplier-network",
      name: "Supplier Network",
      component: SupplierNetwork,
    },
    {
      path: "/supplier-management/supplier_detail",
      name: "Supplier Detail",
      component: SupplierDetail,
    },
    {
      path: "/supplier-management/supplier-analytics",
      name: "Supplier Analytics",
      component: SupplierAnalytics,
    },
    {
      path: "/supplier-management/supplier-grouping",
      name: "Supplier Grouping",
      component: SupplierGrouping,
    },
    {
      path: "/supplier-management/preferred-supplier",
      name: "Preferred Supplier Management",
      component: PreferredSupplierManagement,
    },
    {
      path: "/supplier-management/supplier-configurations",
      name: "Supplier Configurations",
      component: SupplierConfigurations,
    },
  ],
  component: null,
};

const ContractManagement = {
  id: "Contract Management",
  path: "/contract-management",
  icon: <AssignmentIcon />,
  children: [
    {
      path: "/contract-management/add-new-contract",
      name: "Add a New Contract",
      component: AddNewContract,
    },
    {
      path: "/contract-management/contract-register",
      name: "Contract Register",
      component: ContractRegister,
    },
    {
      path: "/contract-management/contract-configs",
      name: "Contract Configurations",
      component: ContractConfigurations,
    },
    {
      path: "/contract-management/contract-analytics",
      name: "Contract Analytics",
      component: ContractAnalytics,
    },
    {
      path: "/contract-management/contract-details",
      name: "Contract Details",
      component: Contract,
    },
    {
      path: "/contract-management/sections-and-clauses",
      name: "Sections & Clauses",
      component: SectionsAndClauses,
    },
    {
      path: "/contract-management/contract-template",
      name: "Contract Template",
      component: ContractTemplate,
    },
  ],
  component: null,
};

const Tickets = {
  id: "Tickets",
  path: "/tickets",
  icon: <DeveloperBoardIcon />,
  children: [
    {
      path: "/tickets/active-tickets",
      name: "Tickets Register",
      component: TicketRegister,
    },
    {
      path: "/tickets/archive-tickets",
      name: "Archive Tickets",
      component: ArchiveTickets,
    },
    {
      path: "/tickets/tickets-analytics",
      name: "Analytics",
      component: TicketsAnalytics,
    },
  ],
  component: null,
};

const Products = {
  id: "Products",
  path: "/products",
  icon: <BallotIcon />,
  children: [
    {
      path: "/products/product-list",
      name: "Product List",
      component: ProductList,
    },
    {
      path: "/products/products-crud",
      name: "Products CRUD",
      component: ProductsCrud,
    },
  ],
  component: null,
};

const PurchasingPortal = {
  id: "Purchasing Portal",
  path: "/purchasing-portal",
  icon: <StoreIcon />,
  children: [
    {
      path: "/product-catalouge",
      name: "Product Catalouge",
      component: ProductCatalouge,
    },
    {
      path: "/purchasing-portal/add-new-catalouge",
      name: "Add a New Catalouge",
      component: AddNewCatalouge,
    },
    {
      path: "/purchasing-portal/strategic-sourcing",
      name: "Strategic Sourcing",
      component: StrategicSourcing,
    },
  ],
  component: null,
};

const SpendCategorization = {
  id: "Spend Categorization",
  path: "/spend-categorization",
  icon: <BlurCircularIcon />,
  children: [
    {
      path: "/spend-categorization/manage-rules",
      name: "Manage Rules",
      component: ManageRules,
    },
    {
      path: "/spend-categorization/invoice-by-rule-id",
      name: "Invoice by Rule ID",
      component: InvoiceByRuleID,
    },
    {
      path: "/spend-categorization/overwritten-rule",
      name: "Overwritten Rule",
      component: OverwrittenRule,
    },
    {
      path: "/spend-categorization/spend-statistical-summary",
      name: "SpendStatisticalSummary",
      component: SpendStatisticalSummary,
    },
  ],
  component: null,
};

const RFX = {
  id: "RFX",
  path: "/rfx",
  icon: <DvrIcon />,
  children: [
    {
      path: "/rfx/generate-rfx",
      name: "Generate RFX",
      component: GenerateRFX,
    },
    {
      path: "/rfx/rfx-template",
      name: "RFX Template",
      component: RFXTemplate,
    },
    {
      path: "/rfx/rfx-responses",
      name: "RFXResponses",
      component: RFXResponses,
    },
  ],
  component: null,
};

const LegalExpertLogin = {
  id: "Legal Expert Login",
  path: "/legal-expert-login",
  icon: <FolderSharedIcon />,
  children: [
    {
      path: "/legal-expert-login/legal-expert-profile",
      name: "LegalExpertProfile",
      component: LegalExpertProfile,
    },
    {
      path: "/legal-expert-login/legal-contract-template",
      name: "LegalContractTemplate",
      component: LegalContractTemplate,
    },
    {
      path: "/legal-expert-login/legal-expert-tasks",
      name: "LegalExpertTasks",
      component: LegalExpertTasks,
    },
    {
      path: "/legal-expert-login/legal-section-and-clauses",
      name: "LegalExpertTasks",
      component: LegalSectionsAndClauses,
    },
  ],
  component: null,
};

const ProjectManagement = {
  id: "Project Management",
  path: "/project-management",
  icon: <NextWeekIcon />,
  children: [
    {
      path: "/project-management/project-gantt-chart",
      name: "Project Gantt Chart",
      component: ProjectGanttChart,
    },
    {
      path: "/project-management/project-list",
      name: "Project List",
      component: ProjectList,
    },
    {
      path: "/project-management/project-configurations",
      name: "Project Configurations",
      component: ProjectConfigurations,
    },
    {
      path: "/project-management/project-boards",
      name: "Project Boards",
      component: ProjectBoards,
    },
  ],
  component: null,
};

const SpendAnalytics = {
  id: "Spend Analytics",
  path: "/spend-analytics",
  icon: <InsertChartIcon />,
  children: [
    {
      path: "/spend-analytics/portfolio-summary",
      name: "Portfolio Summary",
      component: PortfolioSummary,
    },
    {
      path: "/spend-analytics/category-summary",
      name: "Category Summary",
      component: CategorySummary,
    },
    {
      path: "/spend-analytics/opportunity-analysis",
      name: "Opportunity Analysis",
      component: OpportunityAnalysis,
    },
    {
      path: "/spend-analytics/supplier-portfolio",
      name: "Supplier Portfolio",
      component: SupplierPortfolio,
    },
    {
      path: "/spend-analytics/geo-location-analysis",
      name: "Geo Location Analysis",
      component: GeoLocationAnalysis,
    },
    {
      path: "/spend-analytics/global-spend",
      name: "Global Spend",
      component: GlobalSpend,
    },
    {
      path: "/spend-analytics/category-segmentation",
      name: "Category Segmentation",
      component: CategorySegmentation,
    },
    {
      path: "/spend-analytics/gl-anaysis",
      name: "GL Analysis",
      component: GLAnalysis,
    },
    {
      path: "/spend-analytics/custom-analytics",
      name: "Custom Analytics",
      component: CustomAnalytics,
    },
    {
      path: "/spend-analytics/custom-dashboards",
      name: "Custom Dashboards",
      component: CustomDashboards,
    },
    {
      path: "/spend-analytics/custom-charts",
      name: "Custom Charts",
      component: CustomCharts,
    },
    {
      path: "/spend-analytics/public-dashboards",
      name: "Public Dashboards",
      component: PublicDashboards,
    },
  ],
  component: null,
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

const User = {
  id: "User",
  path: "/user",
  icon: <AccountBoxIcon />,
  children: [
    {
      path: "/user/user-profile",
      name: "User Profile",
      component: UserProfile,
    },
    {
      path: "/user/user-history",
      name: "User History",
      component: UserHistory,
    },
    {
      path: "/user/user-tasks",
      name: "User Tasks",
      component: UserTasks,
    },
  ],
  component: null,
};

const SupplierLogin = {
  id: "Supplier Login",
  path: "/supplier-login",
  icon: <SupervisedUserCircleIcon />,
  children: [
    {
      path: "/supplier-login/supplier-profile",
      name: "Supplier Profile",
      component: SupplierProfile,
    },
    {
      path: "/supplier-login/supplier-contracts",
      name: "Supplier Contracts",
      component: SupplierContracts,
    },
    {
      path: "/supplier-login/supplier-tasks",
      name: "Supplier Tasks",
      component: SupplierTasks,
    },
  ],
  component: null,
};

const adminAndSeniorManager = [
  vendorManagement,
  dashboardsRoutes,
  taxonomy,
  ruleEngineData,
  procureToPay,
  DataManagement,
  SupplierManagement,
  ContractManagement,
  Tickets,
  Products,
  PurchasingPortal,
  SpendCategorization,
  RFX,
  LegalExpertLogin,
  ProjectManagement,
  SpendAnalytics,
  User,
  SupplierLogin,
  taxonomy,
  //savings
];

const manager = [
  dashboardsRoutes,
  taxonomy,
  ruleEngineData,
  // savings
];

const specialist = [
  dashboardsRoutes,
  ruleEngineData,
  taxonomy,
  //savings
];

const viewer = [dashboardsRoutes, taxonomy, ruleEngineData];

const user = [dashboardsRoutes, taxonomy];

const layoutRoutes = () => {
  const roleBasedRoutes =
    localStorage.get("user") && localStorage.get("user").rolePermissions;
  switch (roleBasedRoutes) {
    case ADMIN:
    case SENIOR_MANAGER:
      return adminAndSeniorManager;
      break;
    case MANAGER:
      return manager;
      break;
    case SPECILIST:
      return specialist;
      break;
    case VIEWER:
      return viewer;
      break;
    default:
      return user;
      break;
  }
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = layoutRoutes();

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = layoutRoutes();
