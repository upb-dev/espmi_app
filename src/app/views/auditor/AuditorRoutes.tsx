import Loadable from "../../components/Loadable";
import { lazy } from "react";

const AuditorPage = Loadable(lazy(() => import("./AuditorPage")));

const auditor = [
  {
    path: "/auditor",
    element: <AuditorPage />,
  },
];

export default auditor;
