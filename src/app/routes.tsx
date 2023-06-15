import AuthGuard from "./auth/AuthGuard";
import ItLayout from "./components/ItLayout/ItLayout";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import { Navigate } from "react-router-dom";
import NotFound from "./views/sessions/NotFound";
import standarMutu from "./views/standar-mutu/StandarMutuRoutes";

const routes = [
  {
    element: (
      <AuthGuard>
        <ItLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...sessionRoutes, ...standarMutu],
  },
  { path: "/", element: <Navigate to="dashboard" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;