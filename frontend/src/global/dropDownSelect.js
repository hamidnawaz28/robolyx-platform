// import * as All from '../Global/actions';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function DropDownSelect(props) {
        const { 
            dataList : Lists, 
            DataType : dataType, 
            fieldName, 
            label, 
            selectedValue, 
            onChangeEvent,
            catagoryLevel
        } = props
        let allOptions = '';
        if (Lists) {
            if (dataType === "KeyValue") {
                allOptions = Lists.map((ListItem) => <option pk={ListItem["pk"]} className="selectOption">{ListItem["name"]}</option>);
            }
            if (dataType === "ListData") {
                allOptions = Lists.map((ListItem) => <option pk={ListItem} className="selectOption">{ListItem}</option>);
            }
            if (dataType === "ListDataWithCatagory") {
                allOptions = Lists.map((ListItem) => <option catagoryLevel ={catagoryLevel} pk={ListItem} className="selectOption">{ListItem}</option>);
            }
            if (dataType === "ListDataWithFieldName") {
                allOptions = Lists.map((ListItem) => <option fieldName ={fieldName} pk={ListItem} className="selectOption">{ListItem}</option>);
            }
            if(dataType==="GroupDataWithType"){
                allOptions = Object.keys(Lists).map((ListItem) => 
                Lists[ListItem].map((item)=><option dataType={ListItem}  className="selectOption">{item}</option>)
                );
            }
            if (dataType === "WithPkAndFieldName") {
                allOptions = Lists.map((ListItem) => 
                <option key={ListItem.pk} pk={ListItem.pk} 
                    className="selectOption">{(ListItem ?.fields?.[fieldName])?
                                                ListItem.fields[fieldName]:<></>}
                </option>);
            }
            if(dataType === "GroupData"){
                let SensitivitiesLevels = Object.keys(Lists)
                allOptions = SensitivitiesLevels.map((SensitivityLevel) =>
                    <optgroup label={SensitivityLevel} className={SensitivityLevel+"Options"}>
                            {
                                Object.keys(Lists[SensitivityLevel]).map((data)=>
                                    <>
                                        { Lists[SensitivityLevel][data].map((value)=>
                                            <option 
                                                data=
                                                    {[
                                                        SensitivityLevel,data,value
                                                    ]}>
                                                {value}
                                            </option>
                                        )}
                                    </>
                                )
                            }
                    </optgroup>)
            }
        }
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-native-simple" > 
                        {label} 
                    </InputLabel>
                    <Select 
                        native 
                        inputProps={{
                            id: 'filled-native-simple',
                          }}
                        label="Default Templetes" 
                        value={selectedValue} 
                        onChange={(event) => onChangeEvent(event)} 
                        onSelect={(event) => onChangeEvent(event)} 
                        className="selectInput">
                        <option aria-label="None" value=""></option>
                        {allOptions}
                    </Select>
                </FormControl>
        </>
    )
}
export default DropDownSelect;
