import React, { useEffect, useState } from "react";
import { Router, Switch } from "react-router-dom";
import { history } from "../services/authentication/_helpers";
// import { authenticationService } from "../services/authentication/service/Authentication.service";
import { PrivateRoute } from "../routes/PrivateRoute";
import { PublicRoute } from "../routes/PublicRoute";
import * as Routes from "../routes/ProgramRoute";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { Grid, Container } from "@mui/material";

function App() {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(user);
    return currentUser || "";
  });
  const [menu, setMenu] = useState(() => {
    if (user) {
      return Routes.publicRoutes.map((route, index) => (
        <PublicRoute
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ));
    }
    return;
  });
  const [container, setContainer] = useState(null);
  useEffect(() => {
    if (user) {
      console.log("public routes", Routes.publicRoutes);
      setMenu(
        Routes.publicRoutes.map((route, index) => (
          <PublicRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))
      );
      setContainer(
        <>
          <Grid>
            <Grid item xs={12}>
              <Navbar></Navbar>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                side bar
              </Grid>
              <Grid item>
                <Switch>{menu}</Switch>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Footer></Footer>
            </Grid>
          </Grid>
        </>
      );
    } else {
      console.log("private routes", Routes.privateRoutes);
      setContainer(
        Routes.privateRoutes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))
      );
    }
  }, []);

  return (
    <>
      <Router history={history}>
        {user ? container : <Switch>{container}</Switch>}
      </Router>
    </>
  );
}

export default App;
