import { all, call } from "redux-saga/effects";

import {
  onAddStart,
  onDeleteDataStart,
  onEditDataStart,
  onQueryStart,
} from "../../global/table/table.actions";
import { onFetchTaxonomyStart } from "../../global/utils/utils.actions";
import {
  onFetchTicketsStart,
  onAddTicketStart,
  onFetchUserListStart,
  onUpdateTicketStart,
  onFetchFileUploadsStart,
  onDeleteFileUploaded,
  onFileUploadStart,
  onFetchContentHistoryStart,
  onArchiveTicketsQueryStart,
  onPartialUpdateTicketStart,
} from "../../main/pages/tickets/redux/ticketSaga";

import {
  onFetchPendingVendorsStart,
  onPartialUpdateApprovalStatus,
  onFetchApprovedVendorsStart,
  onFetchCategoryStart,
  onFetchTagsStart,
  onFetchTradesStart,
  onFetchDiversityStart,
  onFetchPaymentTermStart,
  onPartialUpdateVendors,
  onFetchReviewTemplateStart,
  onDeleteReviewTemplate,
} from "../../main/pages/vendor_management/vendor_admin/redux/approvalSaga";

import {
  onFetchCategoriesStart,
  onFetchComplianceTasksStart,
  onDeleteComplianceTask,
} from "../../main/pages/vendor_management/vendor_configurations/redux/complianceTaskSaga";

import {
  onFetchVendorsStart,
  onFetchSingleVendorStart,
  onFetchVendorAddress,
  onFetchVendorUploads,
  onDeleteVendorUploads,
  onFetchVendorNotes,
} from "../../main/pages/vendor_management/vendor_networks/redux/vendorNetworksSaga";

export default function* rootSaga() {
  yield all([
    call(onAddStart),
    call(onDeleteDataStart),
    call(onEditDataStart),
    call(onQueryStart),
    call(onFetchTaxonomyStart),
    call(onFetchTicketsStart),
    call(onAddTicketStart),
    call(onFetchUserListStart),
    call(onUpdateTicketStart),
    call(onFetchFileUploadsStart),
    call(onDeleteFileUploaded),
    call(onFileUploadStart),
    call(onFetchContentHistoryStart),
    call(onArchiveTicketsQueryStart),
    call(onPartialUpdateTicketStart),
    call(onFetchPendingVendorsStart),
    call(onPartialUpdateApprovalStatus),
    call(onFetchApprovedVendorsStart),
    call(onFetchCategoryStart),
    call(onFetchTagsStart),
    call(onFetchTradesStart),
    call(onFetchDiversityStart),
    call(onFetchPaymentTermStart),
    call(onPartialUpdateVendors),
    call(onFetchReviewTemplateStart),
    call(onFetchCategoriesStart),
    call(onDeleteReviewTemplate),
    call(onFetchComplianceTasksStart),
    call(onDeleteComplianceTask),
    call(onFetchVendorsStart),
    call(onFetchSingleVendorStart),
    call(onFetchVendorAddress),
    call(onFetchVendorUploads),
    call(onDeleteVendorUploads),
    call(onFetchVendorNotes),
  ]);
}
