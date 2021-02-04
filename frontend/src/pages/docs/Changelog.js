import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import { Helmet } from 'react-helmet';

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Chip = styled(MuiChip)`
  height: 20px;
  margin-top: -3px;
  font-weight: bold;
  font-size: 75%;
`;

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Changelog() {
  return (
    <React.Fragment>
      <Helmet title="Changelog" />

      <Grid container spacing={6} justify="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
          Changelog
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Typography>Changelog</Typography>
          </Breadcrumbs>

          <Divider my={6} />

          <Box mt={3}>
            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.2.0" /> – Aug 17, 2020
              <ul>
                <li>Add Deployment docs (/documentation/deployment)</li>
                <li>Add Theming docs (/documentation/theming)</li>
                <li>Add Environment Variables docs (/documentation/environment-variables)</li>
                <li>Add State Management docs (/documentation/state-management)</li>
                <li>Add FAQ to landing page</li>
                <li>Improve route structure</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />

            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.1.0" /> – Aug 2, 2020
              <ul>
                <li>Add TypeScript version</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />

            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.8" /> – Apr 14, 2020
              <ul>
                <li>Add invoices (/invoices)</li>
                <li>Add orders (/orders)</li>
                <li>Add alerts (/components/alerts)</li>
                <li>Add pagination (/components/pagination)</li>
                <li>Add dropzone (/forms/dropzone)</li>
                <li>Add editors (/forms/editors)</li>
                <li>Improve invoice details (/invoices/detail)</li>
                <li>Improve projects design (/projects)</li>
                <li>Improve settings design (/pages/settings)</li>
                <li>Improve tasks design (/tasks)</li>
                <li>Improve performance</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />

            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.7" /> – Mar 2, 2020
              <ul>
                <li>Fixed bug with @material-ui/utils</li>
                <li>Small visual changes</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />

            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.6" /> – Feb 20, 2020
              <ul>
                <li>Add React Helmet</li>
                <li>Fixed bug with @material-ui/pickers</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />

            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.5" /> – Dec 21, 2019
              <ul>
                <li>Add calendar (/calendar)</li>
                <li>Add landing page</li>
                <li>Add teal color variant</li>
                <li>Fixed horizontal scrollbar issues</li>
                <li>Small visual changes</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />
            
            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.4" /> – Aug 26, 2019
              <ul>
                <li>Add vector maps (/maps/vector-maps)</li>
                <li>Add private route example</li>
                <li>Add catch-all route</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />
            
            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.3" /> – Aug 24, 2019
              <ul>
                <li>Add analytics dashboard (/dashboard/analytics)</li>
                <li>Add language dropdown</li>
                <li>Small visual changes</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />
            
            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.2" /> – Aug 17, 2019
              <ul>
                <li>Add IE11 support</li>
                <li>Add indigo color variant</li>
                <li>Add sidebar badges</li>
                <li>Add profile page (/pages/profile)</li>
                <li>Add projects page (/pages/projects)</li>
                <li>Add tasks page (/pages/tasks)</li>
                <li>Small visual changes</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
            <Divider my={6} />
            
            <Typography variant="subtitle1">
              <Chip color="secondary" label="v1.0.1" /> – Aug 2, 2019
              <ul>
                <li>Add dark sidebar variant</li>
                <li>Add light sidebar variant</li>
                <li>Add settings page (/settings)</li>
                <li>Add google maps (/maps)</li>
                <li>Add drawer with color variant</li>
                <li>Small visual changes</li>
                <li>Upgrade dependencies to latest version</li>
              </ul>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Changelog;
