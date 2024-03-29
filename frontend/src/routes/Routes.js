import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { dashboardLayoutRoutes, authLayoutRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import ReviewTemplateEdit from "../main/pages/vendor_management/vendor_admin/edit_review_template/EditReviewTemplate";
import EditComplianceTask from "../main/pages/vendor_management/vendor_configurations/edit_compliance_task/EditComplianceTask";
import VendorPage from "../main/pages/vendor_management/vendor_networks/vendor_page/VendorPage.main";
import localStorage from "../common/storage/localStorage";
import ReviewForm from "../main/pages/vendor_management/vendor_networks/vendor_page/vendor_review_form/ReviewForm";
import ComplianceForm from "../main/pages/vendor_management/vendor_networks/vendor_page/compliance_form/ComplianceForm";

const childProtectedRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={(props) =>
            localStorage.get("user") &&
            localStorage.get("user").authToken !== "" ? (
              <Layout>
                <Component {...props} />
              </Layout>
            ) : (
              <Redirect to="/auth/sign-in" />
            )
          }
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={(props) =>
          localStorage.get("user") &&
          localStorage.get("user").authToken !== "" ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="/auth/sign-in" />
          )
        }
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
          render={(props) =>
            !localStorage.get("user") ||
            localStorage.get("user").authToken === "" ? (
              <Layout>
                <Component {...props} />
              </Layout>
            ) : (
              <Redirect to="/" />
            )
          }
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={(props) =>
          !localStorage.get("user") ||
          localStorage.get("user").authToken === "" ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    )
  );

const Routes = () => (
  <Router>
    <Switch>
      {childProtectedRoutes(DashboardLayout, dashboardLayoutRoutes)}
      {childRoutes(AuthLayout, authLayoutRoutes)}
      <Route
        exact
        path="/vendor-management/review-template-edit"
        render={() => (
          <DashboardLayout>
            <ReviewTemplateEdit />
          </DashboardLayout>
        )}
      />
      <Route
        exact
        path="/vendor-management/compliance-task-edit"
        render={() => (
          <DashboardLayout>
            <EditComplianceTask />
          </DashboardLayout>
        )}
      />
      <Route
        exact
        path="/vendor-management/vendor/:id/"
        render={() => (
          <DashboardLayout>
            <VendorPage />
          </DashboardLayout>
        )}
      />
      <Route
        exact
        path="/vendor-management/vendor/:vendorId/review-form/:id/"
        render={() => (
          <DashboardLayout>
            <ReviewForm />
          </DashboardLayout>
        )}
      />
      <Route
        exact
        path="/vendor-management/vendor/:vendorId/compliance-form/:id/"
        render={() => (
          <DashboardLayout>
            <ComplianceForm />
          </DashboardLayout>
        )}
      />

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
