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
  ]);
}
