import React from 'react';
import TaxomyDefaultDD from "../Taxonomy/Components/taxomydefaulttempleteDD"
import TaxomySavedDD from "../Taxonomy/Components/taxomysavedtempleteDD"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import { DataGrid } from '@material-ui/core/data-grid'; 
import EnhancedTable from "../Taxonomy/Components/table"
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
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
                        x<input
                            type="file"
                            style={{ display: "none" }}
                        />
                    </Button>
                    <TaxomySavedDD />
                    <Button variant="contained" color="primary">Upload Taxonomy Data</Button>
                </Grid>
                <Grid xs={12} sm={12} md={7} lg={7} xl={7}>
                    <EnhancedTable/>
                {/* <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection /> */}
                </Grid>
            </Grid>

        </>
    }

}
export default TaxonomyUpload;