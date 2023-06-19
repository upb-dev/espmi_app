import Loadable from "../../components/Loadable";
import { lazy } from "react";

const PeriodePage = Loadable(lazy(() => import("./periode/PeriodePage")));
const TargetnilaiPage = Loadable(
  lazy(() => import("./target-nilai/TargetNilaiPage"))
);

const evaluasiDiri = [
  {
    path: "/periode",
    element: <PeriodePage />,
  },
  {
    path: "/target-nilai",
    element: <TargetnilaiPage />,
  },
];

export default evaluasiDiri;
