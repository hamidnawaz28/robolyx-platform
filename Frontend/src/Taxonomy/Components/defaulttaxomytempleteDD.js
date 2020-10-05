
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


    class DefaultTaxomyDD extends React.Component {

        render() {
            return <>
                <FormControl variant="outlined" >
                    <InputLabel htmlFor="outlined-age-native-simple">Default Templetes</InputLabel>
                    <Select
                        native
                        // value={state.age}
                        // onChange={handleChange}
                        label="Default Templetes"
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>
            </>
        }
    }
    export default DefaultTaxomyDD
