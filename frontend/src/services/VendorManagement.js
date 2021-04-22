import axios from "../../src/components/Api";
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
