import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
const useStyle = makeStyles({
  addButton: {
    width: "100px",
    marginTop: "10px",
  },
  questionField: {
    width: "100%",
  },
});
const RadioButton = () => {
  const initialValue = {
    type: "radio",
    title: "Untitled Question*",
    options: [],
    auto: true,
    mandatory: true,
    answerIndex: null,
  };
  const [radioData, setRadioData] = useState(initialValue);
  const { addButton, questionField } = useStyle();
  const addOptionHandle = () => {
    setRadioData((pre) => {
      let length = pre.options.length + 1;
      let options = [...pre.options];
      options.push(`Option ${length}`);
      return {
        ...pre,
        options: options,
      };
    });
  };
  const optionChangeHandle = (e, index) => {
    setRadioData((pre) => {
      let options = [...pre.options];
      options[index] = e.target.value.trim();
      return {
        ...pre,
        options: options,
      };
    });
  };
  return (
    <FormControl fullWidth component="fieldset">
      <FormLabel component="legend">
        <TextField
          id="standard-basic"
          label="Question"
          variant="filled"
          value={radioData.title}
          className={questionField}
        />
      </FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
      >
        {radioData.options.map((item, index) => {
          return (
            <div>
              <FormControlLabel value={item} control={<Radio />} />
              <TextField
                id="standard-basic"
                label="Standard"
                value={item}
                onChange={(e) => optionChangeHandle(e, index)}
              />
            </div>
          );
        })}
      </RadioGroup>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<Add />}
        onClick={() => addOptionHandle()}
        className={addButton}
      >
        Add
      </Button>
      <div>Answer : {radioData?.options[radioData?.answerIndex]}</div>
    </FormControl>
  );
};

export { RadioButton };
