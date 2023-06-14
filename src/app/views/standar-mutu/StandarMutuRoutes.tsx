import Loadable from "../../components/Loadable";
import { lazy } from "react";

const NilaiMutuPage = Loadable(
  lazy(() => import("../standar-mutu/nilai-mutu/NilaiMutuPage"))
);
// const SubProjectPage = Loadable(
//   lazy(() => import("../master/sub-project/SubProjectPage"))
// );

const standarMutu = [
  {
    path: "/nilai-mutu",
    element: <NilaiMutuPage />,
  },
  //   {
  //     path: "/master/sub_project",
  //     element: <SubProjectPage />,
  //   },
];

export default standarMutu;
