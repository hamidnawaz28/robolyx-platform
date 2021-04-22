import * as type from "./actionTypes";

export const fetchFileUploadStart = (data) => ({
  type: type.FETCH_FILE_UPLOADS_START,
  payload: data,
});

export const fetchFileUploadSuccess = (data) => ({
  type: type.FETCH_FILE_UPLOADS_SUCCESS,
  payload: data,
});

export const fetchTicketsStart = (data) => ({
  type: type.FETCH_TICKETS_START,
  payload: data,
});

export const fetchTicketsSuccess = (data) => ({
  type: type.FETCH_TICKETS_SUCCESS,
  payload: data,
});

export const addTicket = (post_data) => ({
  type: type.ADD_TICKET,
  payload: post_data,
});

export const fetchUserStart = () => ({
  type: type.FETCH_USER_START,
});

export const fetchUserSuccess = (data) => ({
  type: type.FETCH_USER_SUCCESS,
  payload: data,
});

export const UpdateTicket = (data) => ({
  type: type.EDIT_TICKET,
  payload: data,
});

export const PartialUpdateTicket = (data) => ({
  type: type.PARTIAL_UPDATE_TICKET,
  payload: data,
});

export const deleteTicket = (data) => ({
  type: type.DELETE_TICKET,
  payload: data,
});

export const fileUpload = (data) => ({
  type: type.UPLOAD_FILE,
  payload: data,
});

export const fetchContentHistoryStart = (data) => ({
  type: type.FETCH_CONTENT_HISTORY_START,
  payload: data,
});

export const fetchContentHistorySuccess = (data) => ({
  type: type.FETCH_CONTENT_HISTORY_SUCCESS,
  payload: data,
});

//Archive Tickets Actions
export const fetchArhiveTicketsTableData = (data) => ({
  type: type.TICKET_ARCHIVE_TABLE_DATA_QUERY,
  payload: data,
});

export const updateTicketArchiveTableData = (data) => ({
  type: type.TICKET_ARCHIVE_TABLE_DATA,
  payload: data,
});
export const updateArchiveTicketPerPage = (data) => ({
  type: type.TICKET_ARCHIVE_PER_PAGE,
  payload: data,
});
export const updateArchiveTicketCurrentPage = (data) => ({
  type: type.TICKET_ARCHIVE_CURRENT_PAGE,
  payload: data,
});
export const updateArchiveTicketTotalRows = (data) => ({
  type: type.TICKET_ARCHIVE_TOTAL_ROWS,
  payload: data,
});
export const updateArchiveTicketFormQuery = (data) => ({
  type: type.TICKET_ARCHIVE_FORM_QUERY,
  payload: data,
});

export const resetArchiveTicketStates = (data) => ({
  type: type.TICKET_ARCHIVE_RESET_STATES,
  payload: "",
});

export const resetActiveTicketStates = () => ({
  type: type.TICKET_ACTIVE_RESET_STATES,
  payload: "",
});

export const updateActiveTicketFormQuery = (data) => ({
  type: type.TICKET_ACTIVE_FORM_QUERY,
  payload: data,
});
