import React from 'react';
import MainFormik from './Formik.main.page';

function VendorBasicModalBody({
	icon,
	title,
	buttonTitle,
	VendorDetail,
	id,
	Vendor_full,
	setOpen,
}) {
	return (
		<div>
			<h3>{buttonTitle} : Edit Page</h3>
			<subtitle>Select from below drop down</subtitle>
			<hr />
			<MainFormik
				icon={icon}
				title={title}
				VendorDetail={VendorDetail}
				id={id}
				buttonTitle={buttonTitle}
				Vendor_full={Vendor_full}
				setOpen={setOpen}
			/>
		</div>
	);
}

export default VendorBasicModalBody;
