import React from 'react';
import TaxomyDefaultDD from "../Taxonomy/Components/taxomydefaulttempleteDD"
import TaxomySavedDD from "../Taxonomy/Components/taxomysavedtempleteDD"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class TaxonomyUpload extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <>
            <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Typography variant="h6" component="h2" align="center" gutterBottom>
                        Upload Data
                    </Typography>
                    <TaxomyDefaultDD />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            style={{ display: "none" }}
                        />
                    </Button>
                    <TaxomySavedDD />
                    <Button variant="contained" color="primary">Upload Taxonomy Data</Button>
                </Grid>
                <Grid xs={12} sm={12} md={7} lg={7} xl={7}>

                </Grid>
            </Grid>

        </>
    }

}
export default TaxonomyUpload;