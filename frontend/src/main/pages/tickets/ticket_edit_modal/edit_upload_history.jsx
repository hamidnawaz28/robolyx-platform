import React from "react";
import MaterialLayout from "../../../../global/Layout/MaterialLayout";
import Addtickets from "./ticket_edit_form/AddTickets.page";
import TicketFileUpload from "./ticket_history_fileupload/ticket_history_fileupload.component";

function EditModalMainPage({ setOpen, ticket, ticket_id }) {
  return (
    <React.Fragment>
      <MaterialLayout>
        <Addtickets setOpen={setOpen} ticket={ticket} />
        <TicketFileUpload setOpen={setOpen} ticket_id={ticket_id} />
      </MaterialLayout>
    </React.Fragment>
  );
}

export default EditModalMainPage;
