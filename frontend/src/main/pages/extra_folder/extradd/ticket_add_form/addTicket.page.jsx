import React from 'react';
import MaterialLayout from '../../../../../global/Layout/MaterialLayout';
import Addtickets from './components/TicketAddPage/AddTickets.page';

function AddTicketMainPage({ setOpen }) {
	return (
		<React.Fragment>
			<MaterialLayout>
				<Addtickets setOpen={setOpen} />
			</MaterialLayout>
		</React.Fragment>
	);
}

export default AddTicketMainPage;
