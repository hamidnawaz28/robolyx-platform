import React from 'react';
import './App.css';
import UploadAndMap from '../src/Uploadandmap/uploadandmap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
class App extends React.Component {

  render() {
    return <Router>
    
        <Grid  container spacing={0}>
          <Grid   xs={12}  sm={2} md={2} lg={2} xl={3}>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/invoiceuploadandMap">Upload And Map</Link>
                </li>
                <li>
                  <Link to="/taxomyuploadandMap">Taxomy Upload</Link>
                </li>
              </ul>
            </nav>
          </Grid>
          <Grid xs={12} sm={10}  md={10} lg={10} xl={9}>
            <Switch>
              <Route path="/home">
                
              </Route>
              <Route path="/invoiceuploadandMap">
              <UploadAndMap />
              </Route>
              <Route path="/taxomyuploadandMap">
                
              </Route>
            </Switch>
          </Grid>
        </Grid>
      

    </Router>
  }
}

export default App;