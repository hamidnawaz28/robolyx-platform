import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function VendorPage() {
  const location = useLocation();
  let { id } = useParams();
  return (
    <div>
      <h1>Vendor </h1>
      this is vendor's id {id}
      <br />
      this is vendor's name {location.vendor.vendor_name}
    </div>
  );
}

export default VendorPage;
