import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import localStorage from "../../../../../../common/storage/localStorage";
import { fileUpload } from "../../../redux/ticketActions";

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
  title: yup.string("Title").required("Title is required"),
});

const FileUploadForm = ({ ticket_id }) => {
  const [submitError, setSubmitError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userId: userId } =
    localStorage.get("user") && localStorage.get("user");

  const formik = useFormik({
    initialValues: {
      title: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(values.file);
      //alert(JSON.stringify(values.title, null, 2));
      //alert(JSON.stringify(values.file.name, null, 2));

      let formData = new FormData();
      formData.append("ticket_file", values.file);
      formData.append("file_title", values.title);
      formData.append("upload_by", userId);
      formData.append("ticket_id", ticket_id);

      dispatch(fileUpload({ formData: formData, ticket_id: ticket_id }));
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
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
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
