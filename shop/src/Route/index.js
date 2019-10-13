import React from "react";
import { Route, Switch } from "react-router-dom";

import App from "./../components";
import Product from "./../modules/Product";

const AppRoute = () => (
  <Switch>
    <Route path="/san-pham" component={Product} />
    <Route path="/" component={App} />
  </Switch>
);
export default AppRoute;
