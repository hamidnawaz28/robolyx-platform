import Input from "./Input";
import React from "react";
import { Grid } from "@material-ui/core";
import * as grs from "../components/Theme";
const GridInput = ({ sp, ...props }) => {
  return (
    <Grid {...grs[`gr${sp}`]}>
      <Input {...props} />
    </Grid>
  );
};
export default GridInput;
