// import Profile from "../pages/Profile/Profile";
// import Dashboard from "../pages/Dashboard/Dashboard";
import { Auth } from "../services/authentication/";
import Sample from "../services/utility/Sample";
export const privateRoutes = [
  // {
  //   path: "/",
  //   exact: true,
  //   component: Dashboard,
  // },
  {
    path: "/sample",
    exact: true,
    component: Sample,
  },
  // {
  //   path: "/profile",
  //   exact: true,
  //   component: Profile,
  // },
  //   {
  //     path: "/profile/changepassword",
  //     component: EditPassword,
  //   },
  //   {
  //     path: "/forgotpassword",
  //     component: Auth.ForgotPassword,
  //   },
];

export const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: Auth.Login,
  },
  {
    path: "/login",
    exact: true,
    component: Auth.Login,
  },
  {
    path: "/forgot-password",
    component: Auth.ForgotPassword,
  },
  {
    path: "/change-password/token=:token",
    component: Auth.ChangePassword,
  },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  {
    path: "/sample",
    exact: true,
    component: Sample,
  },
  {
    component: Auth.Notfound,
  },
];
