import Loadable from "../../components/Loadable";
import { lazy } from "react";

const FakultasPage = Loadable(lazy(() => import("./fakultas/FakultasPage")));

const referensi = [
  {
    path: "/fakultas",
    element: <FakultasPage />,
  },
];

export default referensi;
