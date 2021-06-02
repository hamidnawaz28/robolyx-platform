import axios from "axios";
import { useDispatch } from "react-redux";
import {
  defaltTemplates,
  selectedDefaultTemplate,
  savedTemplates,
  selectedSavedTemplate,
  attachFileName,
  attachFileData,
  resetUploadStates,
} from "./actionCreators";
import { setProgressStatus } from "../../../../../global/progress/action";
import {
  SERVER_URL,
  DEFAULT_TEMPLETES,
  SAVED_TEMPLETES,
  FILE_IMPORT,
  FILE_UPLOAD
} from "../../../../../global/constants";
const fetchDefaultTemplates = () => {
  return (dispatch) => {
    axios
      .get(`${SERVER_URL}${DEFAULT_TEMPLETES}`)
      .then((res) => {
        let serData = [];
        res.data.data.forEach((element) => {
          let fields = {
            ...element,
            Items: JSON.parse(element.Items),
          };
          element.fields = fields;
          serData.push(element);
        });
        dispatch(defaltTemplates(serData));
      })
      .catch((error) => {
        alert(error);
      });
  };
};
const fetchSavedTemplates = (fetchApiData) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_URL}${SAVED_TEMPLETES}`, { params: fetchApiData })
      .then((res) => {
        let serData = [];
        res.data.data.forEach((element) => {
          let fields = {
            ...element,
            MappedItems: JSON.parse(element.MappedItems),
          };
          element.fields = fields;
          serData.push(element);
        });
        dispatch(savedTemplates(serData));
      })
      .catch((error) => {
        alert(error);
      });
  };
};
const uploadFileData = (postApiData) => {
  return (dispatch) => {
    dispatch(setProgressStatus(true));
    axios
      .post(`${SERVER_URL}${FILE_IMPORT}/`, postApiData)
      .then((res) => {
        dispatch(setProgressStatus(false));
        alert(res.data);
        dispatch(resetUploadStates());
      })
      .catch((error) => {
        dispatch(setProgressStatus(false));
        alert(error);
      });
  };
};
const uploadFile = (postApiData) => {
  return (dispatch) => {
    dispatch(setProgressStatus(true));
    axios
      .post(`${SERVER_URL}${FILE_UPLOAD}/`, postApiData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            const { total, loaded, timeStamp } = progressEvent
            let done = (loaded/total)*100
            dispatch(setProgressStatus(true, done));
          }
      }).then((res)=>{
        dispatch(setProgressStatus(false, 100));
        alert(res.data.message);
        // dispatch(resetUploadStates());
      })
      .catch(err=>{
        dispatch(setProgressStatus(false, 100));
        alert(err);
      })
  };
};
export { fetchDefaultTemplates, fetchSavedTemplates, uploadFileData, uploadFile };
