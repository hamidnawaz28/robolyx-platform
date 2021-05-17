import FileDownload from "js-file-download";
import axios from "axios";
const downloadFile = (link) => {
  console.log("link", link);
  var linkArr = link?.split("/");
  console.log("linkArr", linkArr);
  let fileName = linkArr[linkArr?.length - 1];
  console.log("fileName", fileName);
  axios({
    url: `http://localhost:8090/api/ticket/download-file?file-name=${fileName}&path=${link}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    FileDownload(response.data, fileName);
  });
};
export default downloadFile;
