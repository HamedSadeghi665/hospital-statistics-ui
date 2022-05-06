import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainMenu from "../components/menus/main-menu";
//---
//---
//---

const MenuRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute path={`${path}/`} component={MainMenu} />
    </Switch>
  );
};

export default MenuRoutes;
