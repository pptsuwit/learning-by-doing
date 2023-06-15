// import Profile from "../pages/Profile/Profile";
import TableComponent from "../component/table";
import { Auth } from "../services/authentication/";
import Sample from "../services/utility/Sample";
export const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: TableComponent,
  },
  {
    path: "/sample",
    exact: true,
    component: Sample,
  },
  {
    component: Auth.Notfound,
  },
];

export const privateRoutes = [
  {
    path: "/",
    exact: true,
    component: Auth.Login,
  },
  {
    path: "/login",
    exact: true,
    component: Auth.RedirectToLogin,
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
  //   path: "/register",
  //   component: Auth.Register,
  // },
  // {
  //   path: "/sample",
  //   exact: true,
  //   component: Sample,
  // },
  {
    path: "*",
    exact: true,
    component: Auth.Notfound404,
  },
];
