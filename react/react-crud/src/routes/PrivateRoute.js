import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "../services/authentication/service/Authentication.service";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }

      return <Component {...props} />;
    }}
  />
);
