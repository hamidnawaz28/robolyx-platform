import React from "react";
import { makeStyles } from "@material-ui/styles";
import { colors } from "./Theme";
const useStyles = makeStyles({
  heading: {
    background: colors.headingBackground,
    color: colors.headingColor,
    paddingLeft: "10px",
    borderRadius: "3px",
  },
});

const H1 = ({ label, ...props }) => {
  const { heading } = useStyles();
  return (
    <h1 {...props} className={heading}>
      {label}
    </h1>
  );
};
const H2 = ({ label, ...props }) => {
  const { heading } = useStyles();
  return (
    <h2 {...props} className={heading}>
      {label}
    </h2>
  );
};
const H3 = ({ label, ...props }) => {
  const { heading } = useStyles();
  return (
    <h3 {...props} className={heading}>
      {label}
    </h3>
  );
};
const H4 = ({ label, ...props }) => {
  const { heading } = useStyles();
  return (
    <h4 {...props} className={heading}>
      {label}
    </h4>
  );
};
const H5 = ({ label, ...props }) => {
  const { heading } = useStyles();
  return (
    <h5 {...props} className={heading}>
      {label}
    </h5>
  );
};
const H6 = ({ label, ...props }) => {
  const { heading } = useStyles();
  return (
    <h6 {...props} className={heading}>
      {label}
    </h6>
  );
};
export { H1, H2, H3, H4, H5, H6 };
