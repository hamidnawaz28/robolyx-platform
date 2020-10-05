
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
    fab: {
        marginTop:"5px",
        width: '100%'
    },
});


class TaxomyDefaultDD extends React.Component {

    render() {
        const { classes } = this.props;
        return <>
            <FormControl variant="outlined"className={classes.fab} >
                <InputLabel htmlFor="outlined-age-native-simple" >Default Templetes</InputLabel>
                <Select native label="Default Templetes" >

                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
            </FormControl>
        </>
    }
}
export default withStyles(useStyles)(TaxomyDefaultDD)

