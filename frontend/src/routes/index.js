import React from "react";

import async from "../components/Async";

import {
  ADMIN,
  SENIOR_MANAGER,
  MANAGER,
  SPECILIST,
  VIEWER,
  USER
} from "../global/constants";

import {
  Sliders,
  Users
} from "react-feather";
import ReceiptIcon from '@material-ui/icons/Receipt';
import StorageIcon from '@material-ui/icons/Storage';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import localStorage from "../common/storage/localStorage";

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

const Taxonomy  = async(() => import("../main/spendanalysis/Components/taxonomy/Taxonomy.jsx"));
const Invoice  = async(() => import("../main/spendanalysis/Components/invoice/Invoice.jsx"));
const Po  = async(() => import("../main/spendanalysis/Components/po/Po.jsx"));
const Gl  = async(() => import("../main/spendanalysis/Components/gl/Gl.jsx"));
const Contract  = async(() => import("../main/spendanalysis/Components/contract/Contract.jsx"));
const UploadAndMap  = async(() => import("../main/spendanalysis/Components/uploadandmap/UploadAndMap.jsx"));
// Rule Engine
const RuleEngine  = async(() => import("../main/spendanalysis/Components/ruleengine/managerules/ManageRules"));
const InvoiceByRules  = async(() => import("../main/spendanalysis/Components/ruleengine/invoicebyrule/InvoiceByRule"));
const OverwrittenRules  = async(() => import("../main/spendanalysis/Components/ruleengine/overwrittenrules/OverwrittenRules"));
const RulesSummary  = async(() => import("../main/spendanalysis/Components/ruleengine/statisticalsummary/StatisticalSummary"));

const AdminPanel = async(() => import("../main/spendanalysis/Components/admin/Admin"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/",
  icon: <Sliders />,
  containsHome: true,
  children: null,
  component: Default
};

const paymentRoutes = {
  id: "Payment",
  path: "/payment",
  icon: <ReceiptIcon />,
  children: null,
  component: Payment
};
const taxonomy = {
  id: "Taxonomy",
  path: "/taxonomy",
  icon: <ReceiptIcon />,
  children: null,
  component: Taxonomy
};
const invoice = {
  id: "Invoice",
  path: "/invoice",
  icon: <ReceiptIcon />,
  children: null,
  component: Invoice
};

const gl = {
  id: "GLData",
  path: "/gl",
  icon: <ReceiptIcon />,
  children: null,
  component: Gl
};
const po = {
  id: "POData",
  path: "/po",
  icon: <ReceiptIcon />,
  children: null,
  component: Po
};
const contract = {
  id: "Contract",
  path: "/contract",
  icon: <ReceiptIcon />,
  children: null,
  component: Contract
};
const uploadandmap = {
  id: "Upload And Map",
  path: "/uploadandmap",
  icon: <ReceiptIcon />,
  children: null,
  component: UploadAndMap
}
const adminPanelRoutes = {
  id: "Admin Panel",
  path: "/admin-panel",
  icon: <SupervisorAccountIcon />,
  children: null,
  component: AdminPanel
}

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
      component: RuleEngine
    },
    {
      path: "/rule-engine/invoice-by-rules",
      name: "Invoice By Rule ID",
      component: InvoiceByRules
    },
    {
      path: "/rule-engine/overwritten-rules",
      name: "Overwritten Rules",
      component: OverwrittenRules 
    },
    {
      path: "/rule-engine/summary",
      name: "Statistical Summary",
      component: RulesSummary
    }

  ],
  component: null
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ],
  component: null
};

const adminAndSeniorManager = [
  dashboardsRoutes,
  paymentRoutes,
  taxonomy,
  invoice,
  gl,
  po,
  contract,
  ruleEngineData,
  adminPanelRoutes,
  uploadandmap,
  //savings
];

const manager = [
  dashboardsRoutes,
  paymentRoutes,
  taxonomy,
  invoice,
  gl,
  po,
  contract,
  ruleEngineData,
  uploadandmap,
  // savings
];

const specialist = [
  dashboardsRoutes,
  paymentRoutes,
  ruleEngineData,
  taxonomy,
  invoice,
  gl,
  po,
  uploadandmap,
  contract
  //savings
];

const viewer = [
  dashboardsRoutes,
  paymentRoutes,
  taxonomy,
  invoice,
  gl,
  po,
  contract,
  uploadandmap,
  ruleEngineData
];

const user = [
  dashboardsRoutes,
  paymentRoutes,
  taxonomy,
  invoice,
  gl,
  po,
  contract,
  uploadandmap
];

const layoutRoutes = () => {
  const roleBasedRoutes = localStorage.get('user') && localStorage.get('user').rolePermissions;
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
}

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = layoutRoutes();

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = layoutRoutes();
