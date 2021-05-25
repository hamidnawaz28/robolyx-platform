import React from "react";
import MainFormik from "./Formik.main.page";

function AddLiscenceModalBody({ refreshCert, setRefreshCert, setOpen }) {
  return (
    <div>
      <h3> Add Liscences and Certificates</h3>

      <hr />
      <MainFormik
        setOpen={setOpen}
        refreshCert={refreshCert}
        setRefreshCert={setRefreshCert}
      />
    </div>
  );
}

export default AddLiscenceModalBody;
