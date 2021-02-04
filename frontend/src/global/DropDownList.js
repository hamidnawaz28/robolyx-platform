import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {Select, FormHelperText} from '@material-ui/core';

function DropDownList(props) {
    const { data, label, selectedValue, handleChange, error, helperText, id, name }  = props;
    let options = [];
    
    if (data) {
      options = data.map((listItem,index) => 
        <option className="selectOption" key={index} value={listItem.value}>{listItem.name}</option>);
    }
    return(<>
            <FormControl fullWidth error={error}>
                <InputLabel htmlFor="outlined-age-native-simple" > { label } </InputLabel>
                <Select 
                  id={id}
                  name={name}
                  native 
                  label={label}
                  value={selectedValue}
                  className="selectInput"
                  onChange={handleChange}
                >
                  {options}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
    </>);
}
export default DropDownList;