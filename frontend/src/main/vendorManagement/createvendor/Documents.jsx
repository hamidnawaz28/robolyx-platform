import React, { useState } from "react";
import Input from "../components/Input";
import { Grid, Switch } from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";
import { gr1, gr2, gr3, gr4, gr6 } from "../components/Theme";
import GridInput from "../components/GridInput";
const Documents = () => {
  const initValue = { value: "", isChecked: false };
  const [documents, setDocuments] = useState([initValue]);
  const switchHandle = (e, index) => {
    const { checked } = e.target;
    let data = [...documents];
    data[index].isChecked = checked;
    setDocuments(data);
  };
  const handleValue = (e, index) => {
    const { value } = e.target;
    let data = [...documents];
    data[index].value = value;
    setDocuments(data);
  };
  const addDocHandle = () => {
    setDocuments((prevState) => {
      const newData = [...prevState, initValue];
      return newData;
    });
  };
  const delDocHandle = (index) => {
    setTimeout(() => {
      let data = [...documents];
      data.splice(index, 1);
      setDocuments(data);
      console.log("----->");
    }, 1000);
  };
  return (
    <div>
      <h3>Required Documnets For Onboarding</h3>
      {documents?.map((item, index) => {
        return (
          <div>
            <span>{`${index + 1}. `}</span>
            <Grid container>
              <GridInput
                sp="1"
                value={item.value}
                type="text"
                name={`document${index}`}
                key={index}
                onChange={(e) => handleValue(e, index)}
              />
            </Grid>
            <Switch
              checked={item.isChecked}
              onChange={(e) => switchHandle(e, index)}
              name={`mandatory${index}`}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            {documents?.length == index + 1 ? (
              <Add onClick={addDocHandle} />
            ) : (
              <Delete onClick={() => delDocHandle(index)} />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Documents;
