import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainDashboard from "../pages/main-dashboard";
//--- Basic Info Pages
import ProvincesPage from "../components/app-modules/settings/basic-info/provinces-page";
import CitiesPage from "../components/app-modules/settings/basic-info/cities-page";
import ExpertisesPage from "../components/app-modules/settings/basic-info/expertises-page";
import SectionsPage from "../components/app-modules/settings/basic-info/sections-page";
import SectionActiveBedsPage from "../components/app-modules/settings/basic-info/section-active-beds-page";
import GeneralSectionsPage from "../components/app-modules/settings/basic-info/general-sections-page";
import GeneralSectionPartsPage from "../components/app-modules/settings/basic-info/general-section-parts-page";
//--- Main Info Pages
import DailyFormsPage from "../components/app-modules/settings/main-info/daily-forms-page";
import BirthFormsPage from "../components/app-modules/settings/main-info/birth-forms-page";
import MonthlyFormsPage from "../components/app-modules/settings/main-info/monthly-forms-page";
//--- Access Pages
import PageAccessesPage from "../components/app-modules/settings/accesses/page-accesses-page";
//--- Users Pages
import MembersPage from "../components/app-modules/settings/users-info/members-page";
import DoctorsPage from "../components/app-modules/settings/users-info/doctors-page";
import SectionExpertsPage from "../components/app-modules/settings/users-info/section-experts-page";
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
        path={`${path}/basic-info/sections`}
        exact
        render={() => <SectionsPage pageName="Sections" />}
      />
      <ProtectedRoute
        path={`${path}/basic-info/section-active-beds`}
        exact
        render={() => <SectionActiveBedsPage pageName="SectionActiveBeds" />}
      />
      <ProtectedRoute
        path={`${path}/basic-info/general-sections`}
        exact
        render={() => <GeneralSectionsPage pageName="GeneralSections" />}
      />
      <ProtectedRoute
        path={`${path}/basic-info/general-section-parts`}
        exact
        render={() => <GeneralSectionPartsPage pageName="GeneralSectionParts" />}
      />
      <ProtectedRoute
        path={`${path}/main-info/daily-forms`}
        exact
        render={() => <DailyFormsPage pageName="DailyForms" />}
      />
      <ProtectedRoute
        path={`${path}/main-info/birth-forms`}
        exact
        render={() => <BirthFormsPage pageName="BirthForms" />}
      />
      <ProtectedRoute
        path={`${path}/main-info/monthly-forms`}
        exact
        render={() => <MonthlyFormsPage pageName="MonthlyForms" />}
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
      <ProtectedRoute
        path={`${path}/users/doctors`}
        exact
        render={() => <DoctorsPage pageName="Doctors" />}
      />
      <ProtectedRoute
        path={`${path}/users/section-experts`}
        exact
        render={() => <SectionExpertsPage pageName="SectionExperts" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default PageRoutes;
