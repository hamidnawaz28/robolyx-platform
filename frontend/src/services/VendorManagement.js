import axios from "../../src/components/Api";
import { useState } from "react";
const postVendorRequest = (data) => {
  data.request_contact = 1;
  data.requesting_site = null;
  var config = {
    method: "post",
    url: "http://127.0.0.1:8090/api/vendor_management/vendor-req/",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(config)
    .then((res) => {
      const { data } = res;
      const { error, message } = JSON.stringify(data);
      if (!error) alert("Request Sent Successfully");
      else alert("Error");
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export { postVendorRequest };

const postVendorBasicData = (data, addresses) => {
  data.created_by = 1;
  var config = {
    method: "post",
    url: "http://127.0.0.1:8090/api/vendor_management/vendor-basic/",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(config).then((res) => {
    if (addresses.length > 0 && !res?.data?.error) {
      const id = res?.data?.vendorid?.id;
      addresses = addresses.map((address) => {
        address.vendor_id = id;
        address.created_by = 1;
        return address;
      });
      addresses.forEach((address) => {
        var addConfig = {
          method: "post",
          url: "http://127.0.0.1:8090/api/vendor_management/vendor-address/",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(address),
        };
        axios(addConfig)
          .then((res) => {
            console.log("Addresses Added");
            if (!res.data.status) alert("Added Successfully");
            else alert("Error");
          })
          .catch((err) => console.log(err));
      });
    } else {
      if (res?.data?.error) alert("Error");
    }
  });
};
export { postVendorBasicData };

const postopenVendorData = (data, addresses) => {
  data.request_contact = 1;
  data.requesting_site = null;
  var config = {
    method: "post",
    url: "http://127.0.0.1:8090/api/vendor_management/vendor-basic/",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(config).then((res) => {
    const id = res.data.vendorid.id;
    addresses = addresses.map((address) => {
      address.id = id;
      return address;
    });
    addresses.forEach((address) => {
      var addConfig = {
        method: "post",
        url: "http://127.0.0.1:8090/api/vendor_management/vendor-address/",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(address),
      };
      axios(addConfig)
        .then((res) => {
          console.log("Addresses Added");
        })
        .catch((err) => console.log(err));
    });
  });
};
export { postopenVendorData };
