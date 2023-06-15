import React, { useEffect, useState } from "react";
import { Router, Switch } from "react-router-dom";
import { history } from "../services/authentication/_helpers";
import { authenticationService } from "../services/authentication/service/Authentication.service";
import { PrivateRoute } from "../routes/PrivateRoute";
import { PublicRoute } from "../routes/PublicRoute";
import * as Routes from "../routes/ProgramRoute";
import Footer from "./footer/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(null);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    authenticationService.currentUser.subscribe((x) => setUser(x));

    if (user) {
      console.log("private routes", history);
      console.log(user);
      setMenu(
        Routes.privateRoutes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))
      );
      setContainer(
        <div id="wrapper">
          {/* <Sidebar></Sidebar> */}
          <div id="page-wrapper" className="gray-bg">
            <div className="">{/* <Navbar></Navbar> */}</div>
            <Switch>{menu}</Switch>
            <Footer></Footer>
          </div>
        </div>
      );
    } else {
      console.log("public routes", Routes.publicRoutes);
      setContainer(
        Routes.publicRoutes.map((route, index) => (
          <PublicRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))
      );
    }
  }, [user, menu]);

  return (
    <>
      <Router history={history}>
        <Switch>{container}</Switch>
      </Router>
    </>
  );
}

export default App;
