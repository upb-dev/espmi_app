import Loadable from "../../components/Loadable";
import { lazy } from "react";

const FakultasPage = Loadable(lazy(() => import("./fakultas/FakultasPage")));
const UnitPenunjangPage = Loadable(
  lazy(() => import("./unit-penunjang/UnitPenunjangPage"))
);

const referensi = [
  {
    path: "/fakultas",
    element: <FakultasPage />,
  },
  {
    path: "/unit-penunjang",
    element: <UnitPenunjangPage />,
  },
];

export default referensi;
