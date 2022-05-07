import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainDashboard from "../pages/main-dashboard";
import ProvincesPage from "../components/app-modules/settings/basic-info/provinces-page";
import CitiesPage from "../components/app-modules/settings/basic-info/cities-page";
import ExpertisesPage from "../components/app-modules/settings/basic-info/expertises-page";

import PageAccessesPage from "../components/app-modules/settings/accesses/page-accesses-page";

import MembersPage from "../components/app-modules/settings/users-info/members-page";
//---
//---

const PageRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/`}
        exact
        component={MainDashboard}
      />
      <ProtectedRoute
        path={`${path}/basic-info/provinces`}
        exact
        render={() => <ProvincesPage pageName="Provinces" />}
      />
      <ProtectedRoute
        path={`${path}/basic-info/cities`}
        exact
        render={() => <CitiesPage pageName="Cities" />}
      />
      <ProtectedRoute
        path={`${path}/basic-info/expertises`}
        exact
        render={() => <ExpertisesPage pageName="Expertises" />}
      />
      <ProtectedRoute
        path={`${path}/setting/page-accesses`}
        exact
        render={() => <PageAccessesPage pageName="PageAccesses" />}
      />
      <ProtectedRoute
        path={`${path}/users/members`}
        exact
        render={() => <MembersPage pageName="Members" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default PageRoutes;
