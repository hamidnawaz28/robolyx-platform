import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import localStorage from "../../../../../../common/storage/localStorage";
import { fetchFileUploadStart } from "../../redux/vendorNetworksActions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: "1.5em",
  },
  title: {
    marginTop: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
}));

const validationSchema = yup.object({
  file_name: yup.string("Title").required("Title is required"),
});

const FileUploadForm = ({ vendor_id }) => {
  const [submitError, setSubmitError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userId: userId } =
    localStorage.get("user") && localStorage.get("user");

  const formik = useFormik({
    initialValues: {
      file_name: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("vendor_file", values.file);
      formData.append("file_name", values.file_name);
      formData.append("uploaded_by", userId);
      formData.append("vendor_id", vendor_id);

      console.log("formData", formData);
      var config = {
        method: "post",
        url: `http://127.0.0.1:8090/api/vendor_management/vendor-upload/`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };
      axios(config)
        .then((res) => {
          console.log(res);

          const { data } = res;
          const { error, message } = JSON.stringify(data);
          if (!error) {
            console.log("posted data", data);
            alert("File Uploaded Successfully");
            dispatch(fetchFileUploadStart(vendor_id));
          } else alert("Error");
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
  const fileInput = React.createRef();

  return (
    <div style={{ padding: "2em" }}>
      <Typography className={classes.title} variant="h3">
        Upload File
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="file_name"
          name="file_name"
          label="Title"
          value={formik.values.file_name}
          onChange={formik.handleChange}
          error={formik.touched.file_name && Boolean(formik.errors.file_name)}
          helperText={formik.touched.file_name && formik.errors.file_name}
        />
        <input
          id="file"
          name="file"
          type="file"
          onChange={(event) => {
            formik.setFieldValue("file", event.currentTarget.files[0]);
          }}
          className="form-control"
        />

        <Button
          className={classes.btn}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Upload File
        </Button>
      </form>
    </div>
  );
};

export default FileUploadForm;
