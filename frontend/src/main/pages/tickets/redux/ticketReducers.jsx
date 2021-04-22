import * as Types from "./actionTypes";

const updateTicket = (tickets, data) => {
  console.log("tickets", data, tickets);

  let ticketToUpdateId = parseInt(data.id);
  let post_data = data.post_data;
  console.log("here we go again", ticketToUpdateId, post_data);

  let updatedTickets = tickets.map((ticket) =>
    ticket.id === ticketToUpdateId
      ? { ...ticket, list_tickets: post_data.list_tickets }
      : ticket
  );

  console.log("updatedTickets", updatedTickets);

  return { count: tickets.length, data: updatedTickets };
};

const initialState = {
  ticketsData: [],
  listUser: [],
  isFetching: false,
  fileUploadsList: [],
  contentHistoryList: [],
  tableData: {},
  perPage: 5,
  currentPage: 0,
  totalRows: 0,
  archiveQuery: {},
  activeQuery: {},
};
export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_TICKETS_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ticketsData: action.payload,
      };
    case Types.ADD_TICKET:
      return {
        ...state,
      };
    case Types.FETCH_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listUser: action.payload,
      };

    case Types.FETCH_FILE_UPLOADS_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_FILE_UPLOADS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fileUploadsList: action.payload,
      };

    case Types.FETCH_CONTENT_HISTORY_START:
      return {
        ...state,
        isFetching: true,
      };
    case Types.FETCH_CONTENT_HISTORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        contentHistoryList: action.payload,
      };
    //Tickets Archive
    case Types.TICKET_ARCHIVE_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    case Types.TICKET_ARCHIVE_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
      };
    case Types.TICKET_ARCHIVE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case Types.TICKET_ARCHIVE_TOTAL_ROWS:
      return {
        ...state,
        totalRows: action.payload,
      };

    case Types.TICKET_ARCHIVE_FORM_QUERY:
      return {
        ...state,
        archiveQuery: action.payload,
      };
    case Types.TICKET_ARCHIVE_RESET_STATES:
      return {
        ...initialState,
      };
    case Types.TICKET_ACTIVE_RESET_STATES:
      return {
        ...initialState,
      };
    case Types.TICKET_ACTIVE_FORM_QUERY:
      return {
        ...state,
        activeQuery: action.payload,
      };
    case Types.PARTIAL_UPDATE_TICKET:
      return {
        ...state,
        //ticketsData: action.payload,
        ticketsData: updateTicket(state.ticketsData.data, action.payload),
      };

    default:
      return state;
  }
};
