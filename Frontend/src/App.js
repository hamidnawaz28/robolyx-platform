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
          <Grid sm={3} xs={1} md={3} lg={3}>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/UploadAndMap">Upload And Map</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>
          </Grid>
          <Grid sm={3} xs={1} md={9} lg={9}>
            <Switch>
              <Route path="/ab">
                
              </Route>
              <Route path="/UploadAndMap">
              <UploadAndMap />
              </Route>
              <Route path="/">
                
              </Route>
            </Switch>
          </Grid>
        </Grid>
      

    </Router>
  }
}

export default App;