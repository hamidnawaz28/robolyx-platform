import FileDownload from "js-file-download";
import axios from "axios";
const downloadFile = (link) => {
  var linkArr = link?.split("/");
  let fileName = linkArr[linkArr?.length - 1];
  axios({
    url: `http://localhost:8090${link}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    FileDownload(response.data, fileName);
  });
};
export default downloadFile;
