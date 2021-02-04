import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { dashboardLayoutRoutes, authLayoutRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import localStorage from "../common/storage/localStorage";

const childProtectedRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            localStorage.get('user') && localStorage.get('user').authToken !== '' ?
            <Layout>
              <Component {...props} />
            </Layout> :
            <Redirect to="/auth/sign-in" />
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          localStorage.get('user') && localStorage.get('user').authToken !== '' ?
            <Layout>
              <Component {...props} />
            </Layout> :
            <Redirect to="/auth/sign-in" />
        )}
      />
    )
  );

  const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            !localStorage.get('user') || localStorage.get('user').authToken === '' ?
            <Layout>
              <Component {...props} />
            </Layout> :
            <Redirect to="/" />
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          !localStorage.get('user') || localStorage.get('user').authToken === '' ?
            <Layout>
              <Component {...props} />
            </Layout> :
            <Redirect to="/" />
        )}
      />
    )
  );

const Routes = () => (
  <Router>
    <Switch>
      {childProtectedRoutes(DashboardLayout, dashboardLayoutRoutes)}
      {childRoutes(AuthLayout, authLayoutRoutes)}
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;
