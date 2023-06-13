import Loadable from "../../components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const dashboardRoutes = [
  { path: "/dashboard", element: <Analytics />, auth: authRoles.admin },
];

export default dashboardRoutes;
