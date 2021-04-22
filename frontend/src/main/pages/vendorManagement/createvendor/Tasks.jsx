import React from "react";
import Input from "../../../../components/Input";
import { Grid } from "@material-ui/core";
import { gr1, gr2, gr3, gr4, gr6 } from "../../../../components/Theme";
const Tasks = () => {
  return (
    <div>
      <Grid container>
        <Grid {...gr2}>
          <Input
            label="Subject"
            placeholder="Remainder 1"
            type="text"
            name="subject"
          />
        </Grid>
        <Grid {...gr2}>
          <Input label="Assign To" placeholder="" type="text" name="assignTo" />
        </Grid>
        <Grid {...gr2}>
          <Input label="Priority" placeholder="" type="text" name="priority" />
        </Grid>
        <h4>Due After:</h4>
        <Grid container {...gr2}>
          <Grid {...gr2}>
            <Input label="Months" placeholder="2" type="text" name="months" />
          </Grid>
          <Grid {...gr2}>
            <Input label="Days" placeholder="20" type="text" name="days" />
          </Grid>
        </Grid>
        <Grid {...gr2}>
          <Input label="Repeat" placeholder="" type="text" name="repeat" />
        </Grid>
        <Grid {...gr2}>
          <Input
            label="Description"
            placeholder="Description"
            type="text"
            name="description"
          />
        </Grid>
        <Grid {...gr2}>
          <Input label="Email" type="text" name="email" />
        </Grid>
        <Grid {...gr2}>
          <Input label="Notification" type="text" name="notification" />
        </Grid>
      </Grid>
    </div>
  );
};
export default Tasks;
