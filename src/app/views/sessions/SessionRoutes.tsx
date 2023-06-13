import Loadable from "../../components/Loadable";
import { lazy } from "react";
import Login from "./Login";

const NotFound = Loadable(lazy(() => import("./NotFound")));
// const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
// const Login = Loadable(lazy(() => import("./Login")));
// const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));

const sessionRoutes = [
  //   { path: '/session/signup', element: <JwtRegister /> },
  { path: "/session/signin", element: <Login /> },
  //   { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: "/session/404", element: <NotFound /> },
];

export default sessionRoutes;
