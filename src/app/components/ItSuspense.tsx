import { ItLoading } from "../components";
import { Suspense } from "react";

const MatxSuspense = ({ children }) => {
  return <Suspense fallback={<ItLoading />}>{children}</Suspense>;
};

export default MatxSuspense;
