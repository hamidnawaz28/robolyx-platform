import { combineReducers } from "redux";

import themeReducer from "./themeReducers";
import payment from "../../main/payment/reducers/payment.reducer";
import signUp from "../../main/users/signUp/reducers/signUp.reducer";
import signIn from "../../main/users/signIn/reducers/signIn.reducer";
import { taxonomyandinvoicestore } from "../../global/reducer";
import { utilsData } from "../../global/utils/utils.reducers.js";
import { tableStates } from "../../global/table/table.reducers";
import { uploadDataStates } from "../../main/spendanalysis/Components/uploadandmap/upload/reducers";
import { mapDataStates } from "../../main/spendanalysis/Components/uploadandmap/map/reducers";
import { updateProgressStatus } from "../../global/progress/reducer";
import admin from "../../main/adminPanel/reducers/admin.reducer";

import { ticketReducer } from "../../main/pages/tickets/redux/ticketReducers";
import { vendorApprovalReducer } from "../../main/pages/vendor_management/vendor_admin/redux/approvalReducers";
import { complianceTaskReducer } from "../../main/pages/vendor_management/vendor_configurations/redux/complianceTaskReducers";
import { vendorNetworksReducer } from "../../main/pages/vendor_management/vendor_networks/redux/vendorNetworksReducers";

export default combineReducers({
  themeReducer,
  payment,
  signUp,
  signIn,
  taxonomyandinvoicestore,
  admin,
  tableStates,
  uploadDataStates,
  mapDataStates,
  updateProgressStatus,
  utilsData,
  tickets: ticketReducer,
  vendorApproval: vendorApprovalReducer,
  complianceTask: complianceTaskReducer,
  vendorNetworks: vendorNetworksReducer,
});
